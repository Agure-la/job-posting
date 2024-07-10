const express = require('express');
const { applyJob, getApplicationsByUser, getApplicationsByJob } = require('../controllers/applicationController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, applyJob);
router.get('/', auth, getApplicationsByUser);
router.get('/job/:jobId', auth, getApplicationsByJob);

module.exports = router;