const express = require("express");
const { createJob, updateJob, deleteJob, getJobs } = require("../controllers/jobController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Route to create a job (HR only)
router.post("/postings",isAdmin, createJob);

// Route to update a job (HR only)
router.put("/postings/:id",isAdmin, updateJob);

// Route to delete a job (HR only)
router.delete("/postings/:id",isAdmin, deleteJob);

// Route to get all jobs (open to applicants)
router.get("/postings", getJobs);

module.exports = router;
