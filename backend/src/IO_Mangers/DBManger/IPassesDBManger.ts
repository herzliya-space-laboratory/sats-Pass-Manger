import {ObjectId} from 'mongoose';
import IDBManager from './IDBManger';

export default interface IPassesDBManger extends IDBManager
{
    getAllPasses(query?, params?);
    getSinglePass(id:ObjectId);
    createPass(PassToCrate);
    updatePass(id:ObjectId, dataToUpdate);
    getNewist(id);
    getPassAmount();
}
