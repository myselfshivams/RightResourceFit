const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    employmentType: {
      type: [String], // Full-time, Part-time, etc.
      required: true,
      enum: ["Full-time", "Part-time", "On demand", "Negotiable"],
    },
    workingSchedule: {
      type: [String], // Day shift, Night shift, Weekend availability, etc.
      required: true,
      enum: ["Day shift", "Night shift", "Weekend availability"],
    },
    salary: {
      amount: { type: Number, required: true },
      type: {
        type: String, // Hourly, Custom
        required: true,
        enum: ["Hourly", "Custom"],
      },
      frequency: {
        type: String, // Yearly, Monthly, etc.
        required: true,
        enum: ["Yearly", "Monthly", "Weekly"],
      },
      isNegotiable: {
        type: Boolean,
        default: false,
      },
    },
    isHiringMultiple: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Refers to the HR user who posted the job
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
