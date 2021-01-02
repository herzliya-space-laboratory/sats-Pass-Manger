import { ObjectId } from 'mongoose';

export default interface IDBManager
{
	connect(URI): void;

    getAll(query?, params?);
    getSingleById(id:ObjectId, params?);
    findOne(query, params?);
    create(UserToCreate);
    update(id:ObjectId, dataToUpdate);
	delete(id:ObjectId);
	
    getAmount();
}
