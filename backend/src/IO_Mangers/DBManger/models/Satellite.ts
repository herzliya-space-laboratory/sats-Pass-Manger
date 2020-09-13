import mongoose from 'mongoose';

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

export default mongoose.model("Satellite", Satellite);