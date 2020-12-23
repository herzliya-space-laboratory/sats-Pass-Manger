import ErrorResponse from "../utils/errorResponse";

import ITestsDBManger from "../IO_Mangers/DBManger/intrface/ITestsDBManger";
import { formatQueryForMoongose, formatPagination } from "../utils/queryFormater";

import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

export default class testsLogic
{
       
    private db:ITestsDBManger;

    constructor(db:ITestsDBManger)
    {
        this.db = db;
    }

    getSingleTest = async (req, res) => {
        const id = req.params.id;

        const test = await this.db.getSingleTest(id);

        if(!test)
            returnRespondToTheClientWithErr(res, 404, test,
                 `test with id: ${id} wasnt found`)
        else
            returnSuccessRespondToTheClient(res, 200, test)
        
    }

    getAllTests =  async (req, res) => {
        const query = req.query || {};

        const testsTotalAmount = this.db.getTestsAmount()
        let {formatQuery, params} = formatQueryForMoongose(query);

        const resTests = await this.db.getAllTests(formatQuery, params);

        let pagination = formatPagination(query, testsTotalAmount);

        returnSuccessRespondToTheClientWithPage(res, 200, resTests, pagination);
    }

    updatSingleTest = async (req, res, next?) => {
        const id = req.params.id;
        const dataToUpdate = req.body;

        try {
            const updated = await this.db.updateTest(id, dataToUpdate);

            returnSuccessRespondToTheClient(res, 200, updated)
            
        } catch (error) {
            throw error
            next(error);
        }
    }


    deleteSingleTest = async (req, res) => {
        const id = req.params.id;

        await this.db.deleteTest(id);

        returnSuccessRespondToTheClient(res, 200, {})
        
    }


    createTest =  async (req, res, next?) => {
        const testToCreate = req.body;
        try {
            const CreatedSatellites = await this.db.createTest(testToCreate);

            returnSuccessRespondToTheClient(res, 200, CreatedSatellites)  
        } catch (error) {
            next(error);
        }
    }
}