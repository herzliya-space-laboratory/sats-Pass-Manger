import mangoDBManger from './mangoDBManger'

import Test from '../models/Test';

export default class TestsDBManger extends mangoDBManger
{
    findOne(query: any, params?: any) {
        throw new Error('Method not implemented.');
    }

    
    async getAll(query = {}, params ={}) {
        let dbRequst = Test.find(query);

        this.formatTheDBRequst(dbRequst, params, '');

        return await dbRequst;
    }

    async getSingleById(_id) {
        const resTest = await Test.findById(_id);

        return resTest;
    }

    async create(testToCreate) {
        return await Test.create(testToCreate);
    }

    async update(_id, dataToUpdate) {
        return await Test.findByIdAndUpdate(_id, dataToUpdate, {new: true});
    }

    async delete(_id: any) {
        return await Test.findByIdAndDelete(_id);
    }

    getAmount() {
        Test.countDocuments({}, (err, count) => {
            this.testsAmount = count;
        })

        return this.testsAmount;
    }
}