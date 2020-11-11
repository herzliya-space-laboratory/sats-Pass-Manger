require("../src/utils/dotenvInit");

import IDBManger from '../src/IO_Mangers/DBManger/IDBManger';
import mangoDBManger from '../src/IO_Mangers/DBManger/mangoDBManger';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";

import satelliteLogic from '../src/business logic/satelliteUseCases';
import SatellitesDBManger from 'IO_Mangers/DBManger/SatellitesDBManger';
import PassesDBManger from 'IO_Mangers/DBManger/PassesDBManger';
import passLogic from 'business logic/passesUseCases';
import ISatellitesDBManger from 'IO_Mangers/DBManger/ISatellitesDBManger';
import IPassesDBManger from 'IO_Mangers/DBManger/IPassesDBManger';
import ConcreteMediators from 'Mediator/ConcreteMediators';


let satelliteManger:satelliteLogic;
let passManger:passLogic;

let db:IDBManger;
let passDB:IPassesDBManger;
let satDB:ISatellitesDBManger;

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
    
    let meditor = new ConcreteMediators(passManger, satelliteManger); 
    satelliteManger.setMediator(meditor);
    passManger.setMediator(meditor);
});


afterEach(() => {
    return mongoose.disconnect();
})

describe('test the satellite business logic', () => {

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
})

describe('test the passes business logic', () => {
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

        await passManger.UpdateWhatWasInAPass(req, res);
    })

    test('add what was in pass to pass with wrong parmeter return 404, please fill all the data', async () => {
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

        const whatWasExecute = {
        }

        const req = {body: whatWasExecute, params: {id}}

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

        await passManger.UpdateWhatWasInAPass(req, res);


    })

})