import mangoDBManger from './mangoDBManger'

import Error from "../models/Error";

export default class ErrorsDBManger extends mangoDBManger 
{
    findOne(query: any, params?: any) {
        throw new Error('Method not implemented.');
    }
    getAmount() {
        throw new Error('Method not implemented.');
    }

   
    async getAll(query: any = {}, params:any = {}) {
        let dbRequst = Error.find(query);
        
        this.formatTheDBRequst(dbRequst, params, 'solveProcess');

        return await dbRequst;
    }

    async getSingleById(id) {
        const resError = await Error.findById(id);
        

        return resError;
    }

    async create(ErrorToCreate) 
    {
        const newError = await Error.create(ErrorToCreate);

        return newError;
    }

    async update(id, dataToUpdate) 
    {
        const updatedError = await Error.findByIdAndUpdate(id, dataToUpdate);

        return updatedError;
    }

    async delete(id) {
        const deleted = await Error.findByIdAndDelete(id);

        return deleted;
    }
    
}