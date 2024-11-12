const express = require('express');
const { trackApplication, updateApplicationStatus, sendNotification ,deleteAllNotifications,deleteNotification} = require('../controllers/interactionController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/status/:applicantID', protect, trackApplication);
router.put('/status/:applicationID', isAdmin, updateApplicationStatus);
router.post('/notify',isAdmin, sendNotification);

// Add the routes for deleting notifications
router.delete('/notifications/user/:applicantID', protect, deleteAllNotifications);
router.delete('/notification/:id', protect, deleteNotification);


module.exports = router;
