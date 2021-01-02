require("../src/utils/dotenvInit");

import jwt from 'jsonwebtoken';

import IValidetor from 'validetors/IValidetor';
import IDBManger from '../src/IO_Mangers/DBManger/intrface/IDBManger';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";

import PassValidetor from 'validetors/passValidetor';
import SatelliteValidetor from 'validetors/satelliteValidetor';
import UserValidetor from 'validetors/userValidetor';


import SatellitesDBManger from 'IO_Mangers/DBManger/mongoDB/SatellitesDBManger';
import PassesDBManger from 'IO_Mangers/DBManger/mongoDB/PassesDBManger';
import AuthDBManger from 'IO_Mangers/DBManger/mongoDB/AuthDBManger';

import passLogic from 'business logic/passesUseCases';
import authLogic from 'business logic/authUseCases';
import CRUDLogic from 'business logic/CRUDUseCases';

import ConcreteMediators from 'Mediator/ConcreteMediators';
import ErrorResponse from 'utils/errorResponse';



let satelliteManger:CRUDLogic;
let passManger:CRUDLogic;
let userManger:CRUDLogic;
let passFinder:passLogic;
let authManger:authLogic;



let passDB:IDBManger;
let satDB:IDBManger;
let userDB:IDBManger;

let passValidetor:IValidetor;
let satelliteValidetor:IValidetor;
let userValidetor:IValidetor;

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();

    
	const mongoUri = await mongoServer.getUri();

    passValidetor = new PassValidetor();
    satelliteValidetor = new SatelliteValidetor();
    userValidetor = new UserValidetor();

    satDB = new SatellitesDBManger();
    passDB = new PassesDBManger();
    userDB = new AuthDBManger();

    await satDB.connect(mongoUri);

    satelliteManger = new CRUDLogic(satDB, satelliteValidetor);
    passManger = new CRUDLogic(passDB, passValidetor);
    userManger = new CRUDLogic(userDB, userValidetor);
    passFinder = new passLogic();
    authManger = new authLogic(userDB);
    
    let meditor = new ConcreteMediators(passManger, satelliteManger, passFinder); 
    satelliteManger.setMediator(meditor);
    passManger.setMediator(meditor);
});


afterEach(() => {
    return mongoose.disconnect();
})

describe('test the CRUD Bussiness logic on a satllites data base', () => {

    test("get satellite from empty db return 404 no found err", () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId()

        const next = (error) => {
            expect(error.message).toBe(`data with id: ${id} wasnt found`)
            expect(error.statusCode).toBe(404)

        }

        return satelliteManger.getSingleById({params: {id}}, {}, next);
    })

    test("get satellite return the satellite", async () => {
        expect.assertions(8);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await satDB.create(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                Object.keys(output.toObject()).forEach(key =>
                     expect(obj.data[key]).toEqual(output[key]));
            }
        }


        return satelliteManger.getSingleById({params: {id}}, res, null);
    })

    test("get all satellites with satId < 3 and sort by satId and select of satId", async () => {
        expect.assertions(10);
        
        let satellitesToCreate = 
        [
            {
                name: 'test 2',
                satId: 2
            },
            {
                name: 'test 1',
                satId: 1
            },
            
            {
                name: 'test 3',
                satId: 3
            },
            {
                name: 'test 4',
                satId: 4
            }
        ];
        
        for (const satellite of satellitesToCreate) 
            await satDB.create(satellite);
        
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                satellitesToCreate = satellitesToCreate.sort((a, b) => a.satId - b.satId);
                for(let i = 0; i < obj.data.length; i++)
                {
                    expect(satellitesToCreate[i].satId).toEqual(obj.data[i].satId);
                    expect(obj.data[i].satId).toBeLessThanOrEqual(3);
                    expect(Object.keys(obj.data[i].toObject())).toEqual(['_id', 'satId', 'id']);
                }
            }
        }
        
        const req = {
                query: {
                    satId: {lte: 3},
                    sort: 'satId',
                    select: 'satId'

                }
            }

        return satelliteManger.getAll(req, res, null);
    }, 20000)

    test("create satellite", async () => {
        expect.assertions(8);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }


        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                Object.keys(satelliteToCreate).forEach(key =>
                     expect(obj.data[key]).toEqual(satelliteToCreate[key]));
            }
        }


        await satelliteManger.create({body: satelliteToCreate}, res);
        await satelliteManger.getSingleById({params: {id}}, res, null);
    })

    test("update satllite", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const satlliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        await satDB.create(satlliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.name).toBe("test2");
            }
        }


        return satelliteManger.Update({params: {id}, body: {name: "test2"}}, res, null);
    })

    
    test("delete satllite", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const satlliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

         await satDB.create(satlliteToCreate);


        const res1 = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }
        const next = (error) => {
                expect(error.message).toBe(`data with id: ${id} wasnt found`);
                expect(error.statusCode).toBe(404)            
        }


        await satelliteManger.deleteSingle({params: {id}}, res1, (e) => {throw new Error(e);});
        return satelliteManger.getSingleById({params: {id}}, {}, next);

    })

})

