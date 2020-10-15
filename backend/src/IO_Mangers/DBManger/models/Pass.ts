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
    
    status: {
        type: String,
        default: 'not ready'
    },
    goal: String,
    PassPlanner: String,
    PassExecuter: String,

    whatWasExecute: String,
    manualErrors: String,
    systemErrors: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Pass", Pass);