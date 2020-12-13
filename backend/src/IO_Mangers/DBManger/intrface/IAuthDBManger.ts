import { ObjectId } from 'mongoose';

export default interface IAuthDBManger
{
    getAllUsers(query?, params?);
    getSingleUser(id:ObjectId);
    createUser(UserToCreate);
    updateUser(id:ObjectId, dataToUpdate);
    deleteUser(id:ObjectId);
    findUser(findBy, withPassword);
}
