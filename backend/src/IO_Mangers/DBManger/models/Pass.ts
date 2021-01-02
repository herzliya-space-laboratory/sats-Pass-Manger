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
    systemsItRelateTo: [String],
    goal: String,
    description: String,
    PassPlanner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    PassExecuter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    PassPlaylestInHoopenest: String,
    stations: {
        type: [{
                    type: String,
                    enum: [ 'RX only', 'TX Only', 'RX & TX', 'Off line'],
                    default: "RX only" 
                }],
                default: ['RX only', 'RX only', 'RX only', 'RX only', 'RX only']
    },
    whatWasExecute: String,
    manualErrors: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Error'
    },
    systemErrors: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Error'
    },
    tlm: [Object],

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Pass", Pass);