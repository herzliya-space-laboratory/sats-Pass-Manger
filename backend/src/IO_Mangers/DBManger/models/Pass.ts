import mongoose from 'mongoose';

const Pass = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    maxElevation: Number,
    goal: String,
    Plan: Array,
    PassPlanner: String,
    PassExecuter: String,
    wasExecute: String,
    Telemetry: Object,
    Errors: String,
    Satellite: Object,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Pass", Pass);