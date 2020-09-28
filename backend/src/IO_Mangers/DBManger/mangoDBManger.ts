import mongoose from "mongoose";

import IDBManager from "./IDBManger";

import Satellite from './models/Satellite';
import Pass from "./models/Pass";

export default class mangoDBManger implements IDBManager
{
    satelliteAmount: any;

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


    getSatellitesAmount() 
    {
        Satellite.countDocuments({}, (err, count) => {
            if(err) throw new Error(err);
            this.satelliteAmount = count;
        })

        return this.satelliteAmount;
    }


    
    
    
    async getAllPasses(query?: any, params:any = {}) 
    {
        let dbRequst = Pass.find(query);
        
        this.formatTheDBRequst(dbRequst, params);

        return await dbRequst;
    }

    async getSinglePass(id) {
        const resPass = await Pass.findById(id)
        return resPass;
    }

    async createPass(passToCreate) 
    {
        const cratedPass = await Pass.create(passToCreate);

        return cratedPass;
    }

    async updatePass(id, dataToUpdate)
    {
        const updated = await Pass.findByIdAndUpdate(id, dataToUpdate, {
            new: true
        });

        return updated;
    }

    private formatTheDBRequst(dbRequst: any, params: any, populate:any = '') {
        if(Object.keys(params).length === 0) return dbRequst;

        if (this.populateRequset(params, populate))
            dbRequst = dbRequst.populate(populate);

        dbRequst = dbRequst.select(params.select);
        dbRequst = dbRequst.sort(params.sort);
        dbRequst = dbRequst.skip(params.skip);
        dbRequst = dbRequst.limit(params.limit);
        return dbRequst;
    }



    private populateRequset(params: any, populate: any) {
        if(!params.select)
            return false;
            
        return params.select == "" ||
            (params.select.includes(populate) && !params.select.includes(`-${populate}`));
    }
}