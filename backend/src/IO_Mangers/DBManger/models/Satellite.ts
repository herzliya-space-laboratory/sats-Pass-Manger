import mongoose from 'mongoose';
import { getSatelliteTle } from 'utils/getSatelliteTle';

const Satellite = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add the satellite name']
    },
    satId:{
        type: Number,
        required: [true, 'please add the satellite id']
    },
    TLE:{
        type: String,
        select: false
    },
    passes: Object
})

Satellite.pre('save', async function(next) {
    this.TLE = getSatelliteTle(this.satID);
    next();
})

export default mongoose.model("Satellite", Satellite);