const asyncHandler = require('express-async-handler');
const Report = require('../models/reportModel');

// @desc    Generate report
// @route   POST /reports
const generateReport = asyncHandler(async (req, res) => {
  const { reportType, period, data } = req.body;

  if (!reportType || !period) {
    return res.status(400).json({ message: 'Report type and period are required' });
  }

  const report = await Report.create({
    reportType,
    userID: req.user._id, // Assuming the logged-in user's ID is being tracked
    period,
    data,
  });

  res.status(201).json(report);
});

// @desc    Get dashboard data for user
// @route   GET /dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const { userID } = req.query;

  // Fetch dashboard data related to job postings and application statuses for the user
  const dashboardData = await Report.find({ userID }); // Example logic, adjust based on your schema

  if (!dashboardData || dashboardData.length === 0) {
    return res.status(404).json({ message: 'Dashboard data not found' });
  }

  res.status(200).json(dashboardData);
});

// @desc    Get all reports for a specific user
// @route   GET /reports
const getReports = asyncHandler(async (req, res) => {
  const { userID } = req.query;

  // Fetch reports based on the user ID
  const reports = await Report.find({ userID });

  if (!reports || reports.length === 0) {
    return res.status(404).json({ message: 'Reports not found' });
  }

  res.status(200).json(reports);
});

module.exports = {
  generateReport,
  getDashboard,
  getReports,
};
