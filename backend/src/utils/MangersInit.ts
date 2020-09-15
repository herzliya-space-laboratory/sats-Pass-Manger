import expressApi from "../IO_Mangers/ApiManger/expressApi";
import mangoDBManger from '../IO_Mangers/DBManger/mangoDBManger'

const PORT: number = parseInt(process.env.PORT  || '5000');

export function createAPIManger() {
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
