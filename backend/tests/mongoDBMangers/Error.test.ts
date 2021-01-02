require('../../src/utils/dotenvInit');

import IDBManger from '../../src/IO_Mangers/DBManger/intrface/IDBManger';

import ErrorsDBManger from '../../src/IO_Mangers/DBManger/mongoDB/ErrorsDBManger';

import Error from '../../src/IO_Mangers/DBManger/models/Error';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:IDBManger;
let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new ErrorsDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterEach(() => {
    return mongoose.disconnect();
})

describe("error db test", () => {

    test("get all errors from empty db shold be empty array", async () => {
        const res = await db.getAll();

        expect(res).toEqual([]);
    })


    test("get all errors from db shold return them", async () => {

        const testErrors = [{
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "what's not",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "1",
            hypothesis: 'i dont know',
            howLongWillItTakeToSolve: 1,        
            WasSolved: false,
            howWasItSolved: "it wasnt"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "its not working",
            isTheSimptomRepeat: false,
            whoSpotedTheSymptom: "2",
            hypothesis: 'the thingiy dosent work',
            howLongWillItTakeToSolve: 2,        
            WasSolved: true,
            howWasItSolved: "they coonict the thing to the ather thing"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        }];

        await Error.create(testErrors);
        const res = (await db.getAll()).sort((a, b) => a.howLongWillItTakeToSolve - b.howLongWillItTakeToSolve);

        expect(res.length).toEqual(testErrors.length);

        for(let i = 0; i < testErrors.length; i++)
        {
            Object.keys(testErrors[i]).forEach(key => {
                expect(res[i][key]).toEqual(testErrors[i][key]);
            });
        }
    })

    test("get all errors with qury from db shold return them", async () => {

        const testErrors = [{
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "what's not",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "1",
            hypothesis: 'i dont know',
            howLongWillItTakeToSolve: 1,        
            WasSolved: false,
            howWasItSolved: "it wasnt"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "its not working",
            isTheSimptomRepeat: false,
            whoSpotedTheSymptom: "2",
            hypothesis: 'the thingiy dosent work',
            howLongWillItTakeToSolve: 2,        
            WasSolved: true,
            howWasItSolved: "they coonict the thing to the ather thing"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        }];

        const qury = {
            WasSolved: true,
            isTheSimptomRepeat: true
        }

        await Error.create(testErrors);

        
        const res = await db.getAll(qury);


        for(let i = 0; i < res.length; i++)
        {
            expect(res[i].WasSolved).toBe(true);  
            expect(res[i].isTheSimptomRepeat).toBe(true);            
        }
    })

    test("get all errors with qury and params from db shold return them", async () => {

        const testErrors = [{
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "what's not",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "1",
            hypothesis: 'i dont know',
            howLongWillItTakeToSolve: 1,        
            WasSolved: true,
            howWasItSolved: "it wasnt"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "its not working",
            isTheSimptomRepeat: false,
            whoSpotedTheSymptom: "2",
            hypothesis: 'the thingiy dosent work',
            howLongWillItTakeToSolve: 2,        
            WasSolved: true,
            howWasItSolved: "they coonict the thing to the ather thing"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        },
        {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        }];

        const qury = {
            WasSolved: true,
            isTheSimptomRepeat: true
        }

        const params = {
            select: 'WasSolved isTheSimptomRepeat whoSpotedTheSymptom',
            sort: '-whoSpotedTheSymptom'
        }

        await Error.create(testErrors);

        
        const res = await db.getAll(qury, params);

        for(let i = 0; i < res.length; i++)
        {
            expect(Object.keys(res[i].toObject())).toEqual(['_id', 'isTheSimptomRepeat', 'whoSpotedTheSymptom', 'WasSolved']);
            expect(res[i].WasSolved).toBe(true);           
            expect(res[i].isTheSimptomRepeat).toBe(true);
            if(res[i - 1])
                expect(parseInt(res[i].whoSpotedTheSymptom)).toBeLessThanOrEqual(parseInt(res[i - 1].whoSpotedTheSymptom));
            
        }
    })

    test("get Single error by id", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testError = {
            _id,    
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        };

        await Error.create(testError);
        const res = await db.getSingleById(_id);

        Object.keys(testError).forEach(key => {
            expect(res[key]).toEqual(testError[key]);
        });
        
    })

    test("update Single error by id", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testError = {
            _id,    
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        };

        const ToUpdate = {
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "its not working",
            isTheSimptomRepeat: false,
            whoSpotedTheSymptom: "2",
            hypothesis: 'the thingiy dosent work',
            howLongWillItTakeToSolve: 2,        
            WasSolved: true,
            howWasItSolved: "they coonict the thing to the ather thing"
        };

        await Error.create(testError);
        
        await db.update(_id, ToUpdate);
        const res = await db.getSingleById(_id);

        Object.keys(ToUpdate).forEach(key => {
            expect(res[key]).toEqual(ToUpdate[key]);
        });
        
    })

    test("create single error", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testError = {
            _id,    
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        };

        await db.create(testError);
        const res = await db.getSingleById(_id);

        Object.keys(testError).forEach(key => {
            expect(res[key]).toEqual(testError[key]);
        });
    })

    test('delete error', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testError = {
            _id,    
            whenTheErrorSpoted: new Date(),
            whatTheSimptoms: "it shotdown",
            isTheSimptomRepeat: true,
            whoSpotedTheSymptom: "3",
            hypothesis: 'we toald him to',
            howLongWillItTakeToSolve: 3,        
            WasSolved: true,
            howWasItSolved: "we stop teling him to"
        };

        await db.create(testError);
        
        await db.delete(_id);
        const res = await db.getSingleById(_id);

        expect(res).toBeFalsy();
        
    })
})


