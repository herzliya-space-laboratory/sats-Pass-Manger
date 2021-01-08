import expressApi from "../IO_Mangers/ApiManger/expressApi";

import SatellitesDBManger from "../IO_Mangers/DBManger/mongoDB/SatellitesDBManger";
import PassesDBManger from "../IO_Mangers/DBManger/mongoDB/PassesDBManger";
import AuthDBManger from "../IO_Mangers/DBManger/mongoDB/AuthDBManger";
import TestsDBManger from "../IO_Mangers/DBManger/mongoDB/TestsDBManger";
import ErrorsDBManger from "../IO_Mangers/DBManger/mongoDB/ErrorsDBManger";

import errorValidetor from "../validetors/errorValidetor"
import passValidetor from "../validetors/passValidetor"
import satelliteValidetor from "../validetors/satelliteValidetor"
import testValidetor from "../validetors/testValidetor"
import userValidetor from "../validetors/userValidetor"


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
                testDBManger: new TestsDBManger(),
                errorsDBManger: new ErrorsDBManger()
            };
        default:
            throw new Error("no db manger specified");
    }
}

export function createValidetors(){
    return {
        satelliteValidetor: new satelliteValidetor(), 
        passValidetor: new passValidetor(), 
        userValidetor: new userValidetor(),
        testValidetor: new testValidetor(),
        errorValidetor: new errorValidetor()
    };
}