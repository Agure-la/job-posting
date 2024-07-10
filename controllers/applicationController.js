const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyJob = async (req, res) => {
    const { jobId, resume, coverLetter } = req.body;
    try {
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(404).json({ message: 'job not found'});
        }

        const applicant = new Application({
            user: req.user.id,
            job: jobId,
            resume,
            coverLetter
        });
        await applicant.save();
        res.json(applicant);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server erro' });
    }
};

exports.getApplicationsByUser = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id }).populate('job');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getApplicationsByJob = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId }).populate('user');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};