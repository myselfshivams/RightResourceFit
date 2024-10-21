const express = require('express');
const { trackApplication, updateApplicationStatus, sendNotification } = require('../controllers/interactionController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/status/:applicationID', protect, trackApplication);
router.put('/status/:applicationID', isAdmin, updateApplicationStatus);
router.post('/notify',isAdmin, sendNotification);

module.exports = router;
