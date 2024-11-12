const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  jobID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: String, // File URL
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied','Interview','Hired', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Applied',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
