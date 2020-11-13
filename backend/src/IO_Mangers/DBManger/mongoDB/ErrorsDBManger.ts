import mangoDBManger from './mangoDBManger'
import IErrorsDBManger from "../intrface/IErrorsDBManger";

import Error from "../models/Error";

export default class ErrorsDBManger extends mangoDBManger implements IErrorsDBManger
{

   
    async getAllErrors(query: any = {}, params:any = {}) {
        let dbRequst = Error.find(query);
        
        this.formatTheDBRequst(dbRequst, params, 'solveProcess');

        return await dbRequst;
    }

    async getSingleErrors(id) {
        const resError = await Error.findById(id);
        

        return resError;
    }

    async createError(ErrorToCreate) 
    {
        const newError = await Error.create(ErrorToCreate);

        return newError;
    }

    async updateError(id, dataToUpdate) 
    {
        const updatedError = await Error.findByIdAndUpdate(id, dataToUpdate);

        return updatedError;
    }

    async deleteError(id) {
        const deleted = await Error.findByIdAndDelete(id);

        return deleted;
    }
    
}