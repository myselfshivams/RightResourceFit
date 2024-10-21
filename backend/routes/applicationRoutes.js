const express = require('express');
const { applyJob, getApplicationById, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect,isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, applyJob);
router.get('/:id', protect, getApplicationById);
router.get('/', protect, getApplications);
router.put('/:id', isAdmin, updateApplicationStatus);

module.exports = router;
