import mangoDBManger from './mangoDBManger'
import ISatellitesDBManger from "../intrface/ISatellitesDBManger";

import Satellite from '../models/Satellite';
import { textChangeRangeIsUnchanged } from 'typescript';

export default class SatellitesDBManger extends mangoDBManger implements ISatellitesDBManger
{
    async getAllSatellites(query = {}, params:any = {}) 
    {
        let dbRequst = Satellite.find(query);

        dbRequst = this.formatTheDBRequst(dbRequst, params, 'pass');

        return await dbRequst;
    }

    async getSingleSatellite(id){
        const resSatellite = await Satellite.findById(id).populate(
            {
                path: 'pass',
                options: { sort: { 'startTime': -1 }}
            });
        return resSatellite;
    }


    async createSatellite(satelliteToCreate) 
    {
        const cratedSatellite = await Satellite.create(satelliteToCreate);

        return cratedSatellite;
    }

    async changeSatelliteData(id: any, dataToChange: Object) {
        return await Satellite.findByIdAndUpdate(id, dataToChange, {
            new: true
        }) 
    }

    async deleteSingleSatellite(id: any) {
        return await Satellite.findByIdAndDelete(id);
    }

    getSatellitesAmount() 
    {
        Satellite.countDocuments({}, (err, count) => {
            this.satelliteAmount = count;
        })

        return this.satelliteAmount;
    }
}