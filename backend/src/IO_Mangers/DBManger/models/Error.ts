import mongoose from 'mongoose';

const Error = new mongoose.Schema({
    whenTheErrorSpoted: Date,
    whatTheSimptoms: String,
    isTheSimptomRepeat: Boolean,
    whoSpotedTheSymptom: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    hypothesis: String,
    solveProcess: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Test'
    }],
    howLongWillItTakeToSolve: Number,

    WasSolved: Boolean,
    howWasItSolved: String,

    systemsItRelateTo: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Error", Error);