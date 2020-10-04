import mongoose from 'mongoose';

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
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

Satellite.virtual('pass', {
    ref: "Pass",
    localField: '_id',
    foreignField: 'Satellite',
    justOne: false
})


export default mongoose.model("Satellite", Satellite);