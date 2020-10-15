import ErrorResponse = require("../utils/errorResponse");

import IPassesDBManger from "../IO_Mangers/DBManger/IPassesDBManger";
import formatQueryAndGetPagination from "../utils/queryFormater";

import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

import BaseComponent from "../Mediator/BaseComponent";

export default class passLogic extends BaseComponent
{
       
    private db:IPassesDBManger;

    constructor(db:IPassesDBManger)
    {
        super();
        this.db = db;
    }

    getSinglePass = async (req, res) => {
        const id = req.params.id;

        const pass = await this.db.getSinglePass(id);

        if(!pass)
            returnRespondToTheClientWithErr(res, 404, pass,
                 `pass with id: ${id} wasnt found`)
        else
            returnSuccessRespondToTheClient(res, 200, pass)
        
    }

    getAllPasses =  async (req, res) => {
        const query = req.query || {};

        const passTotalAmount = this.db.getPassAmount()
        const {pagination, formatQuery, params} = formatQueryAndGetPagination(query, passTotalAmount);

        const resPass = await this.db.getAllPasses(formatQuery, params);

        returnSuccessRespondToTheClientWithPage(res, 200, resPass, pagination);
    }

    UpdatePassPlan = async (req, res) => {
        const id = req.params.id;
        const PassPlan:{
            goal: String,
            PassPlanner: String,
            PassExecuter: String,
            status: string
        } = req.body;

        if(!this.checkUpdatePassPlanIsValid(PassPlan))
        {
            returnRespondToTheClientWithErr(res, 400, null, 'please fill all the data');
            return;
        }

        const updatedPass = await this.db.updatePass(id, PassPlan);
        returnSuccessRespondToTheClient(res, 200, updatedPass);
    }

    UpdateWhatWasInAPass = async (req, res) => {
        const id = req.params.id;
        const whatWasExecuted:{
            whatWasExecute: string,
            manualErrors: string,
            systemErrors: string,
            status: string
        } = req.body;
        
        if(!this.checkUpdatePassExqtedIsValid(whatWasExecuted))
        {
            returnRespondToTheClientWithErr(res, 400, null, 'please fill all the data');
            return;
        }

        const updatedPass = await this.db.updatePass(id, whatWasExecuted);
        returnSuccessRespondToTheClient(res, 200, updatedPass);
    }

    async createPasses(passes: any) 
    {
        await this.db.createPass(passes);
        let newPasses = this.db.getAllPasses({}, {sort:'startTime'})
        return newPasses;
    }

    async getNewistPass(req?:any , res?:any)
    {
        const pass = (await this.db.getNewist(req.params.id)) || {startTime: new Date()};
        if(res)
            returnSuccessRespondToTheClient(res, 200, pass);
        else
            return pass;
    }

     getClosestPass = async (req:any, res:any) =>
    {
        const pass = (await this.db.getAllPasses({'endTime': {'$gte': new Date()}}, { sort: 'endTime'}))[0];
        returnSuccessRespondToTheClient(res, 200, pass);
    }

    private checkUpdatePassPlanIsValid(PassPlan)
    {
        if(PassPlan.goal == undefined || PassPlan.goal == '') return false;
        if(PassPlan.PassPlanner == undefined || PassPlan.PassPlanner == '') return false;
        if(PassPlan.PassExecuter == undefined || PassPlan.PassExecuter == '') return false;
        return true;
    }

    private checkUpdatePassExqtedIsValid(whatWasExecuted) {
        if(whatWasExecuted.whatWasExecute == undefined || whatWasExecuted.whatWasExecute == '') return false;
        if(whatWasExecuted.manualErrors == undefined || whatWasExecuted.manualErrors == '') return false;
        if(whatWasExecuted.systemErrors == undefined || whatWasExecuted.systemErrors == '') return false;
        return true;
    }
}