describe('test the pass finder', () => {
    
    test('get and save satllite passes', async () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId:  44854 
        }

        await satDB.create(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                expect(obj).toBeTruthy();
            }
        }

        await passFinder.getSatellitePasses({query: {endTime: new Date(Date.now() + 1000000)}, params: {id}}, res, null);

        let output = await satDB.getSingleById(id);
        expect(output).not.toEqual([]);
    });

    test('get and save all satllites passes', async () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId:  44854 
        }

        await satDB.create(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                expect(obj).toBeTruthy();
            }
        }

        await passFinder.getAllPasses({query: {endTime: new Date(Date.now() + 1000000)}}, res, null);

        let output = await satDB.getSingleById(id);
        expect(output).not.toEqual([]);
    });
})

describe('test the auth logic', () => {

    test("regester a user encript password and match it", async () => {
        expect.assertions(3);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        const req = { body: testUser};
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {}
        }


        await userManger.create(req, res, () => {});

        const savedUser = await userDB.findOne({ email: testUser.email }, {select: '+password'});
        
        expect(savedUser.password).not.toBe(testUser.password);

        expect(await savedUser.matchPassword(testUser.password)).toBe(true);

    })

    test("regestered user can login", async () => {
        expect.assertions(3);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        const req = { body: testUser};
        const res1 = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
            }
        }
        const res2 = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                const token = obj.data;
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                expect(decode.id).toBeTruthy();
            }
        }


        await userManger.create(req, res1, () => {});
        await authManger.login(req, res2, () => {});
    })

    test("empty user cannt login", async () => {
        expect.assertions(1);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        const req = { body: testUser};
        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {}
        }

        const next = function(err){
                expect(err).toEqual(new ErrorResponse('please provide an email and a password', 400));
                return this;
            }

        await userManger.create(req, res, () => {});
        await authManger.login({body: {}}, res, next);
    })

    test("not register user cannt login", async () => {
        expect.assertions(1);
        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req = { body: testUser};
        
        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {}
        }

        const next = function(err){
                expect(err).toEqual(new ErrorResponse(`invalid credentials`, 401));
                return this;
            }


        await authManger.login(req, res, next);
    })

    test("user with wrong password cannt login", async () => {
        expect.assertions(1);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        const req = { body: testUser};
        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {}
        }

        const next = function(err){
                expect(err).toEqual(new ErrorResponse(`invalid credentials`, 401));
                return this;
            }

        await userManger.create(req, res, () => {});
        req.body.password = "123457";
        await authManger.login(req, res, next);
    })

    test("login user can accses protect routes", async () => {
        expect.assertions(4);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req:any = { body: testUser,
            headers: {}};
 
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {                
                req.headers.authorization = 'Bearer ' + obj.data;
            }
        }

        const next = (err?) =>
        {
            expect(err).toBeFalsy();
            expect(req.user).toBeTruthy();
        }

        await userManger.create(req, res, () => {});
        await authManger.login(req, res, () => {});
        await authManger.protect(req, {}, next)
    })

    test("not login user cant accses protect routes", async () => {
        expect.assertions(2);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req:any = { body: testUser,
            headers: {}};

        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }

        const next = (err?) =>
        {
            expect(err).toEqual(new ErrorResponse('not authorize to acccess this route', 401));
            expect(req.user).toBeFalsy();
        }

        await userManger.create(req, res, () => {});
        await authManger.protect(req, {}, next)
    })

    test("not existing user cant accses protect routes", async () => {
        expect.assertions(3);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req:any = { body: testUser,
            headers: {}};

        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {
                req.headers.authorization = 'Bearer ' + obj.data;
            }
        }

        const next = (err?) =>
        {
            expect(err).toEqual(new ErrorResponse('not authorize to acccess this route', 401));
            expect(req.user).toBeFalsy();
        }

        await userManger.create(req, res, () => {});
        await authManger.login(req, res, () => {});

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        await userDB.delete(decode.id);

        await authManger.protect(req, {}, next)
    })

    test("users with the right roles are authorize to the right routes", async () => {
        expect.assertions(1);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req:any = { body: testUser, user: testUser};
        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }

        const next = (err?) =>
        {
            expect(err).toBeFalsy();
        }

        await userManger.create(req, res, () => {});

        authManger.authorize("student", "admin")(req, {}, next);
    })

    test("users with out the right roles are authorize to the right routes", async () => {
        expect.assertions(1);

        const testUser = {
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };
        const req:any = { body: testUser, user: testUser};
        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }

        const next = (err?) =>
        {
            expect(err).toEqual(new ErrorResponse(`User role is not authorized to access this route `, 403));
        }

        await userManger.create(req, res, () => {});

        authManger.authorize("instructions", "admin")(req, {}, next);
    })


})
