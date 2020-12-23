require("../src/utils/dotenvInit");

import jwt from 'jsonwebtoken';

import IDBManger from '../src/IO_Mangers/DBManger/intrface/IDBManger';
import mangoDBManger from '../src/IO_Mangers/DBManger/mongoDB/mangoDBManger';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";

import satelliteLogic from '../src/business logic/satelliteUseCases';
import SatellitesDBManger from 'IO_Mangers/DBManger/mongoDB/SatellitesDBManger';

import PassesDBManger from 'IO_Mangers/DBManger/mongoDB/PassesDBManger';
import passLogic from 'business logic/passesUseCases';

import AuthDBManger from 'IO_Mangers/DBManger/mongoDB/AuthDBManger';
import authLogic from 'business logic/authUseCases';

import ISatellitesDBManger from 'IO_Mangers/DBManger/intrface/ISatellitesDBManger';
import IPassesDBManger from 'IO_Mangers/DBManger/intrface/IPassesDBManger';
import IAuthDBManger from 'IO_Mangers/DBManger/intrface/IAuthDBManger';

import ConcreteMediators from 'Mediator/ConcreteMediators';
import ErrorResponse from 'utils/errorResponse';


let satelliteManger:satelliteLogic;
let passManger:passLogic;
let usersManger:authLogic;

let db:IDBManger;
let passDB:IPassesDBManger;
let satDB:ISatellitesDBManger;
let userDB:IAuthDBManger;

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new mangoDBManger();

    
	const mongoUri = await mongoServer.getUri();
    await db.connect(mongoUri);

    satDB = new SatellitesDBManger();
    satelliteManger = new satelliteLogic(satDB);

    passDB = new PassesDBManger();
    passManger = new passLogic(passDB);

    userDB = new AuthDBManger();
    usersManger = new authLogic(userDB);
    
    let meditor = new ConcreteMediators(passManger, satelliteManger); 
    satelliteManger.setMediator(meditor);
    passManger.setMediator(meditor);
});


afterEach(() => {
    return mongoose.disconnect();
})

describe('satellite business logic', () => {

    test("get satellite from empty db return 404 no found err", () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId()
        
        const res = {
            status: function(status){
                expect(status).toBe(404)
                return this;
            },
            json: (obj) => {
                expect(obj.data).toBeNull();
                expect(obj.error).toBe(`Satellite with id: ${id} wasnt found`)
            }
        }


        return satelliteManger.getSingleSatellite({params: {id}}, res);
    })

    test("get satellite return the satellite", async () => {
        expect.assertions(8);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await satDB.createSatellite(satelliteToCreate);

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


        return satelliteManger.getSingleSatellite({params: {id}}, res);
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
            await satDB.createSatellite(satellite);
        
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

        return satelliteManger.getAllSatellites(req, res);
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


        await satelliteManger.createSatellite({body: satelliteToCreate}, res);
        await satelliteManger.getSingleSatellite({params: {id}}, res);
    })

    test('get and save satllite passes', async () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId:  44854 
        }

        await satDB.createSatellite(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                expect(obj).toBeTruthy();
            }
        }

        await satelliteManger.getSatellitePassesAndSaveThem({query: {endTime: new Date(Date.now() + 1000000)}, params: {id}}, res);

        let output = await satDB.getSingleSatellite(id);
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

        await satDB.createSatellite(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                expect(obj).toBeTruthy();
            }
        }

        await satelliteManger.getAllSatellitesPassesAndSaveThem({query: {endTime: new Date(Date.now() + 1000000)}}, res);

        let output = await satDB.getSingleSatellite(id);
        expect(output).not.toEqual([]);
    });


    test("update user", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await satDB.createSatellite(passToCreate);
        output.password = undefined;

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.name).toBe("test2");
            }
        }


        return satelliteManger.updatSingleSatellite({params: {id}, body: {name: "test2"}}, res, null);
    })

    
    test("delete user", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await satDB.createSatellite(passToCreate);


        const res1 = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }
        const res2 = {
            status: function(status){
                expect(status).toBe(404)
                return this;
            },
            json: (obj) => {
                expect(obj.error).toBe(`Satellite with id: ${id} wasnt found`);
            }
        }


        await satelliteManger.deleteSingleSatellite({params: {id}}, res1);
        return satelliteManger.getSingleSatellite({params: {id}}, res2);

    })

})

