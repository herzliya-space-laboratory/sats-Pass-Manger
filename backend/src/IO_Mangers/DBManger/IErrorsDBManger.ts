import {ObjectId} from 'mongoose';

export default interface IErrorsDBManger
{
    getAllErrors(query?, params?);
    getSingleErrors(id);
    createError(ErrorToCreate);
    updateError(id, dataToUpdate);
    deleteError(id);
}
