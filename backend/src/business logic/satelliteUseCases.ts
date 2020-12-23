import ErrorResponse = require("../utils/errorResponse");

import ISatellitesDBManger from "../IO_Mangers/DBManger/intrface/ISatellitesDBManger";
import { formatQueryForMoongose, formatPagination} from "../utils/queryFormater";

import getSatelliteTle from "../utils/getSatelliteTle";
import findSatellitePasses from "../utils/getSatellitePasses";
import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

import BaseComponent from "../Mediator/BaseComponent";

export default class satelliteLogic extends BaseComponent
{
    private db:ISatellitesDBManger;

    constructor(db:ISatellitesDBManger)
    {
        super();
        this.db = db;
    }

    
    getSingleSatellite = async (req, res) => {
        const id = req.params.id;

        const satellite = await this.db.getSingleSatellite(id);

        if(!satellite)
            returnRespondToTheClientWithErr(res, 404, satellite,
                 `Satellite with id: ${id} wasnt found`)
        else
            returnSuccessRespondToTheClient(res, 200, satellite)
        
    }


    getAllSatellites = async (req, res) => {
        const query = req.query;

        const SatellitesTotalAmount = this.db.getSatellitesAmount()
        const {formatQuery, params} = formatQueryForMoongose(query);

        const resSatellites = await this.db.getAllSatellites(formatQuery, params);
        let pagination = formatPagination(query, SatellitesTotalAmount);

        returnSuccessRespondToTheClientWithPage(res, 200, resSatellites, pagination);
    }

    createSatellite =  async (req, res, next?) => {
        const satellitesToCreate = req.body;
        try {
            const CreatedSatellites = await this.db.createSatellite(satellitesToCreate);

            returnSuccessRespondToTheClient(res, 200, CreatedSatellites)  
        } catch (error) {
            next(error);
        }
    }


    updatSingleSatellite = async (req, res, next) => {
        const id = req.params.id;
        const dataToUpdate = req.body;
        try {
            const CreatedSatellites = await this.db.changeSatelliteData(id, dataToUpdate);

            returnSuccessRespondToTheClient(res, 200, CreatedSatellites)
            
        } catch (error) {
            next(error);
        }
    }


    deleteSingleSatellite = async (req, res) => {
        const id = req.params.id;

        await this.db.deleteSingleSatellite(id);

        returnSuccessRespondToTheClient(res, 200, {})
        
    }

    getSatellitePassesAndSaveThem =  async (req, res) => {
        const id = req.params.id;

        let startTime = await this.mediator.notify(id, 'getNewistPassTime') || new Date();
        startTime = new Date(startTime.getTime() + 30*60000);
        
        let endTime = new Date(req.query.endTime);

        const satellite = await this.db.getSingleSatellite(id);
        
        let TLE = await this.getTle(satellite);
        
        const newPasses = await findSatellitePasses(TLE, startTime, endTime, id);
        
        const passes = await this.mediator.notify(newPasses, 'newPassWasFount');
        
        returnSuccessRespondToTheClient(res, 200, passes);
    }

    getAllSatellitesPassesAndSaveThem = async (req, res) => {
        const sats:any = await this.db.getAllSatellites();
        let passes = [];
        for(let sat of sats)
        {   
            let startTime = await this.mediator.notify(sat._id, 'getNewistPassTime') || new Date();
            startTime = new Date(startTime.getTime() + 30*60000);
            
            let endTime = new Date(req.query.endTime);

            const TLE = await this.getTle(sat);

            const newPasses = await findSatellitePasses(TLE, startTime, endTime, sat._id);
            
            passes.push(await this.mediator.notify(newPasses, 'newPassWasFount'));

        }
        
        returnSuccessRespondToTheClient(res, 200, passes)
    }

    private async getTle(satellite) {
        let TLE;
        try
        {
            TLE = await getSatelliteTle(satellite.satId);
            this.db.changeSatelliteData(satellite._id, {tle: TLE});
        }
        catch(e)
        {
            console.log(e);
            TLE = satellite.tle;
        }
        return TLE;
    }
} 