require("../src/utils/dotenvInit");

import IDBManger from '../src/IO_Mangers/DBManger/IDBManger';


import mangoDBManger from '../src/IO_Mangers/DBManger/mangoDBManger';
import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";

import satelliteLogic from '../src/business logic/satelliteUseCases';


let satelliteManger:satelliteLogic;

let db:IDBManger;

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new mangoDBManger();

    satelliteManger = new satelliteLogic(db);
    
	const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
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
        expect.assertions(2);

        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await db.createSatellite(satelliteToCreate);

        const res = {
            status: function(status){
                expect(status).toBe(200)
                return this;
            },
            json: (obj) => {
                expect(obj.data.toObject()).toEqual(output.toObject());
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
            await db.createSatellite(satellite);
        
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
                    expect(Object.keys(obj.data[i].toObject())).toEqual(['_id', 'satId']);
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
    })

    test("create satellite", async () => {
        expect.assertions(4);

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
                obj.data.__v = undefined;
                expect(obj.data.toObject()).toEqual(satelliteToCreate);
            }
        }


        await satelliteManger.createSatellite({body: satelliteToCreate}, res);
        await satelliteManger.getSingleSatellite({params: {id}}, res);
    })
})