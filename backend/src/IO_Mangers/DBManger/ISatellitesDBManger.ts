import {ObjectId} from 'mongoose';

export default interface ISatellitesDBManger 
{
    getSatellitesAmount();
    getAllSatellites(query?, params?);
    getSingleSatellites(id:ObjectId);

    createSatellite(satelliteToCreate: { name: string; satId: number; });
}
