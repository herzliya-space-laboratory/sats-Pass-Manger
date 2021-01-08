import ErrorResponse from "../utils/errorResponse";

import IDBManger from "../IO_Mangers/DBManger/intrface/IDBManger";
import { formatQueryForMoongose, formatPagination } from "../utils/queryFormater";

import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

import BaseComponent from "../Mediator/BaseComponent";

import IValidetor from "validetors/IValidetor";

export default class CRUDLogic extends BaseComponent
{
       
    private db:IDBManger;
    private Validetor:IValidetor;

    constructor(db:IDBManger, Validetor: IValidetor)
    {
        super();
        this.db = db;
        this.Validetor = Validetor;
    }

    getSingleById = async (req, res, next) => {
        const id = req.params.id;

        const pass = await this.db.getSingleById(id);
        
        if(!pass)
            next(new ErrorResponse(404,  `data with id: ${id} wasnt found`));
        else
            returnSuccessRespondToTheClient(res, 200, pass)
        
    }

    findOne = async (req, res, next)  => {
        const query = req.query || {};
        let {formatQuery, params} = formatQueryForMoongose(query);

        const data = await this.db.findOne(formatQuery, params);

        returnSuccessRespondToTheClient(res, 200, data);
    }

    getAll =  async (req, res, next) => {
        const query = req.query || {};

        const totalAmount = this.db.getAmount()
        let {formatQuery, params} = formatQueryForMoongose(query);

        const resData = await this.db.getAll(formatQuery, params);

        let pagination = formatPagination(query, totalAmount);
        
        returnSuccessRespondToTheClientWithPage(res, 200, resData, pagination);
    }

    Update = async (req, res, next) => {
        const id = req.params.id;
        const dataToUpdate = { ...req.body };
        
        if(!this.Validetor.validateUpdate(dataToUpdate))
        {
            returnRespondToTheClientWithErr(res, 400, null, 'please fill all the data');
            return;
        }

        try {
            const updatedData = await this.db.update(id, dataToUpdate);
            returnSuccessRespondToTheClient(res, 200, updatedData);
        } catch (error) {
            next(error)
        }
    }

    create =  async (req, res, next?) => {
        const dataToCreate = req.body;
        
        try {
            const CreatedData = await this.db.create(dataToCreate);

            returnSuccessRespondToTheClient(res, 200, CreatedData);  
        } catch (error) {
            console.log(error);
            
        }
    }



    deleteSingle = async (req, res, next) => {        
        try 
        {
            const id = req.params.id;
    
            const deleted = await this.db.delete(id);
            
            returnSuccessRespondToTheClient(res, 200, deleted)
        } catch (error) {
            next(error);
        }
    }
}