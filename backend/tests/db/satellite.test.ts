require('../../src/utils/dotenvInit');

import SatellitesDBManger from '../../src/IO_Mangers/DBManger/SatellitesDBManger';

import Satellite from '../../src/IO_Mangers/DBManger/models/Satellite';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:SatellitesDBManger;
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
        const res = await db.getAllSatellites();

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

        const res = (await db.getAllSatellites())
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
        const res = await db.getAllSatellites(query);

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
        const res = await db.getAllSatellites(query, {select: 'satId'});

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

        const res = await db.getAllSatellites({}, {sort: 'satId'});
        toCreate = toCreate.sort((a, b) => a.satId - b.satId);

        for(let i = 0; i < res.length; i++)
        {
            expect(res[i].name).toEqual(toCreate[i].name);
        }

    })

    test("get single satellite from db from empty db shold return null", async () => {
        const id = new mongoose.Types.ObjectId()
        
        const res = await db.getSingleSatellites(id);

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
        
        
        const res = await db.getSingleSatellites(id);
       
        Object.keys(output.toObject()).forEach(key => expect(res[key]).toEqual(output[key]));

    })


    test("create satellite in the db", async () => {
        const id = new mongoose.Types.ObjectId();
        
        const satelliteToCreate = {
            _id: id,
            name: 'test 1',
            satId: 1
        }

        let res = await db.createSatellite(satelliteToCreate);
        res.pass = undefined;

        const check = await db.getSingleSatellites(id);

        expect(check).not.toBeNull();
        Object.keys(check.toObject()).forEach(key => expect(res[key]).toEqual(check[key]));

    })
    

})


