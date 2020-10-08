require("./utils/dotenvInit");

import IAPIManagers from "./IO_Mangers/ApiManger/IAPIManager";

import IDBManger from './IO_Mangers/DBManger/IDBManger';
import { createDBManger, createAPIManger } from "./utils/MangersInit";

import satelliteLogic from "./business logic/satelliteUseCases";
import passLogic from "./business logic/passesUseCases";

import IPassesDBManger from "IO_Mangers/DBManger/IPassesDBManger";
import ISatellitesDBManger from "IO_Mangers/DBManger/ISatellitesDBManger";

import SatellitesDBManger from "./IO_Mangers/DBManger/SatellitesDBManger";
import PassesDBManger from "./IO_Mangers/DBManger/PassesDBManger";

import ConcreteMediators from "./Mediator/ConcreteMediators";


let DBManger:IDBManger = createDBManger();
DBManger.connect(process.env.MONGO_URI);

const APIManger: IAPIManagers = createAPIManger();

let satDBManger:ISatellitesDBManger = new SatellitesDBManger();
const satelliteManger:satelliteLogic = new satelliteLogic(satDBManger);


const passDBManger:IPassesDBManger = new PassesDBManger();
const passesManger:passLogic = new passLogic(passDBManger);

const mediator = new ConcreteMediators(passesManger, satelliteManger);

initIOInputRoutes();

process.on("unhandledRejection", (err: any, promise) => {
    if(!err.message) err.message = "server error";
    console.log(`error: ${err}`);

    // APIManger.close();
    // process.exit(1);
})

process.on('exit', () => {
    APIManger.close();
})

function initIOInputRoutes()
{
    const satellitesRoutes = [
        {
            method: 'get',
            path: '/api/v1/satellite/',
            callback: satelliteManger.getAllSatellites
        },
        {
            method: 'get',
            path: '/api/v1/satellite/:id',
            callback: satelliteManger.getSingleSatellite
        },
        {
            method: 'post',
            path: '/api/v1/satellite/',
            callback: satelliteManger.createSatellite
        },
        {
            method: 'get',
            path: '/api/v1/satellite/passes/:id',
            callback: satelliteManger.getSatellitePassesAndSaveThem
        }
    ];

    const passesRoutes = [
        {
            method: 'get',
            path: '/api/v1/pass/',
            callback: passesManger.getAllPasses
        },
        {
            method: 'get',
            path: '/api/v1/pass/:id',
            callback: passesManger.getSinglePass
        },
        {
            method: 'put',
            path: '/api/v1/pass/updatePlan/:id',
            callback: passesManger.UpdatePassPlan
        },
        {
            method: 'put',
            path: '/api/v1/pass/updateWhatWasExequte/:id',
            callback: passesManger.UpdateWhatWasInAPass
        },
        {
            method: 'get',
            path: '/api/v1/getClosePass',
            callback: passesManger.getClosestPass
        }
        
    ];

    const routes = [
        ...satellitesRoutes,
        ...passesRoutes
        ];

    routes.forEach(route => {
        APIManger.addRoute(route.method, route.path, route.callback);
    })
}