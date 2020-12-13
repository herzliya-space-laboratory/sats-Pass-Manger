import mangoDBManger from './mangoDBManger'
import IAuthDBManger from "../intrface/IAuthDBManger";

import User from "../models/User";

export default class AuthDBManger extends mangoDBManger implements IAuthDBManger
{
    async getAllUsers(query:any = {}, params:any = {}) {
        let dbRequst = User.find(query);
        
        this.formatTheDBRequst(dbRequst, params, 'solveProcess');

        return await dbRequst;
    }
    
    async getSingleUser(id: any) {
        const resUser = await User.findById(id);
        

        return resUser;
    }

    async createUser(UserToCreate: any) {
        const newUser = await User.create(UserToCreate);

        return newUser;
    }
    
    async updateUser(id: any, dataToUpdate: any) {
        const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate);

        return updatedUser;
    }
    
    async deleteUser(id: any) {
        const deleted = await User.findByIdAndDelete(id);

        return deleted;
    }
    
    async findUser(findBy: any, withPassword) {
        const dbRequst = User.findOne(findBy);
        if(withPassword) dbRequst.select('+password');
        const user = await dbRequst;
        return user;
    }  
}