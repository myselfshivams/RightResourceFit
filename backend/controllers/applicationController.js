const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');

// @desc    Apply for a job
// @route   POST /applications
const applyJob = asyncHandler(async (req, res) => {
  const { jobID, resume, coverLetter } = req.body;

  const application = await Application.create({
    jobID,
    applicantID: req.user._id,
    resume,
    coverLetter,
  });

  res.status(201).json(application);
});

// @desc    Get application by ID
// @route   GET /applications/:id
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate('jobID').populate('applicantID');

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  res.json(application);
});

// @desc    Get all applications for an applicant or job
// @route   GET /applications
const getApplications = asyncHandler(async (req, res) => {
  const { applicantID, jobID } = req.query;
  let filter = {};

  if (applicantID) filter.applicantID = applicantID;
  if (jobID) filter.jobID = jobID;

  const applications = await Application.find(filter);
  res.json(applications);
});

// @desc    Update application status
// @route   PUT /applications/:id
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  application.status = status;
  await application.save();

  res.json(application);
});

module.exports = {
  applyJob,
  getApplicationById,
  getApplications,
  updateApplicationStatus,
};
