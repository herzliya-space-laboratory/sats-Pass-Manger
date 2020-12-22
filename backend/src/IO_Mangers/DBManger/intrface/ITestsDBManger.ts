import { ObjectId } from 'mongoose';
import IDBManager from './IDBManger';

export default interface ITestDBManger extends IDBManager
{
    createTest(testToCreate: { _id: any; Length: number; Planner: string; });
    getSingleTest(_id: ObjectId);
    getAllTests(Query?, Params?);
    updateTest(_id: ObjectId, dataToUpdate);
    deleteTest(_id: ObjectId);

}