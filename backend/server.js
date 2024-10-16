// FRAMEWORK CONFIGURATION
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uploadRoutes = require('./routes/uploadRoutes');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ROUTES BELOW
app.get('/', (req,res)=>{
  res.send("Express App Is Working Cool");
});

app.use('/api', uploadRoutes);

// Route for User Registration and Authentication
app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/jobs", require("./routes/jobRoutes")); // Use job routes for /api/jobs




// Error handling middleware
app.use(errorHandler);

// APP CONFIG START
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
