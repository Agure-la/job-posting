const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    const {title, description, company, location, salary } = req.body;
    try{
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary, 
            employer: req.user._id
        });
        res.status(201).json(job);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
};

exports.getJobById = async (req, res) => {
    try{ 
        const job = await Job.findById(req.params.id).populate('employer', 'name', 'email');
        if(!job) {
            return res.status(404).json({ message: 'Job not found'});
        }
        res.json(job);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateJob = async (req, res) => {
    const { title, company, description, location, salary } = req.body;
    try {
        let job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }

        job.title = title || job.title;
        job.company = company || job.company;
        job.description = description || job.description;
        job.location = location || job.location;
        job.salary = salary || job.salary;

        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await job.remove();
        res.json({ message: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//get job listing by employer
exports.getJobsByEmployer = async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user._id });
        res.json(jobs);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};