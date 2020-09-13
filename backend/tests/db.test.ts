require('../src/utils/dotenvInit');

import IDBManger from '../src/IO_Mangers/DBManger/IDBManger';
import ISatellitesDBManger from '../src/IO_Mangers/DBManger/ISatellitesDBManger';

import mangoDBManger from '../src/IO_Mangers/DBManger/mangoDBManger';

import Satellite from '../src/IO_Mangers/DBManger/models/Satellite';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:IDBManger;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = new MongoMemoryServer();
    db = new mangoDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterAll(() => {
    return mongoose.disconnect();
})

describe("satellite db test", () => {

    test("get all satellites from empty db shold be empty array", async () => {
        const res = await (db as ISatellitesDBManger).getAllSatellites();

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

        const output = await Satellite.create(toCreate);

        const res = await (db as ISatellitesDBManger).getAllSatellites();

        for(let i = 0; i < res.length; i++)
        {
            expect(res[i].toObject()).toEqual(output[i].toObject());
        }

    })

})







