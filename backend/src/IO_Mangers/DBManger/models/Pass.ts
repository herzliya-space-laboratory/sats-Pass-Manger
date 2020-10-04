import mongoose from 'mongoose';

const Pass = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    maxElevation: Number,
    duration: Number,
    Satellite: {
        type: mongoose.Schema.ObjectId,
        ref: 'Satellite'
    },
    
    goal: String,
    Plan: Array,
    PassPlanner: String,
    PassExecuter: String,

    whatWasExecute: String,
    Telemetry: Object,
    Errors: String,
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Pass", Pass);