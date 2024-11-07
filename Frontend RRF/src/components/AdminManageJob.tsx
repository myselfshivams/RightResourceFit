import AdminSidebar from "./AdminSidebar";
import { Link} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/AdminManageJob.css";
import DeleteUpdateModal from "../pages/DeleteUpdateModel";

interface Salary {
  amount: number;
  type: string;
  frequency: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  skills: string[];
  employmentType: string[];
  workingSchedule: string[];
  salary: Salary;
  isHiringMultiple: boolean;
}

const AdminManageJob = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "update" | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  // const navigate = useNavigate();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data); // Set filteredJobs initially to all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter jobs based on title, description, or skills
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchValue) ||
      job.description.toLowerCase().includes(searchValue) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchValue))||
      job.location.toLowerCase().includes(searchValue)
    );

    setFilteredJobs(filtered); // Update filtered jobs based on search term
  };


  const editProduct = (job: Job) => {
    setIsEditing(true);
    setCurrentProduct(job); // Set the selected job for editing
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

  setCurrentProduct((prev) => {
    if (!prev) return prev;

    // Handle nested salary fields
    if (name === "salaryAmount") {
      return { ...prev, salary: { ...prev.salary, amount: Number(value) } };
    } else if (name === "salaryType") {
      return { ...prev, salary: { ...prev.salary, type: value } };
    } else if (name === "salaryFrequency") {
      return { ...prev, salary: { ...prev.salary, frequency: value } };
    } else if (type === "checkbox") {
      return { ...prev, [name]: checked };
    } else if (name === "skills") {
      return { ...prev, skills: value.split(",").map((s) => s.trim()) };
    }

    return { ...prev, [name]: value };
  });
};


  const handleEmploymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setCurrentProduct((prev) => {
      if (prev) {
        const isChecked = e.target.checked;
        return {
          ...prev,
          employmentType: isChecked
            ? [...prev.employmentType, type]
            : prev.employmentType.filter((item) => item !== type),
        };
      }
      return prev;
    });
  };

  const handleWorkingScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentProduct((prev) => {
      if (prev) {
        return {
          ...prev,
          workingSchedule: [value], // Assuming a single selection for now
        };
      }
      return prev;
    });
  };

  const handleSalaryFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = e.target.value;
    setCurrentProduct((prev) => {
      if (prev) {
        return {
          ...prev,
          salary: { ...prev.salary, frequency },
        };
      }
      return prev;
    });
  };


  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalType("update");
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    if (currentProduct) {
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings/${currentProduct._id}`, currentProduct, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs((prevJobs) =>
          prevJobs.map((job) => job._id === currentProduct._id ? response.data : job)
        );
        setFilteredJobs((prevJobs) =>
          prevJobs.map((job) => job._id === currentProduct._id ? response.data : job)
        );
        setIsEditing(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating job:", error);
        alert("Failed to update job. Please try again.");
      }
    }
  };

  const handleDelete = (id: string) => {
    setJobToDelete(id);
    setModalType("delete");
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings/${jobToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete));
        setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete));
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job.');
      }
    }
  };

  return (
    <div>
      <div className="manage-jobs-container">
        <AdminSidebar />
        <div className={`manage-jobs-content ${isEditing ? "blur" : ""}`}>
        <h1>Manage Job Postings</h1>

         {/* Search Bar */}
         <div className="searchBar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search jobs by title, skills or location"
            />
          </div>

          {(searchTerm ? filteredJobs : jobs).length > 0 ? (
            <div className="job-list">
              {(searchTerm ? filteredJobs : jobs).map((job) => (
                <div key={job._id} className="jobCard">
                  <h3>{job.title}</h3>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
                  <p><strong>Employment Type:</strong> {job.employmentType.join(", ")}</p>
                  <p><strong>Working Schedule:</strong> {job.workingSchedule.join(", ")}</p>
                  <p><strong>Salary:</strong> {job.salary.amount} {job.salary.type} ({job.salary.frequency})</p>
                  <p><strong>Hiring Multiple Candidates:</strong> {job.isHiringMultiple ? "Yes" : "No"}</p>
                  <div className="job-actions">
                    <button onClick={() => editProduct(job)} className="update-btn">Update Job</button>
                    <button onClick={() => handleDelete(job._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No job postings available. <Link to="/admin/createJob">Create a job</Link>.</p>
          )}
          <Link to="/admin/createJob" className="create-job-btn">Create New Job</Link>
        </div>
      </div>
      

      {isEditing && currentProduct && (
        <div className="modal-overlay">
          <div className="modal-container">
          <span className="modal-close-btn" onClick={() => setIsEditing(false)}>✖</span>
          <h1>Edit Job Posting</h1>
          <form className="job-posting-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={currentProduct.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                value={currentProduct.description}
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
                value={currentProduct.location}
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
                value={currentProduct.skills.join(", ")}
                onChange={handleChange}
                placeholder="e.g. JavaScript, React"
                required
              />
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <div className="checkbox-group">
                {["Full-time", "Part-time", "On demand", "Negotiable"].map((type) => (
                  <label key={type} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={currentProduct.employmentType.includes(type)}
                      onChange={(e) => handleEmploymentTypeChange(e, type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>


            <div className="form-group">
              <label>Working Schedule</label>
              <select
                name="workingSchedule"
                value={currentProduct.workingSchedule[0] || ""}
                onChange={handleWorkingScheduleChange}
                required
              >
                <option value="">Choose Work Shift</option>
                <option value="Day shift">Day shift</option>
                <option value="Night shift">Night shift</option>
                <option value="Weekend availability">Weekend availability</option>
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
                    checked={currentProduct.salary.type === "Hourly"}
                    onChange={handleChange}
                  />
                  <span className="icon">⏰</span> Hourly
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="salaryType"
                    value="Custom"
                    checked={currentProduct.salary.type === "Custom"}
                    onChange={handleChange}
                  />
                  <span className="icon">💼</span> Custom
                </label>
              </div>

              <div className="salary-inputs">
              <div className="form-group">
              <label>Amount you want to pay</label>
              <input
                type="number"
                name="salaryAmount"
                value={currentProduct.salary.amount}
                onChange={handleChange}
                placeholder="Salary Amount"
                required
              />
            </div>
               <div className="form-group">
              <label>How you want to pay</label>
              <select
                name="salaryFrequency"
                value={currentProduct.salary.frequency}
                onChange={handleSalaryFrequencyChange}
                required
              >
                <option value="">Choose Salary Frequency</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
              </select>
              </div>
            </div>
              {/* <label className="negotiable-checkbox">
             <input
                   type="checkbox"
                   name="isSalaryNegotiable"
                   onChange={handleChange}
                 />
                Salary is negotiable
               </label>  */}
            </div>
            <div className="form-group">
              <label className="checkbox-container">
              <input
                type="checkbox"
                checked={currentProduct.isHiringMultiple}
                onChange={(e) => setCurrentProduct((prev) => (prev ? { ...prev, isHiringMultiple: e.target.checked } : prev))}
              />Yes, I am hiring multiple candidates
              </label>
            </div>
            <button type="submit" className="update-button">Update Job</button>
            <button type="submit" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
        </div>
      )}
      {showModal && modalType === "delete" && (
        <DeleteUpdateModal
          // title="Delete Job"
          message="Are you sure you want to delete this job?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showModal && modalType === "update" && (
        <DeleteUpdateModal
          // title="Update Job"
          message="Do you really want to update this job?"
          onConfirm={confirmUpdate}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdminManageJob;
