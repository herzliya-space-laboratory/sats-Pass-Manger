import mangoDBManger from './mangoDBManger'

import Satellite from '../models/Satellite';
import { textChangeRangeIsUnchanged } from 'typescript';

export default class SatellitesDBManger extends mangoDBManger
{
    findOne(query: any, params?: any) {
        throw new Error('Method not implemented.');
    }

    
    async getAll(query = {}, params:any = {}) 
    {
        
        let dbRequst = Satellite.find(query);

        dbRequst = this.formatTheDBRequst(dbRequst, params, '');

        return await dbRequst;
    }

    async getSingleById(id, params:any = { match: {}, options: {} }){
        const resSatellite = await Satellite.findById(id).populate(
            {
                path: 'pass',
                match : { ...params.match.pass},
                options: { ...params.options.pass}
            });
        return resSatellite;
    }


    async create(satelliteToCreate) 
    {
        const cratedSatellite = await Satellite.create(satelliteToCreate);
        this.satelliteAmount++;
        return cratedSatellite;
    }

    async update(id: any, dataToChange: Object) {
        return await Satellite.findByIdAndUpdate(id, dataToChange, {
            new: true
        }) 
    }

    async delete(id: any) {
        this.satelliteAmount--;
        return await Satellite.findByIdAndDelete(id);
    }

    getAmount() 
    {
        Satellite.countDocuments({}, (err, count) => {
            this.satelliteAmount = count;
        })

        return this.satelliteAmount;
    }
}