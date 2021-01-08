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
        try {
            const id = this.Validetor.validateGetById(req);
            const pass = await this.db.getSingleById(id);

            if(!pass) throw new Error(`data with id: ${id} wasnt found`);
            
            returnSuccessRespondToTheClient(res, 200, pass)            
        } catch (error) {
            next(new ErrorResponse(404,  error.message));
            
        }

        
        
    }

    findOne = async (req, res, next)  => {
        try {
            const query = this.Validetor.validateFindOne(req);

            let {formatQuery, params} = formatQueryForMoongose(query);

            const data = await this.db.findOne(formatQuery, params);
            if(!data) throw new Error(`data with ${JSON.stringify(data)} was'nt found`);

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
        const id = req.params.id;
        const dataToUpdate = { ...req.body };

        try {
            this.Validetor.validateUpdate(dataToUpdate);

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