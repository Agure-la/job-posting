const express = require('express');
const { createJob, getJobById, updateJob, deleteJob, getJobsByEmployer } = require('../controllers/jobController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createJob);
router.get('/', getJobs);
router.get('/:id', getJobsByEmployer);
router.get('/:id', getJobById);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;