describe('passes business logic', () => {
    test("get pass from empty db return 404 no found err", () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId()
        
        const res = {
            status: function(status){
                expect(status).toBe(404)
                return this;
            },
            json: (obj) => {
                expect(obj.data).toBeNull();
                expect(obj.error).toBe(`pass with id: ${id} wasnt found`)
            }
        }


        return passManger.getSinglePass({params: {id}}, res);
    })

    test("get pass return the pass", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id,
            title: 'test 1',
            startTime: new Date(),
            endTime: new Date()
        }

        const output = await passDB.createPass(passToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.toObject()).toEqual(output.toObject());
            }
        }


        return passManger.getSinglePass({params: {id}}, res);
    })

    test("get all pass", async () => {
        expect.assertions(1 + 4*4);
        
        let PassToCreate = 
        [
            {
                goal: 'test 1',
                startTime: new Date(90),
                endTime: new Date(),
                maxElevation: 10
            },
            {
                goal: 'test 2',
                startTime: new Date(900),
                endTime: new Date(),
                maxElevation: 20
            },
            {
                goal: 'test 3',
                startTime: new Date(1),
                endTime: new Date(),
                maxElevation: 30
            },
            {
                goal: 'test 4',
                startTime: new Date(),
                endTime: new Date(),
                maxElevation: 40
            }
        ];
        
        
        await passDB.createPass(PassToCreate);
        
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                PassToCreate = PassToCreate.sort((a, b) => a.maxElevation - b.maxElevation);
                obj.data = obj.data.sort((a, b) => a.maxElevation - b.maxElevation);
                for(let i = 0; i < obj.data.length; i++)
                {
                    Object.keys(PassToCreate).forEach(key => expect(obj.data[i][key]).toBe(PassToCreate[i][key]))
                }
            }
        }

        await passManger.getAllPasses({}, res);
    })

    test("get all pass with startTime < 1000 and sort by elevation and select of elevation and startTime", async () => {
        expect.assertions(10);
        
        let PassToCreate = 
        [
            {
                goal: 'test 1',
                startTime: new Date(90),
                endTime: new Date(),
                maxElevation: 10
            },
            {
                goal: 'test 2',
                startTime: new Date(900),
                endTime: new Date(),
                maxElevation: 20
            },
            {
                goal: 'test 3',
                startTime: new Date(1),
                endTime: new Date(),
                maxElevation: 30
            },
            {
                goal: 'test 4',
                startTime: new Date(),
                endTime: new Date(),
                maxElevation: 40
            }
        ];
        
        
        await passDB.createPass(PassToCreate);
        
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                PassToCreate = PassToCreate.sort((a, b) => a.maxElevation - b.maxElevation);
                for(let i = 0; i < obj.data.length; i++)
                {
                    expect(obj.data[i].maxElevation).toEqual(PassToCreate[i].maxElevation);
                    expect(obj.data[i].maxElevation).toBeLessThanOrEqual(1000);
                    expect(Object.keys(obj.data[i].toObject())).toEqual(['_id', 'startTime', 'maxElevation']);
                }
            }
        }
        
        const req = {
                query: {
                    startTime: {lt: 1000},
                    sort: 'maxElevation',
                    select: 'maxElevation startTime'

                }
            }

        await passManger.getAllPasses(req, res);
    })

    test("add pass plan to a pass", async () => {
        expect.assertions(9);

        const id = new mongoose.Types.ObjectId();
        const now = new Date();

        const passToCreate = {
            _id: id,
            startTime: now,
            endTime: new Date(now.getSeconds() + 14*60000),
            maxElevation: 40,
            duration: 14
        }


        await passDB.createPass(passToCreate);

        const passPlan = {
            goal: 'test pass',
            PassPlanner: 'itai lupo',
            PassExecuter: 'itai lupo'
        }

        const req = {body: passPlan, params: {id}}

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                
                Object.keys(passToCreate).forEach(key => expect(obj.data[key]).toStrictEqual(passToCreate[key]));
                Object.keys(passPlan).forEach(key => expect(obj.data.toObject()[key]).toEqual(passPlan[key]));
            }
        }

        await passManger.UpdatePassPlan(req, res);
    })

    test('add pass plan with wrong parmeter return 404, please fill all the data', async () =>{
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId();
        const now = new Date();

        const passToCreate = {
            _id: id,
            startTime: now,
            endTime: new Date(now.getSeconds() + 14*60000),
            maxElevation: 40,
            duration: 14
        }


        await passDB.createPass(passToCreate);

        const passPlan = {}

        const req = {body: passPlan, params: {id}}

        const res = {
            status: function(status){
                expect(status).toBe(400);
                return this;
            },
            json: (obj) => {
                expect(obj.success).toBe(false);
                expect(obj.error).toBe('please fill all the data');
            }
        }

        await passManger.UpdatePassPlan(req, res);


    })

    test("add post pass to pass to a pass", async () => {
        expect.assertions(7);

        const id = new mongoose.Types.ObjectId();
        const now = new Date();

        const passToCreate = {
            _id: id,
            startTime: now,
            endTime: new Date(now.getSeconds() + 14*60000),
            maxElevation: 40,
            duration: 14
        }


        await passDB.createPass(passToCreate);

        const whatWasExecute = {
            whatWasExecute: 'all'
        }

        const req = {body: whatWasExecute, params: {id}}

        const res = {
            status: function(status){
                expect(status).toBe(200);
                return this;
            },
            json: (obj) => {
                Object.keys(passToCreate).forEach(key => expect(obj.data[key]).toStrictEqual(passToCreate[key]));
                Object.keys(whatWasExecute).forEach(key => expect(obj.data.toObject()[key]).toEqual(whatWasExecute[key]));
            }
        }

        await passManger.UpdateWhatWasInAPass(req, res, null);
    })

    test('add what was in pass to pass with wrong parmeter return 404, please fill all the data', async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        const now = new Date();

        const passToCreate = {
            _id: id,
            startTime: now,
            endTime: new Date(now.getSeconds() + 14*60000),
            maxElevation: 40,
            duration: 14
        }


        await passDB.createPass(passToCreate);

        const whatWasExecute = {
        }

        const req = {body: whatWasExecute, params: {id}}

        const res = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }
        const next = (err) => {
            expect(err.statusCode).toBe(400);
            expect(err.message).toBe("please fill all the data");

        }

        await passManger.UpdateWhatWasInAPass(req, res, next);


    })
})

