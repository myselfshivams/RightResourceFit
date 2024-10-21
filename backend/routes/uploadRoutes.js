const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/uploadController'); // Adjust the path as needed

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Route for uploading files (images and PDFs)
router.post('/upload', upload.single('image'), uploadFile); // 'file' is the field name

module.exports = router;
