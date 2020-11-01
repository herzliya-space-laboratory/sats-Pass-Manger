import mongoose from 'mongoose';
import getSatelliteTle from '../../../utils/getSatelliteTle';

const Satellite = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add the satellite name']
    },
    satId:{
        type: Number,
        required: [true, 'please add the satellite id']
    },
    passes: Object,
    tle: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

Satellite.pre('save', async function(next){
    this.tle = await getSatelliteTle(this.satId);
    next();
})

Satellite.virtual('pass', {
    ref: "Pass",
    localField: '_id',
    foreignField: 'Satellite',
    justOne: false
})


export default mongoose.model("Satellite", Satellite);