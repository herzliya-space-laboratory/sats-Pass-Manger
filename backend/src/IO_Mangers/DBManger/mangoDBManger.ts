import mongoose from "mongoose";

import IDBManager from "./IDBManger";

import Satellite from './models/Satellite';
import Pass from "./models/Pass";

export default class mangoDBManger implements IDBManager
{
    satelliteAmount: number;

    connect(URI) 
    {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: false,
            keepAlive: 1
        })
        .then(conn => console.log(`mongoDB Connected: ${conn.connection.host}`));
        
        Satellite.countDocuments().then(count => this.satelliteAmount = count);
    }   

    protected formatTheDBRequst(dbRequst: any, params: any, populate:any = '') {
        if(Object.keys(params).length === 0) return dbRequst;

        if (this.populateRequset(params, populate))
            dbRequst = dbRequst.populate(populate);

        dbRequst = dbRequst.select(params.select);
        dbRequst = dbRequst.sort(params.sort);
        dbRequst = dbRequst.skip(params.skip);
        dbRequst = dbRequst.limit(params.limit);
        return dbRequst;
    }

    protected populateRequset(params: any, populate: any) {
        if(!params.select)
            return false;
            
        return params.select == "" ||
            (params.select.includes(populate) && !params.select.includes(`-${populate}`));
    }
}