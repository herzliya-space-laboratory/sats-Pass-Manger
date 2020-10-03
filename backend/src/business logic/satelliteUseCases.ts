import ErrorResponse = require("../utils/errorResponse");

import ISatellitesDBManger from "../IO_Mangers/DBManger/ISatellitesDBManger";
import formatQueryAndGetPagination from "../utils/queryFormater";

import getSatelliteTle from "../utils/getSatelliteTle";
import getSatellitePasses from "../utils/getSatellitePasses";
import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

export default class satelliteLogic
{
    private db:ISatellitesDBManger;

    constructor(db:ISatellitesDBManger)
    {
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


    getSatellitePasses =  async (req, res) => {
        const id = req.params.id;

        let {startTime, endTime} = req.query;

        const satellite = await this.db.getSingleSatellites(id);

        const TLE = await getSatelliteTle(satellite.satId);

        const passes = await getSatellitePasses(TLE, startTime, endTime);

        returnSuccessRespondToTheClient(res, 200, passes)
    }
}