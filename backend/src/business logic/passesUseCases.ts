import ErrorResponse from "../utils/errorResponse";

import IPassesDBManger from "../IO_Mangers/DBManger/intrface/IPassesDBManger";
import { formatQueryForMoongose, formatPagination } from "../utils/queryFormater";

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
        let {formatQuery, params} = formatQueryForMoongose(query);

        const resPass = await this.db.getAllPasses(formatQuery, params);

        let pagination = formatPagination(query, passTotalAmount);

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

    UpdateWhatWasInAPass = async (req, res, next) => {
        const id = req.params.id;
        const whatWasExecuted:{
            whatWasExecute: string,
            manualErrors: string,
            systemErrors: string,
            status: string
        } = req.body;
        
        if(!this.checkUpdatePassExqtedIsValid(whatWasExecuted))
        {
            next(new ErrorResponse('please fill all the data', 400))
            return;
        }

        try {
            const updatedPass = await this.db.updatePass(id, whatWasExecuted);
            returnSuccessRespondToTheClient(res, 200, updatedPass);            
        } catch (error) {
            next(error);
        }
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
        return pass;
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
        return true;
    }
}