import mangoDBManger from './mangoDBManger'

import Pass from "../models/Pass";

export default class PassesDBManger extends mangoDBManger 
{
    async findOne(query: any, params?: any) {
        const pass = await Pass.findOne(query, {}, params);
        return pass;
    }

    delete(id: any) {
        throw new Error('Method not implemented.');
    }
    
    async getAll(query: any = {}, params:any = {}) 
    {
        let dbRequst = Pass.find(query);
        console.log(params);
        
        this.formatTheDBRequst(dbRequst, params, 'Satellite PassPlanner PassOperator manualErrors systemErrors');

        return await dbRequst;
    }

    async getSingleById(id) {
        const resPass = await Pass.findById(id).populate('Satellite PassPlanner PassOperator manualErrors systemErrors');
        return resPass;
    }

    async create(passToCreate) 
    {
        const cratedPass = await Pass.create(passToCreate);
        this.passAmount++;
        return cratedPass;
    }

    async update(id, dataToUpdate)
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

    getAmount() 
    {
        Pass.countDocuments({}, (err, count) => {
            this.passAmount = count;
        })

        return this.passAmount;
    }
}