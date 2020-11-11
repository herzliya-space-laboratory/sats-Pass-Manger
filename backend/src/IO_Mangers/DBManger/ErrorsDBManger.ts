import mangoDBManger from './mangoDBManger'
import IErrorsDBManger from "./IErrorsDBManger";

import Error from "./models/Error";

export default class ErrorsDBManger extends mangoDBManger implements IErrorsDBManger
{

   
    async getAllErrors(query: any = {}, params:any = {}) {
        let dbRequst = Error.find(query);
        
        this.formatTheDBRequst(dbRequst, params, 'solveProcess');

        return await dbRequst;
    }

    async getSingleErrors(id) {
        let resError = await Error.findById(id);
        

        return resError;
    }

    async createError(ErrorToCreate) 
    {
        let newError = await Error.create(ErrorToCreate);

        return newError;
    }

    async updateError(id, dataToUpdate) 
    {
        let updatedError = await Error.findByIdAndUpdate(id, dataToUpdate);

        return updatedError;
    }

    async deleteError(id) {
        let deleted = await Error.findByIdAndDelete(id);

        return deleted;
    }
    
}