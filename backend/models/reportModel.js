const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  reportType: {
    type: String, // e.g., 'Applications', 'Job Postings'
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  period: {
    type: String, // e.g., 'Monthly', 'Yearly'
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // JSON or File URL for the report
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
