const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware.js');
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackControllers');

const router = express.Router();

router.post('/submit', submitFeedback);
router.get('/feedbacks', isAdmin,getAllFeedback); // GET route to retrieve feedback

module.exports = router;
