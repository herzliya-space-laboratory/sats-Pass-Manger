require('../../src/utils/dotenvInit');

import ITestsDBManger from '../../src/IO_Mangers/DBManger/intrface/ITestsDBManger';
import TestsDBManger from '../../src/IO_Mangers/DBManger/mongoDB/TestsDBManger';

import Test from '../../src/IO_Mangers/DBManger/models/Test';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:ITestsDBManger;
let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new TestsDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterEach(() => {
    return mongoose.disconnect();
})

describe("test db tests", () => {

    test("get all tests from empty db shold be empty array", async () => {
        const res = await db.getAllTests();

        expect(res).toEqual([]);
    })

    test("get all tests from non-empty db shold return the tests", async () => {
        const output = [{
            Length: 1,
            Planner: "itai"
        },
        {
            Length: 2,
            Planner: "lupo"
        },
        {
            Length: 3,
            Planner: "someone"
        }];

        await Test.create(output);
        const res = (await db.getAllTests()).sort((a, b) => a.Length - b.Length);

        expect(res.length).toBe(output.length);
        for(let i = 0; i < output.length; i++)
        {
            Object.keys(output[i]).forEach(key => {
                expect(res[i][key]).toEqual(output[i][key]);
            });
        }
    })

    test("get all tests from non-empty db with select and sort and qury shold return the tests", async () => {
        const output = [{
            Length: 1,
            Planner: "itai"
        },
        {
            Length: 2,
            Planner: "lupo"
        },
        {
            Length: 3,
            Planner: "someone"
        },
        {
            Length: 4,
            Planner: "someone2"
        }];

        const inputQuery = { Length: { $lte: 3}}
        const inputParams = { select: 'Length', sort: 'Length'}


        await Test.create(output);
        const res = await db.getAllTests(inputQuery, inputParams);


        expect(res.length).toBe(3);
        expect(res[0].Length).toBeLessThanOrEqual(3);

        for(let i = 1; i < res.length; i++)
        {
            expect(res[i].Length).toBeGreaterThan(res[i - 1].Length);
            expect(res[i].Length).toBeLessThanOrEqual(3);
        }
    })

    test('get a single test', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testError = {
            _id,    
            Length: 2,
            Planner: "lupo"
        };

        await Test.create(testError);
        const res = await db.getSingleTest(_id);

        Object.keys(testError).forEach(key => {
            expect(res[key]).toEqual(testError[key]);
        });
    })

    test('create a test', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testToCreate ={
            _id,
            Length: 4,
            Planner: "somebody"
        }

        await db.createTest(testToCreate);

        const res = await db.getSingleTest(_id);

        Object.keys(testToCreate).forEach(key => {
            expect(res[key]).toEqual(testToCreate[key]);
        })
        
    })

    test('update test data', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testToCreate ={
            _id,
            Length: 4,
            Planner: "somebody"
        }

        const dataToUpdate = {
            Length: 5,
            Planner: 'lupo',
            executor: 'somebody'
        }

        await db.createTest(testToCreate);
        await db.updateTest(_id, dataToUpdate);

        const res = await db.getSingleTest(_id);
        Object.keys(dataToUpdate).forEach(key => {
            expect(res[key]).toEqual(dataToUpdate[key]);
        })
    })

    test('delete test data', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testToCreate ={
            _id,
            Length: 4,
            Planner: "somebody"
        }

        await db.createTest(testToCreate);
        await db.deleteTest(_id);
        const res = await db.getSingleTest(_id);
        expect(res).toBeFalsy();
    })
})


