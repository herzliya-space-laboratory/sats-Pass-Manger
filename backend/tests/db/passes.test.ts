require('../../src/utils/dotenvInit');

import IDBManger from '../../src/IO_Mangers/DBManger/IDBManger';
import IPassesDBManger from '../../src/IO_Mangers/DBManger/IPassesDBManger';

import mangoDBManger from '../../src/IO_Mangers/DBManger/mangoDBManger';

import Pass from '../../src/IO_Mangers/DBManger/models/Pass';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:IDBManger;
let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new mangoDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterEach(() => {
    return mongoose.disconnect();
})

describe("pass db test", () => {

    test("get all pass from empty db shold be empty array", async () => {
        const res = await (db as IPassesDBManger).getAllPasses();

        expect(res).toEqual([]);
    })


    test("get all passes", async () => {
        expect.assertions(4 * 3);
        const toCreate = 
            [
                {
                    goal: 'test 1',
                    startTime: new Date(),
                    endTime: new Date()
                },
                {
                    goal: 'test 2',
                    startTime: new Date(),
                    endTime: new Date()
                },
                {
                    goal: 'test 3',
                    startTime: new Date(),
                    endTime: new Date()
                },
                {
                    goal: 'test 4',
                    startTime: new Date(),
                    endTime: new Date()
                }
            ];

        await Pass.create(toCreate);

        const res = (await (db as IPassesDBManger).getAllPasses())
            .sort((a, b) => a.startTime - b.startTime);

        for(let i = 0; i < toCreate.length; i++)
        {            
            expect(res[i].goal).toEqual(toCreate[i].goal);
            expect(res[i].startTime).toEqual(toCreate[i].startTime);
            expect(res[i].endTime).toEqual(toCreate[i].endTime);
        }

    })

    test("get all passes before unix time 1000", async () => {
        expect.assertions(2);
        const toCreate = 
            [
                {
                    goal: 'test 1',
                    startTime: new Date(999),
                    endTime: new Date(2000)
                },
                {
                    goal: 'test 2',
                    startTime: new Date(200),
                    endTime: new Date(1000)
                },
                {
                    goal: 'test 3',
                    startTime: new Date(),
                    endTime: new Date()
                },
                {
                    goal: 'test 4',
                    startTime: new Date(),
                    endTime: new Date()
                }
            ];


        await Pass.create(toCreate);

        const query = { startTime: { $lt: new Date(1000)}};
        const res = await (db as IPassesDBManger).getAllPasses(query);
        for(let i = 0; i < res.length; i++)
            expect(res[i].startTime.getSeconds()).toBeLessThan(1000);
        
    })

    test("get all passes before unix time 1000 and only the startTime field", async () => {
        expect.assertions(4);
        const toCreate = 
            [
                {
                    goal: 'test 1',
                    startTime: new Date(999),
                    endTime: new Date(2000)
                },
                {
                    goal: 'test 2',
                    startTime: new Date(200),
                    endTime: new Date(1000)
                },
                {
                    goal: 'test 3',
                    startTime: new Date(),
                    endTime: new Date()
                },
                {
                    goal: 'test 4',
                    startTime: new Date(),
                    endTime: new Date()
                }
            ];
        await Pass.create(toCreate);

        const query = { startTime: { $lt: 1000}};
        const res = await (db as IPassesDBManger).getAllPasses(query, {select: 'startTime'});

        for(let i = 0; i < res.length; i++)
        {
            expect(Object.keys(res[i].toObject())).toEqual(['_id', 'startTime']);
            expect(res[i].startTime.getSeconds()).toBeLessThan(1000);
        }

    })

})
