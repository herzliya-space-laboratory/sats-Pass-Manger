require('../../src/utils/dotenvInit');

import AuthDBManger from '../../src/IO_Mangers/DBManger/mongoDB/AuthDBManger';

import User from '../../src/IO_Mangers/DBManger/models/User';

import mongoose = require('mongoose');
import { MongoMemoryServer } from "mongodb-memory-server";



let db:AuthDBManger;
let mongoServer: MongoMemoryServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
    db = new AuthDBManger();

    const mongoUri = await mongoServer.getUri();
    
    db.connect(mongoUri);
});

afterEach(() => {
    return mongoose.disconnect();
})

describe("auth db test", () => {
    test("get all users from empty db shold be empty array", async () => {
        const res = await db.getAllUsers();

        expect(res).toEqual([]);
    })
    test("get all errors from db shold return them", async () => {

        const testUsers = [{
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        },
        {
            name: "2",
            email: "2@gmail.com",
            role: "student",
            password: "123457"            
        },
        {
            name: "3",
            email: "3@gmail.com",
            role: "student",
            password: "123458"
            
        }];

        await User.create(testUsers);
        const res = (await db.getAllUsers())
            .sort((a, b) => parseInt(a.name)- parseInt(b.name));

        expect(res.length).toEqual(testUsers.length);

        for(let i = 0; i < testUsers.length; i++)
        {
            
            Object.keys(testUsers[i]).forEach(key => {
                if(key !== "password")
                    expect(res[i][key]).toEqual(testUsers[i][key]);
            });
        }
    })

    test("get Single User by id", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testUser = {
            _id,    
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456" 
        };

        await User.create(testUser);
        const res = await db.getSingleUser(_id);

        Object.keys(testUser).forEach(key => {
            if(key !== "password")
                expect(res[key]).toEqual(testUser[key]);
        });
        
    })

    test("update Single User by id", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testUser = { 
            _id,    
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456" 
        };

        const ToUpdate = {
            email: "1i@gmail.com",
            role: "instructions",
        };

        await User.create(testUser);
        
        await db.updateUser(_id, ToUpdate);
        const res = await db.getSingleUser(_id);

        Object.keys(ToUpdate).forEach(key => {
            expect(res[key]).toEqual(ToUpdate[key]);
        });
        
    })

    test("create single User", async () => {
        const _id = new mongoose.Types.ObjectId();

        const testUser = {
            _id,    
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        await db.createUser(testUser);
        const res = await db.getSingleUser(_id);

        Object.keys(testUser).forEach(key => {
            if(key !== "password")
                expect(res[key]).toEqual(testUser[key]);
        });
    })

    test('delete user', async () => {
        const _id = new mongoose.Types.ObjectId();

        const testUser = {
            _id,    
            name: "1",
            email: "1@gmail.com",
            role: "student",
            password: "123456"
        };

        await db.createUser(testUser);
        
        await db.deleteUser(_id);
        const res = await db.getSingleUser(_id);

        expect(res).toBeFalsy();
    })

    test("get Single User by email", async () => {
        const _id = new mongoose.Types.ObjectId();
        const email = "1@gmail.com";
        const password = "123456";
        const testUser = {
            _id,    
            name: "1",
            email,
            role: "student",
            password
        };

        await User.create(testUser);
        const res = await db.findUser({ email }, true);

        expect(await res.matchPassword(password)).toEqual(true);
        Object.keys(testUser).forEach(key => {
            if(key !== "password")
                expect(res[key]).toEqual(testUser[key]);
        });
        
    })

})
