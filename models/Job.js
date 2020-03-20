const mongoose = require('mongoose')
const { CVSchema } = require('./Cv')
const JobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: false, default: "Self-employed" },
    salary: { type: Number, required: true, default: 0 },
    createdDate: { type: Date, required: false, default: new Date() },
    jobDescription: { type: String, required: true },
    jobLocation: { type: String, required: true },
    isActive: { type: Boolean },
    // jobCV: [CVSchema],
    jobCV: [{ type: mongoose.Schema.Types.ObjectId, ref: "CV" }], //ref
})
const Job = mongoose.model("Job", JobSchema, "Job")
module.exports = {
    JobSchema, Job
}