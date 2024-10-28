import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/AdminCreateJob.css";

const AdminCreateJob = () => {
  const navigate = useNavigate();

  // Initial form state
  const initialFormState = {
    title: "",
    description: "",
    location: "",
    skills: [],
    employmentType: [],
    workingSchedule: [],
    salaryAmount: 0,
    salaryType: "",
    salaryFrequency: "",
    isHiringMultiple: false,
  };

  const [jobDetails, setJobDetails] = useState(initialFormState);

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
  
    setJobDetails({
      ...jobDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to handle multiple selection checkboxes
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: checked
        ? [...(prevDetails as any)[name], value]
        : (prevDetails as any)[name].filter((item: string) => item !== value),
    }));
  };

  // Submit form function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      title,
      description,
      location,
      skills,
      employmentType,
      workingSchedule,
      salaryAmount,
      salaryType,
      salaryFrequency,
      isHiringMultiple,
    } = jobDetails;

    const salary = {
      amount: salaryAmount,
      type: salaryType,
      frequency: salaryFrequency,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/jobs/postings",
        {
          title,
          description,
          location,
          skills,
          employmentType,
          workingSchedule,
          salary,
          isHiringMultiple,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Job created successfully!");
      navigate("/admin/manageJob");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job. Please try again.");
    }
  };

  // Clear form function
  const clearForm = () => {
    setJobDetails(initialFormState);
  };

  return (
    <div>
      <div className="job-posting-container">
        <AdminSidebar />
        <div className="content">
          <h1>Create New Job Posting</h1>
          <form className="job-posting-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                value={jobDetails.description}
                onChange={handleChange}
                placeholder="Job description"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={jobDetails.location}
                onChange={handleChange}
                placeholder="Job location"
                required
              />
            </div>

            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={jobDetails.skills}
                onChange={handleChange}
                placeholder="e.g. JavaScript, React"
                required
              />
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <div className="checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="employmentType"
                    value="Full-time"
                    onChange={handleMultiSelectChange}
                  />
                  Full-time
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="employmentType"
                    value="Part-time"
                    onChange={handleMultiSelectChange}
                  />
                  Part-time
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="employmentType"
                    value="On demand"
                    onChange={handleMultiSelectChange}
                  />
                  On demand
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="employmentType"
                    value="Negotiable"
                    onChange={handleMultiSelectChange}
                  />
                  Negotiable
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Working Schedule</label>
              <select
                name="workingSchedule"
                value={jobDetails.workingSchedule}
                onChange={handleChange}
                required
              >
                <option value="">Choose Work Shift</option>
                <option value="Day shift">Day shift</option>
                <option value="Night shift">Night shift</option>
                <option value="Weekend availability">
                  Weekend availability
                </option>
              </select>
            </div>

            <div className="form-group salary-group">
              <label>Salary</label>
              <div className="salary-options">
                <label className="radio-container">
                  <input
                    type="radio"
                    name="salaryType"
                    value="Hourly"
                    checked={jobDetails.salaryType === "Hourly"}
                    onChange={handleChange}
                  />
                  <span className="icon">⏰</span> Hourly
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="salaryType"
                    value="Custom"
                    checked={jobDetails.salaryType === "Custom"}
                    onChange={handleChange}
                  />
                  <span className="icon">💵</span> Custom
                </label>
              </div>

              <div className="salary-inputs">
                <div className="form-group">
                  <label>Amount you want to pay</label>
                  <input
                    type="number"
                    name="salaryAmount"
                    value={jobDetails.salaryAmount}
                    onChange={handleChange}
                    placeholder="Enter salary amount"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>How you want to pay</label>
                  <select
                    name="salaryFrequency"
                    value={jobDetails.salaryFrequency}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose Salary Frequency</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <label className="negotiable-checkbox">
                <input
                  type="checkbox"
                  name="isSalaryNegotiable"
                  onChange={handleChange}
                />
                Salary is negotiable
              </label>
            </div>

            <div className="HiringMultiple">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="isHiringMultiple"
                  checked={jobDetails.isHiringMultiple}
                  onChange={handleChange}
                />{" "}
                Yes, I am hiring multiple candidates
              </label>
            </div>
            <button type="button" onClick={clearForm} className="clear-btn">
              Clear
            </button>
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateJob;
