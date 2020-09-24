require("./utils/dotenvInit");

import IAPIManagers from "./IO_Mangers/ApiManger/IAPIManager";

import IDBManger from './IO_Mangers/DBManger/IDBManger';
import { createDBManger, createAPIManger } from "./utils/MangersInit";

import satelliteLogic from "./business logic/satelliteUseCases";

const DBManger: IDBManger = createDBManger();

const APIManger: IAPIManagers = createAPIManger();

const satelliteManger:satelliteLogic = new satelliteLogic(DBManger);

DBManger.connect(process.env.MONGO_URI);

initIOInputRoutes();

process.on("unhandledRejection", (err: any, promise) => {
    if(!err.message) err.message = "server error";
    console.log(`error: ${err.message}`);

    APIManger.close();
    process.exit(1);
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
            callback: satelliteManger.getSatellitePasses
        }
    ];


    const routes = [
        ...satellitesRoutes
        ];

    routes.forEach(route => {
        APIManger.addRoute(route.method, route.path, route.callback);
    })
}