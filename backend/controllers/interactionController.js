const asyncHandler = require('express-async-handler');
const Interaction = require('../models/interactionModel');
const Application = require('../models/applicationModel');

// @desc    Track application by ID
// @route   GET /interaction/status/:applicantID
const trackApplication = asyncHandler(async (req, res) => {
  // Step 1: Find all applications by applicantID
  const applications = await Application.find({ applicantID: req.params.applicantID });

  if (!applications || applications.length === 0) {
    res.status(404);
    throw new Error('No applications found for this applicant');
  }

  // Step 2: Extract application IDs from the applications
  const applicationIDs = applications.map(app => app._id);

  // Step 3: Find all interactions (notifications) for these application IDs
  const notifications = await Interaction.find({ applicationID: { $in: applicationIDs } });

  // Send the notifications in response
  res.json(notifications);
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
  // Step 1: Find the applications to get the associated user
  const applications = await Application.find({ applicantID: req.params.applicantID });

  if (!applications || applications.length === 0) {
    res.status(404);
    throw new Error('No applications found for this applicant');
  }

  // Step 2: Extract application IDs from the applications
  const applicationIDs = applications.map(app => app._id);

  // Step 3: Find and delete all interactions (notifications) for these application IDs
  const deletedNotifications = await Interaction.deleteMany({ applicationID: { $in: applicationIDs } });

  if (deletedNotifications.deletedCount === 0) {
    res.status(404);
    throw new Error('No notifications found to delete for this applicant');
  }

  // Step 4: Respond with success message
  res.json({ message: `All notifications for applicant with ID ${req.params.applicantID} deleted across all applications` });
});


// @desc    Delete a specific notification by ID
// @route   DELETE /interaction/notification/:interactionID
const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.params.id);

    if (!interaction) {
      res.status(404);
      throw new Error('Notification not found');
    }

    await interaction.deleteOne();
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
});



module.exports = {
  trackApplication,
  updateApplicationStatus,
  sendNotification,
  deleteAllNotifications,
  deleteNotification,
};
