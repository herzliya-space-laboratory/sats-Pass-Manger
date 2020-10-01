import mangoDBManger from './mangoDBManger'
import IPassesDBManger from "./IPassesDBManger";

import Pass from "./models/Pass";

export default class PassesDBManger extends mangoDBManger implements IPassesDBManger
{
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
}