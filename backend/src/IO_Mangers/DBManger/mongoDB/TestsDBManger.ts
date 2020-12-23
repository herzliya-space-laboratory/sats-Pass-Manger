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
        return await Test.create(testToCreate);
    }

    async updateTest(_id, dataToUpdate) {
        return await Test.findByIdAndUpdate(_id, dataToUpdate, {new: true});
    }

    async deleteTest(_id: any) {
        return await Test.findByIdAndDelete(_id);
    }

    getTestsAmount() {
        Test.countDocuments({}, (err, count) => {
            this.testsAmount = count;
        })

        return this.testsAmount;
    }
}