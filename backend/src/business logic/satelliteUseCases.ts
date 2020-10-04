import ErrorResponse = require("../utils/errorResponse");

import ISatellitesDBManger from "../IO_Mangers/DBManger/ISatellitesDBManger";
import formatQueryAndGetPagination from "../utils/queryFormater";

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

        const satellite = await this.db.getSingleSatellites(id);

        if(!satellite)
            returnRespondToTheClientWithErr(res, 404, satellite,
                 `Satellite with id: ${id} wasnt found`)
        else
            returnSuccessRespondToTheClient(res, 200, satellite)
        
    }


    getAllSatellites = async (req, res) => {
        const query = req.query || {};

        const SatellitesTotalAmount = this.db.getSatellitesAmount()
        const {pagination, formatQuery, params} = formatQueryAndGetPagination(query, SatellitesTotalAmount);

        const resSatellites = await this.db.getAllSatellites(formatQuery, params);

        returnSuccessRespondToTheClientWithPage(res, 200, resSatellites, pagination);
    }

    createSatellite =  async (req, res) => {
        const satellitesToCreate = req.body;
        
        const CreatedSatellites = await this.db.createSatellite(satellitesToCreate);

        returnSuccessRespondToTheClient(res, 200, CreatedSatellites)
    }


    getSatellitePassesAndSaveThem =  async (req, res) => {
        const id = req.params.id;

        const startTime = await this.mediator.notify({}, 'getNewistPassTime') || new Date();
        
        
        let endTime = new Date(req.query.endTime);

        const satellite = await this.db.getSingleSatellites(id);

        const TLE = await getSatelliteTle(satellite.satId);

        const newPasses = await findSatellitePasses(TLE, startTime, endTime, id);
        
        const passes = await this.mediator.notify(newPasses, 'newPassWasFount');
        
        returnSuccessRespondToTheClient(res, 200, passes)
    }
} 