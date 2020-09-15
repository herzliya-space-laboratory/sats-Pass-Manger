import mongoose from "mongoose";

import IDBManager from "./IDBManger";

import Satellite from './models/Satellite';

export default class mangoDBManger implements IDBManager
{
    satelliteAmount: any;

    connect(URI) 
    {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(conn => console.log(`mongoDB Connected: ${conn.connection.host}`));
        
        Satellite.countDocuments().then(count => this.satelliteAmount = count);
    }

    
    async getAllSatellites(query = {}, params:any = {}) 
    {
        let dbRequst = Satellite.find(query);

        dbRequst = this.formatTheDBRequst(dbRequst, params);

        return await dbRequst;
    }

    async getSingleSatellites(id) {
        const resSatellite = await Satellite.findById(id)
        return resSatellite;
    }


    async createSatellite(satelliteToCreate) 
    {
        const cratedSatellite = await Satellite.create(satelliteToCreate);

        return cratedSatellite;
    }


    private formatTheDBRequst(dbRequst: any, params: any) {
        dbRequst = dbRequst.select(params.select);
        dbRequst = dbRequst.sort(params.sort);
        return dbRequst;
    }


    getSatellitesAmount() 
    {
        Satellite.countDocuments({}, (err, count) => {
            if(err) throw new Error(err);
            this.satelliteAmount = count;
        })

        return this.satelliteAmount;
    }
}