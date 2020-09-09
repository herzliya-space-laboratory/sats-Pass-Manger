require('../utils/dotenvInit');

import IDBManger from '../src/IO_Mangers/DBManger/IDBManger';
import mangoDBManger from '../src/IO_Mangers/DBManger/mangoDBManger';

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









