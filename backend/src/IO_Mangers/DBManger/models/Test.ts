import mongoose from 'mongoose';

const Test = new mongoose.Schema({
    goal: String,
    systemsItRelateTo: [String],
    plan: [String],
    Planner: String,
    executor: String,
    whenWillItBe: Date,
    Length: Number,
    hypothesis: String,
    result: String,
    conclusions: String
})

export default mongoose.model("Test", Test);