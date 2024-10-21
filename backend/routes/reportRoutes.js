const express = require('express');
const { getDashboard, getReports, generateReport } = require('../controllers/reportController');
const {isAdmin } = require('../middleware/authMiddleware'); // Assuming these reports are admin/HR only

const router = express.Router();

// GET /dashboard - Get reporting dashboard for a specific user (probably admin or HR)
router.get('/dashboard', isAdmin, getDashboard);

// GET /reports - Fetch reports for a specific user (admin or HR)
router.get('/', isAdmin, getReports);

// POST /reports - Generate a new report based on reportType and period
router.post('/', isAdmin, generateReport);

module.exports = router;
