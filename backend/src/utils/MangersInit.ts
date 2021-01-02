import expressApi from "../IO_Mangers/ApiManger/expressApi";

import SatellitesDBManger from "../IO_Mangers/DBManger/mongoDB/SatellitesDBManger";
import PassesDBManger from "../IO_Mangers/DBManger/mongoDB/PassesDBManger";
import AuthDBManger from "../IO_Mangers/DBManger/mongoDB/AuthDBManger";
import TestsDBManger from "../IO_Mangers/DBManger/mongoDB/TestsDBManger";



export function createAPIManger(PORT) {
    switch (process.env.SERVER_MANGER_TYPE) {
        case ("express"):
            return new expressApi(PORT);
        default:
            throw new Error("no server manger specified");
    }
}

export function createDBManger() {
    switch (process.env.DB_MANGER_TYPE) {
        case ("mongodb"):
            return {
                satDBManger: new SatellitesDBManger(),
                passDBManger: new PassesDBManger(), 
                usersDBManger: new AuthDBManger(), 
                testDBManger: new TestsDBManger()};
        default:
            throw new Error("no db manger specified");
    }
}
