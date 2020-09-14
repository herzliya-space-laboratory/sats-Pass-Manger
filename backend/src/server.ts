require("./utils/dotenvInit");

import IAPIManagers from "./IO_Mangers/ApiManger/IAPIManager";

import IDBManger from './IO_Mangers/DBManger/IDBManger';
import { createDBManger, createAPIManger } from "./utils/MangersInit";




const DBManger: IDBManger = createDBManger();

const APIManger: IAPIManagers = createAPIManger();


DBManger.connect(process.env.MONGO_URI);

initIOInputRoutes();

process.on("unhandledRejection", (err: any, promise) => {
    if(!err.message) err.message = "server error";
    console.log(`error: ${err.message}`);

    APIManger.close();
    process.exit(1);
})


function initIOInputRoutes()
{
    
}