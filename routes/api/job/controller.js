const express = require('express')
const { Job } = require("../../../models/Job")
module.exports.getJob = (req, res, next) => {
    Job.find()
        .then((jobs) => res.status(200).json(jobs))
        .catch((err) => res.status(400).json(err))
}
module.exports.createJob = (req, res, next) => {
    const { name, author, company, salary, createdDate, jobDescription, jobLocation, isActive } = req.body
    const newJob = new Job({
        name, author, company, salary, createdDate, jobDescription, jobLocation, isActive
    })
    newJob.save()
        .then((job) => res.status(200).json(job))
        .catch((err) => res.status(400).json(err))
}