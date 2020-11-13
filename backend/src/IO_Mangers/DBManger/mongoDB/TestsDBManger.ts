import mangoDBManger from './mangoDBManger'
import ITestsDBManger from "../intrface/ITestsDBManger";

import Test from '../models/Test';

export default class TestsDBManger extends mangoDBManger implements ITestsDBManger
{
    async getAllTests(query = {}, params ={}) {
        let dbRequst = Test.find(query);

        this.formatTheDBRequst(dbRequst, params, '');

        return await dbRequst;
    }

    async getSingleTest(_id) {
        const resTest = await Test.findById(_id);

        return resTest;
    }

    async createTest(testToCreate) {
        await Test.create(testToCreate);
    }

    async updateTest(_id, dataToUpdate) {
        await Test.findByIdAndUpdate(_id, dataToUpdate);
    }

    async deleteTest(_id: any) {
        await Test.findByIdAndDelete(_id);
    }
}