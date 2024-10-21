const mongoose = require('mongoose');

const interactionSchema = mongoose.Schema({
  applicationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  message: {
    type: String,
  },
  notifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;
