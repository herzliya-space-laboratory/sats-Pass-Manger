import {ObjectId} from 'mongoose';

export default interface IPassesDBManger 
{
    getAllPasses(query?, params?);
    getSinglePass(id);
    createPass(PassToCrate);
    updatePass(id, dataToUpdate);
}
