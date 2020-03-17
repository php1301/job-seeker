const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    company: { type: String, required: true, default: "Self-employed" },
    salary: { type: Number, required: true, default:0 },
    createdDate: { type: Date, required: false, default: new Date() },
    jobDescription: { type: String, required: true },
    jobLocation: { type: String, required: true },
    isActive: { type: Boolean }
})
const Job = mongoose.model("Job", JobSchema, "Job")
module.exports = {
    JobSchema, Job
}