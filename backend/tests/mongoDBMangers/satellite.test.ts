require('../../src/utils/dotenvInit');

import IDBManger from '../../src/IO_Mangers/DBManger/intrface/IDBManger';
import SatellitesDBManger from '../../src/IO_Mangers/DBManger/mongoDB/SatellitesDBManger';

import Satellite from '../../src/IO_Mangers/DBManger/models/Satellite';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:IDBManger;
let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new SatellitesDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterEach(() => {
    return mongoose.disconnect();
})

describe("satellite db test", () => {

    test("get all satellites from empty db shold be empty array", async () => {
        const res = await db.getAll();

        expect(res).toEqual([]);
    })

    test("get all satellites", async () => {
        const toCreate = 
            [
                {
                    name: 'test 1',
                    satId: 1
                },
                {
                    name: 'test 2',
                    satId: 2
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

        await Satellite.create(toCreate);

        const res = (await db.getAll())
                        .sort((a, b) => a.satId - b.satId);


        for(let i = 0; i < res.length; i++)
        {            
            expect(res[i].name).toEqual(toCreate[i].name);
            expect(res[i].satId).toEqual(toCreate[i].satId);
        }

    })

    test("get all satellites with satId < 3", async () => {
        const toCreate = 
            [
                {
                    name: 'test 1',
                    satId: 1
                },
                {
                    name: 'test 2',
                    satId: 2
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

        await Satellite.create(toCreate);

        const query = { satId: { $lt: 3}};
        const res = await db.getAll(query);

        for(let i = 0; i < res.length; i++)
            expect(res[i].satId).toBeLessThan(3);
        
    })

    test("get all satellites with satId < 3 and only the satId field", async () => {
        const toCreate = 
            [
                {
                    name: 'test 1',
                    satId: 1
                },
                {
                    name: 'test 2',
                    satId: 2
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

        await Satellite.create(toCreate);

        const query = { satId: { $lt: 3}};
        const res = await db.getAll(query, {select: 'satId'});

        for(let i = 0; i < res.length; i++)
        {
            expect(Object.keys(res[i].toObject())).toEqual(['_id', 'satId', 'id']);
            expect(res[i].satId).toBeLessThan(3);
        }

    })

    test("get all satellites sort by satID", async () => {
        let toCreate = 
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

        await Satellite.create(toCreate);

        const res = await db.getAll({}, {sort: 'satId'});
        toCreate = toCreate.sort((a, b) => a.satId - b.satId);

        for(let i = 0; i < res.length; i++)
        {
            expect(res[i].name).toEqual(toCreate[i].name);
        }

    })

    test("get single satellite from db from empty db shold return null", async () => {
        const id = new mongoose.Types.ObjectId();
        
        const res = await db.getSingleById(id);

        expect(res).toBeNull();

    })

    test("get single satellite from db", async () => {
        const id = new mongoose.Types.ObjectId()
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const output = await Satellite.create(satelliteToCreate);
        
        
        const res = await db.getSingleById(id);
       
        Object.keys(output.toObject()).forEach(key => expect(res[key]).toEqual(output[key]));

    })


    test("create satellite in the db", async () => {
        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        let res = await db.create(satelliteToCreate);
        res.pass = undefined;

        const check = await db.getSingleById(id);

        expect(check).not.toBeNull();
        Object.keys(check.toObject()).forEach(key => expect(res[key]).toEqual(check[key]));

    })
    
    test("change satllite data", async () => {
        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const dataToChange = {
            name: 'test 2',
            satId: 2
        }

        await db.create(satelliteToCreate);
        let res = await db.update(id, dataToChange);
        res.pass = undefined;

        const check = await db.getSingleById(id);

        expect(check).not.toBeNull();
        Object.keys(check.toObject()).forEach(key => expect(res[key]).toEqual(check[key]));
    })

    test("delete satllite", async () => {
        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        const dataToChange = {
            name: 'test 2',
            satId: 2
        }

        await db.create(satelliteToCreate);
        await db.delete(id);
        
        const check = await db.getSingleById(id);

        expect(check).toBeNull();
    })

})


