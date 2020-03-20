const bcrypt = require('bcryptjs');
const _ = require("lodash");
const { User } = require("../../../models/User");
const { Job } = require("../../../models/Job");
const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const config = require("../../../config");

const jwtSign = promisify(jwt.sign);
module.exports.register = (req, res, next) => {
    const { email, password, fullname, userType } = req.body
    const newUser = new User({
        email, password, fullname, userType
    })
    newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
}
module.exports.login = (req, res, next) => {
    const { email, password } = req.body
    let user
    User.findOne({ email })
        .then(_user => {
            user = _user
            if (!user) return Promise.reject({ message: "Email not found" })
            return bcrypt.compare(password, user.password)
        })
        .then((isMatched) => {
            if (!isMatched)
                return Promise.reject({ message: "Wrong password" })
            const payload = _.pick(user, ["_id", "email", "fullname", "userType"])
            return jwtSign(payload, config.secretKey, { expiresIn: '1h' })
        })
        .then((token) => {
            res.status(200).json({
                token, message: "login success"
            })
        })
        .catch(err => res.status(500).json(err))
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
module.exports.recruiterCheck = (req, res, next) => {
    const { id } = req.user
    const { jobId } = req.params
    let author
    Job.findById(jobId)
        .populate('author')
        .then(job => {
            if (!job) return Promise.reject({ message: "Job not exist" })
            return author = job.author.id
        })
        .then(idAuthor =>
            User.findById(idAuthor)
                .then(user => {
                    if (user.id !== id || !id || !user.id) return Promise.reject({ message: "You are not allow to view this" })
                    return jobId
                }))
        .then(jobId => {
            Job.findById(jobId)
                .populate("jobCV")
                .then((jobs) => res.status(200).json(jobs))
                .catch((err) => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}
module.exports.seekerCheck = (req, res, next) => {
    const { id } = req.user
    User.findById(id)
        .populate('userCV')
        .then(user => { res.status(200).json(user) })
        .catch(err => { res.status(400).json(err) })
}
module.exports.deleteJob = (req, res, next) => {
    const { id } = req.user
    const { jobId } = req.params
    let author
    User.findById(id)
        .then(user => {
            return author = user.id
        })
        .then(author =>
            Job.findById(jobId)
                .populate('author')
                .then(job => {
                    if (job.author.id !== author || !author || !job.author.id)
                        return Promise.reject({ message: "Wrong permission" })
                    return jobId
                }))
        .then(_jobId => {
            Job.deleteOne({ _id: _jobId })
                .then(() => res.status(200).json({ message: "deleted succesfully" }))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}
module.exports.replaceJob = (req, res, next) => {
    const { name, company, salary, jobDescription, jobLocation, isActive } = req.body
    const { id } = req.user
    const { jobId } = req.params
    let _author
    User.findById(id)
        .then(user => {
            return _author = user.id
        })
        .then(_author =>
            Job.findById(jobId)
                .populate('author')
                .then(job => {
                    if (job.author.id !== _author || !_author || !job.author.id)
                        return Promise.reject({ message: "Wrong permission" })
                    return jobId
                }))
        .then(_jobId => {
            Job.findById(_jobId)
                .then(job => {
                    job.name = name
                    job.company = company
                    job.salary = salary
                    job.jobDescription = jobDescription
                    job.jobLocation = jobLocation
                    job.isActive = isActive
                    return job.save()
                })
                .then(job => res.status(200).json(job))
        })
        .catch(err => res.status(400).json(err))
}
module.exports.updateJob = (req, res, next) => {
    const { id } = req.user
    const { jobId } = req.params
    const restrict = ["salary", "createdDate", "jobCV", "author"]
    let flag = 1
    let _author
    User.findById(id)
        .then(user => {
            return _author = user.id
        })
        .then(_author =>
            Job.findById(jobId)
                .populate('author')
                .then(job => {
                    if (job.author.id !== _author || !_author || !job.author.id)
                        return Promise.reject({ message: "Wrong permission" })
                    return jobId
                }))
        .then(_jobId => {
            Job.findById(_jobId)
                .then(job => {
                    Object.keys(req.body).forEach(key => {
                        if (restrict.findIndex(e => e === key) !== -1)
                            return flag = 0
                        job[key] = req.body[key]
                    })
                    if (flag === 0)
                        return Promise.reject({ message: "You can't edit this field" })
                    return job.save()
                })
                .then(job => res.status(200).json(job))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}
module.exports.updateProfile = (req, res, next) => {
    const { id } = req.user
    const restrict = ["userCV", "_id", "password", "avatar", "email"]
    let flag = 1
    User.findById(id)
        .then(user => {
            Object.keys(req.body).forEach(key => {
                if (restrict.findIndex(e => e === key) !== -1)
                    return flag = 0
                user[key] = req.body[key]
            })
            if (flag === 0)
                return Promise.reject({ message: "You can't edit this field" })
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
}
module.exports.uploadAvatar = (req, res, next) => {
    const { id } = req.user
    User.findById(id)
        .then(user => {
            if (!user) Promise.reject({ message: "User not found" })
            user.avatar = req.file.path
            return user.save()
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(400).json(err))
}