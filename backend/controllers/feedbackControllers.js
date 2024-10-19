const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // SMTP server from .env
    port: process.env.EMAIL_PORT||587,  // SMTP port from .env
    secure: process.env.EMAIL_PORT == 465,  // True for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,  // Your email address from .env
        pass: process.env.EMAIL_PASS,  // Your email password from .env
    },
});

// Verify the SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to SMTP1:', error);
    } else {
        console.log('SMTP1 connection successful:', success);
    }
});

exports.submitFeedback = async (req, res) => {
    const { name, email, phone, feedback } = req.body;

    try {
        const feedback1 = new Feedback({ name, email, phone, feedback });
        await feedback1.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender address from .env
            to: email,  // Email address where feedback notification should be sent
            subject: 'New Feedback Submitted',
            text: `Hello ${name},\n\nPhone: ${phone}\nThank you for your feedback! We appreciate your input and will get back to you if necessary.\n\nYour feedback: ${feedback}\n\nBest regards,\nThe Right Resource Fit Team`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);  // Log error
        return res.status(500).json({ message: 'Failed to submit feedback', error });
    }
};

// New method to handle GET request for all feedbacks
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        return res.status(200).json(feedbacks);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve feedback', error });
    }
};
