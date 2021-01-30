import ErrorResponse from "../utils/errorResponse";

import IDBManger from "../IO_Mangers/DBManger/intrface/IDBManger";
import { 
    formatQueryForMoongose, 
    formatPagination, 
    formatPaginationToPouplated 
} from "../utils/queryFormater";

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
        try {

            const { id, query} = this.Validetor.validateGetById(req);

            const totalAmount = (await this.db.getSingleById(id));
            let { params } = formatQueryForMoongose(query);
            
            const ResData = await this.db.getSingleById(id, {...params});
            if(!ResData) 
                throw new Error(`data with id: ${id} wasnt found`);

            let pagination = formatPaginationToPouplated(params, totalAmount);
            
            returnSuccessRespondToTheClientWithPage(res, 200, ResData, pagination);         
        } catch (error) {  
                   console.log(error);
                     
            next(new ErrorResponse(404,  error.message));
            
        }        
    }

    findOne = async (req, res, next)  => {
        try {
            const query = this.Validetor.validateFindOne(req);

            let {formatQuery, params} = formatQueryForMoongose(query);

            const data = await this.db.findOne(formatQuery, params);

            if(!data) 
                throw new Error(`data with ${JSON.stringify(formatQuery)} and ${JSON.stringify(params)} wasn't found`);

            returnSuccessRespondToTheClient(res, 200, data);
        } catch (error) {
            next(error);   
        } 
    }

    getAll =  async (req, res, next) => {
        try {
            const query = this.Validetor.validateGetAll(req);

            const totalAmount = this.db.getAmount()
            let {formatQuery, params} = formatQueryForMoongose(query);

            const resData = await this.db.getAll(formatQuery, params);

            let pagination = formatPagination(query, totalAmount);
            
            returnSuccessRespondToTheClientWithPage(res, 200, resData, pagination);
        } catch (error) {
            next(error);   
        }
    }

    Update = async (req, res, next) => {
        try {
            const { id, dataToUpdate } = this.Validetor.validateUpdate(req);

            const updatedData = await this.db.update(id, dataToUpdate);
            if(!updatedData) throw new Error(`data with id: ${id} wasnt found`);
            
            returnSuccessRespondToTheClient(res, 200, updatedData);
        } catch (error) {
            next(error)
        }
    }

    create =  async (req, res, next?) => {
        try {
            const dataToCreate = this.Validetor.validateCreate(req);
            const CreatedData = await this.db.create(dataToCreate);

            returnSuccessRespondToTheClient(res, 200, CreatedData);  
        } catch (error) {
            next(error)            
        }
    }



    deleteSingle = async (req, res, next) => {        
        try 
        {
            const id =  this.Validetor.validateDelete(req);
    
            const deleted = await this.db.delete(id);
            if(!deleted) throw new Error(`data with id: ${id} wasnt found`);

            returnSuccessRespondToTheClient(res, 200, deleted);
        } catch (error) {
            next(error);
        }
    }
}