const asyncHandler = require('express-async-handler');
const Interaction = require('../models/interactionModel');
const Application = require('../models/applicationModel');

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
  
    // Check if application exists
    const applicationExists = await Application.findById(applicationID);
    if (!applicationExists) {
      res.status(404);
      throw new Error('Application not found');
    }
  
    const interaction = await Interaction.create({
      applicationID,
      status: 'Notified',
      message,
      notifiedAt: Date.now(),
    });
  
    res.status(200).json({ message: 'Notification sent', interaction });
  });
  

// @desc    Delete all interactions for a specific user based on the applicationID
// @route   DELETE /interaction/notifications/user/:applicationID
const deleteAllNotifications = asyncHandler(async (req, res) => {
  // Step 1: Find the application to get the associated user
  const application = await Application.findById(req.params.applicationID);
  
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  // Step 2: Use the applicantID (userID) from the application to find all applications for that user
  const userID = application.applicantID;
  
  // Find all applications associated with this user (applicantID)
  const userApplications = await Application.find({ applicantID: userID });
  
  // Step 3: Extract all applicationIDs from the user's applications
  const applicationIDs = userApplications.map(app => app._id);

  // Step 4: Delete all interactions associated with any of these applicationIDs
  await Interaction.deleteMany({ applicationID: { $in: applicationIDs } });

  res.json({ message: `All notifications for user ${userID} deleted across all applications` });
});

// @desc    Delete a specific notification by ID
// @route   DELETE /interaction/notification/:interactionID
const deleteNotification = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.interactionID);

  if (!interaction) {
    res.status(404);
    throw new Error('Notification not found');
  }

  await interaction.remove();
  res.json({ message: 'Notification deleted' });
});

module.exports = {
  trackApplication,
  updateApplicationStatus,
  sendNotification,
  deleteAllNotifications,
  deleteNotification,
};
