import mangoDBManger from './mangoDBManger'
import ISatellitesDBManger from "./ISatellitesDBManger";

import Satellite from './models/Satellite';

export default class SatellitesDBManger extends mangoDBManger implements ISatellitesDBManger
{
    async getAllSatellites(query = {}, params:any = {}) 
    {
        let dbRequst = Satellite.find(query);

        dbRequst = this.formatTheDBRequst(dbRequst, params, 'pass');

        return await dbRequst;
    }

    async getSingleSatellites(id) {
        const resSatellite = await Satellite.findById(id).populate('pass')
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
}