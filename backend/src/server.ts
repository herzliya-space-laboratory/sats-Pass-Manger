require("./utils/dotenvInit");

import IAPIManagers from "./IO_Mangers/ApiManger/IAPIManager";

import IDBManger from './IO_Mangers/DBManger/intrface/IDBManger';
import { createDBManger, createAPIManger } from "./utils/MangersInit";

import satelliteLogic from "./business logic/satelliteUseCases";
import passLogic from "./business logic/passesUseCases";
import authLogic from "./business logic/authUseCases";
import testsLogic from "./business logic/testsUseCases";


import IPassesDBManger from "IO_Mangers/DBManger/intrface//IPassesDBManger";
import ISatellitesDBManger from "IO_Mangers/DBManger/intrface/ISatellitesDBManger";
import IAuthDBManger from "IO_Mangers/DBManger/intrface/IAuthDBManger";
import ITestsDBManger from "IO_Mangers/DBManger/intrface/ITestsDBManger";


import SatellitesDBManger from "./IO_Mangers/DBManger/mongoDB/SatellitesDBManger";
import PassesDBManger from "./IO_Mangers/DBManger/mongoDB/PassesDBManger";
import AuthDBManger from "./IO_Mangers/DBManger/mongoDB/AuthDBManger";
import TestsDBManger from "./IO_Mangers/DBManger/mongoDB/TestsDBManger";

import ConcreteMediators from "./Mediator/ConcreteMediators";


let DBManger:IDBManger = createDBManger();
DBManger.connect(process.env.MONGO_URI);

const PORT: number = parseInt(process.env.PORT  || '4000');
const APIManger: IAPIManagers = createAPIManger(PORT);

let satDBManger:ISatellitesDBManger = new SatellitesDBManger();
const satelliteManger:satelliteLogic = new satelliteLogic(satDBManger);


const passDBManger:IPassesDBManger = new PassesDBManger();
const passesManger:passLogic = new passLogic(passDBManger);

const authDBManger:IAuthDBManger = new AuthDBManger();
const authManger:authLogic = new authLogic(authDBManger);

const testDBManger:ITestsDBManger = new TestsDBManger();
const testsManger:testsLogic = new testsLogic(testDBManger);



const mediator = new ConcreteMediators(passesManger, satelliteManger);

initIOInputRoutes();

process.on("unhandledRejection", (err: any, promise) => {
    if(!err.message) err.message = "server error";
    console.log(`error: ${err}`);
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
            method: 'delete',
            path: '/api/v1/satellite/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.deleteSingleSatellite]
        },
        {
            method: 'put',
            path: '/api/v1/satellite/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.updatSingleSatellite]
        },
        {
            method: 'post',
            path: '/api/v1/satellite/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.createSatellite]
        },
        {
            method: 'get',
            path: '/api/v1/satellite/passes/:id',
            callback: satelliteManger.getSatellitePassesAndSaveThem
        },
        {
            method: 'get',
            path: '/api/v1/satellites/passes/',
            callback: satelliteManger.getAllSatellitesPassesAndSaveThem
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
            callback: [authManger.protect, passesManger.UpdatePassPlan]
        },
        {
            method: 'put',
            path: '/api/v1/pass/updateWhatWasExequte/:id',
            callback: [authManger.protect, passesManger.UpdateWhatWasInAPass]
        }
        
    ];

    const userRoutes = [
        {
            method: 'get',
            path: '/api/v1/user/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), authManger.getAllUsers]
        },
        {
            method: 'get',
            path: '/api/v1/user/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), authManger.getSingleUser]
        },
        {
            method: 'post',
            path: '/api/v1/login/',
            callback: authManger.login
        },
        {
            method: 'post',
            path: '/api/v1/register/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), authManger.register]
        },
        {
            method: 'delete',
            path: '/api/v1/user/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), authManger.deleteSingleUser]
        },
        {
            method: 'put',
            path: '/api/v1/user/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), authManger.updatSingleUser]
        }
    ];

    const testsRoutes = [
        {
            method: 'get',
            path: '/api/v1/test/',
            callback: testsManger.getAllTests
        },
        {
            method: 'get',
            path: '/api/v1/test/:id',
            callback: testsManger.getSingleTest
        },
        {
            method: 'put',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.updatSingleTest]
        },
        {
            method: 'post',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.createTest]
        },
        {
            method: 'delete',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.deleteSingleTest]
        }
        
    ];

    const routes = [
        ...satellitesRoutes,
        ...passesRoutes,
        ...userRoutes,
        ...testsRoutes
        ];

    routes.forEach(route => {
        APIManger.addRoute(route.method, route.path, route.callback);
    })

    APIManger.initMiddleware();
}