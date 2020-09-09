import mongoose from "mongoose";

import IDBManager from "./IDBManger";


export default class mangoDBManger implements IDBManager
{
    connect(URI) 
    {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(conn => console.log(`mongoDB Connected: ${conn.connection.host}`));
    
        
    
    }
}