const asyncHandler = require('express-async-handler');
const Interaction = require('../models/interactionModel');

// @desc    Track application by ID
// @route   GET /interaction/status/:applicationID
const trackApplication = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find({ applicationID: req.params.applicationID });
  res.json(interactions);
});

// @desc    Update application status by HR
// @route   PUT /interaction/status/:applicationID
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, message } = req.body;
  const interaction = await Interaction.create({
    applicationID: req.params.applicationID,
    status,
    message,
  });

  res.json(interaction);
});

// @desc    Send notification
// @route   POST /interaction/notify
const sendNotification = asyncHandler(async (req, res) => {
  const { applicationID, message } = req.body;

  const interaction = await Interaction.create({
    applicationID,
    status: 'Notified',
    message,
    notifiedAt: Date.now(),
  });

  res.status(200).json({ message: 'Notification sent', interaction });
});

module.exports = {
  trackApplication,
  updateApplicationStatus,
  sendNotification,
};
