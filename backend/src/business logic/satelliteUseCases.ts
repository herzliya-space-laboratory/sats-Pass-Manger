import ErrorResponse = require("../utils/errorResponse");

import IDBManager from "../IO_Mangers/DBManger/IDBManger";
import ISatellitesDBManger from "../IO_Mangers/DBManger/ISatellitesDBManger";
import formatQueryAndGetPagination from "../utils/queryFormater";

import getSatelliteTle from "../utils/getSatelliteTle";
import getSatellitePasses from "../utils/getSatellitePasses";

export default class satelliteLogic
{
    private db:ISatellitesDBManger;

    constructor(db:IDBManager)
    {
        this.db = db as ISatellitesDBManger;
    }

    
    getSingleSatellite = async (req, res) => {
        const id = req.params.id;

        const satellite = await this.db.getSingleSatellites(id);

        if(!satellite)
            this.returnRespondToTheClientWithErr(res, 404, satellite,
                 `Satellite with id: ${id} wasnt found`)
        else
            this.returnSuccessRespondToTheClient(res, 200, satellite)
        
    }


    getAllSatellites = async (req, res) => {
        const query = req.query || {};

        const SatellitesTotalAmount = this.db.getSatellitesAmount()
        const {pagination, formatQuery, params} = formatQueryAndGetPagination(query, SatellitesTotalAmount);

        const resSatellites = await this.db.getAllSatellites(formatQuery, params);

        this.returnSuccessRespondToTheClientWithPage(res, 200, resSatellites, pagination);
    }

    createSatellite =  async (req, res) => {
        const satellitesToCreate = req.body;
        console.log(satellitesToCreate);
        const CreatedSatellites = await this.db.createSatellite(satellitesToCreate);

        this.returnSuccessRespondToTheClient(res, 200, CreatedSatellites)
    }


    getSatellitePasses =  async (req, res) => {
        const id = req.params.id;

        let {startTime, endTime} = req.query;

        const satellite = await this.db.getSingleSatellites(id);

        const TLE = await getSatelliteTle(satellite.satId);

        const passes = await getSatellitePasses(TLE, startTime, endTime);

        this.returnSuccessRespondToTheClient(res, 200, passes)
    }
    

    private returnSuccessRespondToTheClient(res, status, data)
    {
        return res.status(status).json({
            success: true,
            data
        });
    }

    private returnRespondToTheClientWithErr(res, status, data, error)
    {
        return res.status(status).json({
            success: true,
            data,
            error
        });
    }


    private returnSuccessRespondToTheClientWithPage(res, status, data, pagination)
    {
        return res.status(status).json({
            success: true,
            data,
            pagination
        });
    }

}