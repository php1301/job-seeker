const express = require('express')
const { Job } = require("../../../models/Job")
const { User } = require("../../../models/User");
const { CV } = require("../../../models/Cv");
module.exports.getJob = (req, res, next) => {
    Job.find()
        .populate("author")
        .then((jobs) => res.status(200).json(jobs))
        .catch((err) => res.status(400).json(err))
}
module.exports.createJob = (req, res, next) => {
    const { name, author, company, salary, createdDate, jobDescription, jobLocation, isActive, userCV } = req.body
    const newJob = new Job({
        name, author, company, salary, createdDate, jobDescription, jobLocation, isActive, userCV
    })
    newJob.save()
        .then((job) => res.status(200).json(job))
        .catch((err) => res.status(400).json(err))
}
//gui cv
module.exports.sendCV = (req, res, next) => {
    //ref
    const { id } = req.user
    const { jobId } = req.params
    User.findById(id)
        .then(user => {
            if (!user) return Promise.reject({ message: "User not found" })

        })
    Job.findById(jobId)
        .then(job => {
            if (!job) return Promise.reject({ message: "Job not found" })
            return newCV = new CV({
                jobId,
                userId: id,
                cvUrl: req.file.path,
            })
        })
        .then(cv => {
            cv.save()
            return cv
        })
        .then(cv => {

            const jobUpdate = Job.update(
                { _id: jobId },
                { $push: { jobCV: cv } }
            )
            const userUpdate = User.update(
                { _id: id },
                { $push: { userCV: cv } }
            )
            Promise.all([jobUpdate, userUpdate])
                .then(res.status(200).json(cv))
                .catch(err => res.status(400).json(err))
        })
        //push
        // const { id } = req.user
        // const { jobId } = req.params
        // User.findById(id)
        //     .then(user => {
        //         if (!user) return Promise.reject({ message: "User not found" })

        //     })
        // Job.findById(jobId)
        //     .then(job => {
        //         if (!job) return Promise.reject({ message: "Job not found" })
        //         newCV = new CV({
        //            
        //             cvUrl: req.file.path,
        //         })
        //         return newCV
        //     })
        //     .then(cv => {
        //         Job.update(
        //             { _id: jobId },
        //             { $push: { jobCV: cv } }
        //         )
        //             .then(res.status(200).json(cv))
        //             .catch(err => res.status(400).json(err))
        //     })

        .catch(err => res.status(400).json(err))
}