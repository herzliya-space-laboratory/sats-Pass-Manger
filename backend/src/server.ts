require("./utils/dotenvInit");

import IAPIManagers from "./IO_Mangers/ApiManger/IAPIManager";

import { createDBManger, createAPIManger, createValidetors } from "./utils/MangersInit";

import CRUDLogic from "./business logic/CRUDUseCases";
import authLogic from "./business logic/authUseCases";

import ConcreteMediators from "./Mediator/ConcreteMediators";
import IValidetor from "./validetors/IValidetor";
import passLogic from "./business logic/passesUseCases";

import nodeCleanup from "node-cleanup";

const PORT: number = parseInt(process.env.PORT  || '4000');
const APIManger: IAPIManagers = createAPIManger(PORT);

const {satDBManger, passDBManger, usersDBManger, testDBManger, errorsDBManger} = createDBManger();

const { satelliteValidetor, passValidetor, userValidetor, testValidetor, errorValidetor} = createValidetors();
 



satDBManger.connect(process.env.MONGO_URI);

const satelliteManger:CRUDLogic = new CRUDLogic(satDBManger, satelliteValidetor);
const passesManger:CRUDLogic = new CRUDLogic(passDBManger, passValidetor);
const testsManger:CRUDLogic = new CRUDLogic(testDBManger, testValidetor);
const usersManger:CRUDLogic = new CRUDLogic(usersDBManger, userValidetor);
const errorsManger:CRUDLogic = new CRUDLogic(errorsDBManger, errorValidetor);


const authManger:authLogic = new authLogic(usersDBManger);
const passesFinder:passLogic = new passLogic();

new ConcreteMediators(passesManger, satelliteManger, passesFinder);

initIOInputRoutes();

process.on("unhandledRejection", (err: any, promise) => {
    if(!err.message) err.message = "server error";
    console.log(`error: ${err}`);
})

process.on('exit', () => {
    console.log("exiting");
    
    APIManger.close();
})

let stopping = false;
nodeCleanup((exitCode, signal) => {
  if (!stopping) {
    stopping = true;
    process.exit();
  }
  return false;
});

process.on("SIGUSR2", () => process.kill(process.pid, "SIGHUP"));

function initIOInputRoutes()
{
    const satellitesRoutes = [
        {
            method: 'get',
            path: '/api/v1/satellite/',
            callback: satelliteManger.getAll
        },
        {
            method: 'get',
            path: '/api/v1/satellite/:id',
            callback: satelliteManger.getSingleById
        },
        {
            method: 'delete',
            path: '/api/v1/satellite/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.deleteSingle]
        },
        {
            method: 'put',
            path: '/api/v1/satellite/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.Update]
        },
        {
            method: 'post',
            path: '/api/v1/satellite/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), satelliteManger.create]
        },
        {
            method: 'get',
            path: '/api/v1/satellite/passes/:id',
            callback: passesFinder.getSatellitePasses
        },
        {
            method: 'get',
            path: '/api/v1/satellites/passes/',
            callback: passesFinder.getAllPasses
        }
    ];

    const passesRoutes = [
        {
            method: 'get',
            path: '/api/v1/pass/',
            callback: passesManger.getAll
        },
        {
            method: 'get',
            path: '/api/v1/pass/:id',
            callback: passesManger.getSingleById
        },
        {
            method: 'put',
            path: '/api/v1/pass/updatePlan/:id',
            callback: [authManger.protect, passesManger.Update]
        },
        {
            method: 'put',
            path: '/api/v1/pass/updateWhatWasExequte/:id',
            callback: [authManger.protect, passesManger.Update]
        }
        
    ];

    const userRoutes = [
        {
            method: 'get',
            path: '/api/v1/user/',
            callback: [authManger.protect, usersManger.getAll]
        },
        {
            method: 'get',
            path: '/api/v1/user/:id',
            callback: [authManger.protect, usersManger.getSingleById]
        },
        {
            method: 'post',
            path: '/api/v1/login/',
            callback: authManger.login
        },
        {
            method: 'post',
            path: '/api/v1/register/',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), usersManger.create]
        },
        {
            method: 'delete',
            path: '/api/v1/user/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), usersManger.deleteSingle]
        },
        {
            method: 'put',
            path: '/api/v1/user/:id',
            callback: [authManger.protect, authManger.authorize('admin', 'instructions'), usersManger.Update]
        }
    ];

    const testsRoutes = [
        {
            method: 'get',
            path: '/api/v1/test/',
            callback: testsManger.getAll
        },
        {
            method: 'get',
            path: '/api/v1/test/:id',
            callback: testsManger.getSingleById
        },
        {
            method: 'put',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.Update]
        },
        {
            method: 'post',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.create]
        },
        {
            method: 'delete',
            path: '/api/v1/test/:id',
            callback: [authManger.protect, testsManger.deleteSingle]
        }  
    ];

    const errorsRoutes = [
        {
            method: 'get',
            path: '/api/v1/error/',
            callback: errorsManger.getAll
        },
        {
            method: 'get',
            path: '/api/v1/error/:id',
            callback: errorsManger.getSingleById
        },
        {
            method: 'put',
            path: '/api/v1/error/:id',
            callback: [authManger.protect, errorsManger.Update]
        },
        {
            method: 'post',
            path: '/api/v1/error/',
            callback: [authManger.protect, errorsManger.create]
        },
        {
            method: 'delete',
            path: '/api/v1/error/:id',
            callback: [authManger.protect, errorsManger.deleteSingle]
        }  
    ];

    const routes = [
        ...satellitesRoutes,
        ...passesRoutes,
        ...userRoutes,
        ...testsRoutes,
        ...errorsRoutes
        ];

    routes.forEach(route => {
        APIManger.addRoute(route.method, route.path, route.callback);
    })

    APIManger.initMiddleware();
}