import ErrorResponse from "../utils/errorResponse";


import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';

import BaseComponent from "../Mediator/BaseComponent";

import passValidetor from '../validetors/passValidetor'
import findSatellitePasses from "../utils/getSatellitePasses";
import getSatelliteTle from "../utils/getSatelliteTle";

export default class passLogic extends BaseComponent
{
    constructor()
    {
        super();
    }

    getSatellitePasses =  async (req, res, next) => {
        const id = req.params.id;

        const satellite = await this.mediator.notify(id, 'getSatellite');
        
        try {
            const passes = await this.findSatellitePass(satellite, req)
            
            returnSuccessRespondToTheClient(res, 200, passes);
            
        } catch (error) {
            next(error);
        }
    }

    getAllPasses = async (req, res, next) => {
        let satellites;
        try {
            satellites = await this.mediator.notify({}, 'getAllSatellites');
        } catch (error) {
            return next(error);
        }

        let passes = [];

        for(let sat of satellites)
        {   
            try {
                passes.push(await this.findSatellitePass(sat, req));
            } catch (error) {
                return next(error);
            }
        }
        
        returnSuccessRespondToTheClient(res, 200, passes)
    }

    private async findSatellitePass(sat: any, req: any) {
        let startTime = await this.mediator.notify(sat._id, 'getNewistPassTime');

        let endTime = new Date(req.query.endTime);

        const TLE = await getSatelliteTle(sat.satId);

        const newPasses = await findSatellitePasses(TLE, startTime, endTime, sat._id);

        await this.mediator.notify(newPasses, 'newPassWasFount');
        
    }

}