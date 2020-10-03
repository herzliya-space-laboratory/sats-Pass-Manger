import {ObjectId} from 'mongoose';
import IDBManager from './IDBManger';

export default interface ISatellitesDBManger extends IDBManager
{
    getSatellitesAmount();
    getAllSatellites(query?, params?);
    getSingleSatellites(id:ObjectId);

    createSatellite(satelliteToCreate: { name: string; satId: number; });
}
