import {ObjectId} from 'mongoose';
import IDBManager from './IDBManger';

export default interface ISatellitesDBManger extends IDBManager
{
    getSatellitesAmount();
    getAllSatellites(query?, params?);
    getSingleSatellite(id:ObjectId);
    changeSatelliteData(id:ObjectId, dataToChange:Object);
    deleteSingleSatellite(id:ObjectId);
    createSatellite(satelliteToCreate: { name: string; satId: number; });
}
