import mangoDBManger from './mangoDBManger'
import IPassesDBManger from "../intrface/IPassesDBManger";

import Pass from "../models/Pass";

export default class PassesDBManger extends mangoDBManger implements IPassesDBManger
{
    async getAllPasses(query: any = {}, params:any = {}) 
    {
        let dbRequst = Pass.find(query);
        
        this.formatTheDBRequst(dbRequst, params, 'Satellite');

        return await dbRequst;
    }

    async getSinglePass(id) {
        const resPass = await Pass.findById(id).populate('Satellite');
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

    async getNewist(id)
    {
        return await Pass.findOne({'Satellite': id}, {}, { sort: { 'startTime' : -1 } });
    }

    getPassAmount() 
    {
        Pass.countDocuments({}, (err, count) => {
            this.passAmount = count;
        })

        return this.passAmount;
    }
}