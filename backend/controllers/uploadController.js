const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;

// Function to upload files to Cloudinary
const uploadToCloudinary = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });

        // Convert buffer to readable stream and pipe it to Cloudinary
        const stream = Readable.from(fileBuffer);
        stream.pipe(uploadStream);
    });
};

// Function to handle image and PDF uploads
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const options = {
            folder: 'uploads',
            public_id: req.body.public_id || 'default_file',
        };

        // Determine file type and set appropriate resource type and transformations if needed
        const mimeType = req.file.mimetype;

        if (mimeType.startsWith('image/')) {
            options.resource_type = 'image'; // Set resource type for images
            options.transformation = [{ width: 500, height: 500, crop: 'limit' }];
        } else if (mimeType === 'application/pdf') {
            options.resource_type = 'raw'; // Set resource type for PDFs
          
        } else {
            return res.status(400).json({ message: 'Unsupported file type' });
        }

        // Upload the file to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, options);
        

        // Return the URL of the uploaded file
        res.status(200).json({ fileUrl: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

module.exports = { uploadFile };
