import expressApi from "../IO_Mangers/ApiManger/expressApi";
import mangoDBManger from '../IO_Mangers/DBManger/mongoDB/mangoDBManger'


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
            return new mangoDBManger();
        default:
            throw new Error("no db manger specified");
    }
}
