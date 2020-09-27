import {ObjectId} from 'mongoose';

export default interface IPassesDBManger 
{
    getAllPasses(query?, params?);
}
