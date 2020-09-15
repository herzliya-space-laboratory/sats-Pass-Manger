import asyncHandler  = require("../utils/async");
import ErrorResponse = require("../utils/errorResponse");

import IDBManager from "../IO_Mangers/DBManger/IDBManger";
import ISatellitesDBManger from "../IO_Mangers/DBManger/ISatellitesDBManger";
import formatQueryAndGetPagination from "../utils/queryFormater";

export default class satelliteLogic
{
    private db:ISatellitesDBManger;

    constructor(db:IDBManager)
    {
        this.db = db as ISatellitesDBManger;
    }

    
    getSingleSatellite = asyncHandler(async (req, res, next) => {
        const id = req.params.id;   

        const satellite = await this.db.getSingleSatellites(id);

        if(!satellite)
            this.returnRespondToTheClientWithErr(res, 404, satellite,
                 `Satellite with id: ${id} wasnt found`)
        else
            this.returnSuccessRespondToTheClient(res, 200, satellite)
        
    })


    getAllSatellites = asyncHandler(async (req, res, next) => {
        const query = req.query || {};

        const SatellitesTotalAmount = this.db.getSatellitesAmount()
        const {pagination, formatQuery, params} = formatQueryAndGetPagination(query, SatellitesTotalAmount);

        const resSatellites = await this.db.getAllSatellites(formatQuery, params);

        this.returnSuccessRespondToTheClientWithPage(res, 200, resSatellites, pagination);
    })

    createSatellite = asyncHandler( async (req, res, next) => {
        const satellitesToCreate = req.body;
        console.log(satellitesToCreate);
        const CreatedSatellites = await this.db.createSatellite(satellitesToCreate);

        this.returnSuccessRespondToTheClient(res, 200, CreatedSatellites)
    })

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