describe('auth business logic', () => {
    test("regester a user return valid user token", async () => {
        expect.assertions(2);

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
            json: (obj) => {
                const token = obj.data;
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                expect(decode.id).toBeTruthy();
            }
        }


        await usersManger.register(req, res, () => {});
    })

    test("regester a user saves it in the db", async () => {
        expect.assertions(4);

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


        await usersManger.register(req, res, () => {});

        const savedUser = await userDB.findUser({ email: testUser.email });
        Object.keys(testUser).forEach(key => {
            if(key !== "password")
                expect(savedUser[key]).toEqual(testUser[key]);
        });
    })

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


        await usersManger.register(req, res, () => {});

        const savedUser = await userDB.findUser({ email: testUser.email }, true);
        
        expect(savedUser.password).not.toBe(testUser.password);

        expect(await savedUser.matchPassword(testUser.password)).toBe(true);

    })

    test("regestered user can login", async () => {
        expect.assertions(4);

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
            json: (obj) => {
                const token = obj.data;
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                expect(decode.id).toBeTruthy();
            }
        }


        await usersManger.register(req, res, () => {});
        await usersManger.login(req, res, () => {});
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

        await usersManger.register(req, res, () => {});
        await usersManger.login({body: {}}, res, next);
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


        await usersManger.login(req, res, next);
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

        await usersManger.register(req, res, () => {});
        req.body.password = "123457";
        await usersManger.login(req, res, next);
    })

    test("login user can accses protect routes", async () => {
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
                req.headers.authorization = 'Bearer ' + obj.data;
            }
        }

        const next = (err?) =>
        {
            expect(err).toBeFalsy();
            expect(req.user).toBeTruthy();
        }

        await usersManger.register(req, res, () => {});
        await usersManger.protect(req, {}, next)
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

        await usersManger.register(req, res, () => {});
        await usersManger.protect(req, {}, next)
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

        await usersManger.register(req, res, () => {});

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        await userDB.deleteUser(decode.id);

        await usersManger.protect(req, {}, next)
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

        await usersManger.register(req, res, () => {});

        usersManger.authorize("student", "admin")(req, {}, next);
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

        await usersManger.register(req, res, () => {});

        usersManger.authorize("instructions", "admin")(req, {}, next);
    })

    test('get all users', async () => {
        expect.assertions(1 + 4*4);
        
        let UsersToCreate = 
        [
            {
                name: "1",
                email: "1@gmail.com",
                role: "student",
                password: "123456"
            },
            {
                name: "2",
                email: "2@gmail.com",
                role: "student",
                password: "123456"
            },
            {
                name: "3",
                email: "2@gmail.com",
                role: "student",
                password: "123456"
            },
            {
                name: "4",
                email: "2@gmail.com",
                role: "student",
                password: "123456"
            }
        ];
        
        
        await userDB.createUser(UsersToCreate);
        
        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                UsersToCreate = UsersToCreate.sort((a, b) => parseInt(a.name) - parseInt(b.name));
                obj.data = obj.data.sort((a, b) => parseInt(a.name) - parseInt(b.name));

                for(let i = 0; i < obj.data.length; i++)
                {
                    Object.keys(UsersToCreate).forEach(key => expect(obj.data[i][key]).toBe(UsersToCreate[i][key]))
                }
            }
        }

        await usersManger.getAllUsers({}, res);
    })


    test("get user from empty db return 404 no found err", () => {
        expect.assertions(3);

        const id = new mongoose.Types.ObjectId()
        
        const res = {
            status: function(status){
                expect(status).toBe(404)
                return this;
            },
            json: (obj) => {
                expect(obj.data).toBeNull();
                expect(obj.error).toBe(`user with id: ${id} wasnt found`)
            }
        }


        return usersManger.getSingleUser({params: {id}}, res);
    })

    test("get user return the user", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id, 
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        }

        const output = await userDB.createUser(passToCreate);
        output.password = undefined;

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.toObject()).toEqual(output.toObject());
            }
        }


        return usersManger.getSingleUser({params: {id}}, res);
    })

    test("update user", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id, 
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        }

        const output = await userDB.createUser(passToCreate);
        output.password = undefined;

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.email).toBe("2@gmail.com");
            }
        }


        return usersManger.updatSingleUser({params: {id}, body: {email: "2@gmail.com"}}, res);
    })

    
    test("delete user", async () => {
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const passToCreate = {
            _id: id, 
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        }

        const output = await userDB.createUser(passToCreate);

        const res1 = {
            status: function(status){
                return this;
            },
            json: (obj) => {
            }
        }
        const res2 = {
            status: function(status){
                expect(status).toBe(404)
                return this;
            },
            json: (obj) => {
                expect(obj.error).toBe(`user with id: ${id} wasnt found`);
            }
        }


        await usersManger.deleteSingleUser({params: {id}}, res1);
        return usersManger.getSingleUser({params: {id}}, res2);

    })

})
