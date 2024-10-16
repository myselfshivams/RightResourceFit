const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

// @desc    HR creates a new job
// @route   POST /jobs/postings
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    skills,
    employmentType,
    workingSchedule,
    salary,
    isHiringMultiple,
  } = req.body;

  // Check if all job details are provided
  if (
    !title ||
    !description ||
    !location ||
    !skills ||
    !employmentType ||
    !workingSchedule ||
    !salary
  ) {
    res.status(400);
    throw new Error("Please provide all job details");
  }

  // Check if the user is an admin (HR)
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const job = await Job.create({
    title,
    description,
    location,
    skills,
    employmentType,
    workingSchedule,
    salary,
    isHiringMultiple,
    postedBy: req.user._id, // The HR (admin) posting the job
  });

  res.status(201).json(job);
});

// @desc    HR updates a job
// @route   PUT /jobs/postings/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Check if the user is the one who posted the job or is an admin
  if (
    !req.user.isAdmin
  ) {
    res.status(401);
    throw new Error("Not authorized to update this job");
  }

  const {
    title,
    description,
    location,
    skills,
    employmentType,
    workingSchedule,
    salary,
    isHiringMultiple,
  } = req.body;

  // Update job fields
  job.title = title || job.title;
  job.description = description || job.description;
  job.location = location || job.location;
  job.skills = skills || job.skills;
  job.employmentType = employmentType || job.employmentType;
  job.workingSchedule = workingSchedule || job.workingSchedule;
  job.salary = salary || job.salary;
  job.isHiringMultiple = isHiringMultiple || job.isHiringMultiple;

  const updatedJob = await job.save();

  res.json(updatedJob);
});

// @desc    HR deletes a job
// @route   DELETE /jobs/postings/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// @desc    Get all jobs (Applicants can search by location, skills, employmentType, workingSchedule)
// @route   GET /jobs/postings
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const { location, skills, employmentType, workingSchedule, salary } = req.query;

  let query = {};

  // Filter by location if provided
  if (location) {
    query.location = location;
  }

  // Filter by skills if provided
  if (skills) {
    query.skills = { $in: skills.split(",") };
  }

  // Filter by employment type if provided
  if (employmentType) {
    query.employmentType = employmentType;
  }

  // Filter by working schedule if provided
  if (workingSchedule) {
    query.workingSchedule = workingSchedule;
  }

  // Filter by salary (e.g., minimum salary) if provided
  if (salary) {
    query["salary.amount"] = { $gte: Number(salary) };
  }

  const jobs = await Job.find(query);

  res.json(jobs);
});

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
};
