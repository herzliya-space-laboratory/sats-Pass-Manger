import {ObjectId} from 'mongoose';

export default interface ISatellitesDBManger 
{
    getAllSatellites(query?, params?);
    getSingleSatellites(id:ObjectId);

    createSatellites(satelliteToCreate: { name: string; satId: number; });
}
