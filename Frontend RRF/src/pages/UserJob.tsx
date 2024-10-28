import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/UserSidebar";
import ApplyModal from "../components/ApplyModal"; 
import styles from "../styles/UserActiveJobs.module.css";

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

const ActiveJobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>(""); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchValue) ||
      job.description.toLowerCase().includes(searchValue) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchValue)) ||
      job.location.toLowerCase().includes(searchValue)
    );

    setFilteredJobs(filtered);
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle); 
    setModalOpen(true); 
  };

  const handleModalClose = () => {
    setModalOpen(false); 
    setSelectedJobTitle(""); 
  };

  const handleConfirmApply = () => {
    console.log(`Applying for job: ${selectedJobTitle}`);
    setModalOpen(false); 
    setSelectedJobTitle(""); 
  };

  return (
    <>
      <Sidebar />
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.head}>Active Jobs</h1>
            <div className={styles.searchBar}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search jobs by title, skills or location"
              />
            </div>
            {(searchTerm ? filteredJobs : jobs).length > 0 ? (
              <div className={styles.jobList}>
                {(searchTerm ? filteredJobs : jobs).map((job) => (
                  <div key={job._id} className={styles.jobCard}>
                    <h3>{job.title}</h3>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
                    <p><strong>Employment Type:</strong> {job.employmentType.join(", ")}</p>
                    <p><strong>Working Schedule:</strong> {job.workingSchedule.join(", ")}</p>
                    <p><strong>Salary:</strong> {job.salary.amount} {job.salary.type} ({job.salary.frequency})</p>
                    <p><strong>Hiring Multiple Candidates:</strong> {job.isHiringMultiple ? "Yes" : "No"}</p>
                    <button className={styles.applyButton} onClick={() => handleApplyClick(job.title)}>
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noJobs}>
                <img src="/no.png" alt="No jobs available" className={styles.noJobsImage} />
                <p>No Jobs available right now. Try looking after a few days.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ApplyModal 
        jobTitle={selectedJobTitle} 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onConfirm={handleConfirmApply} 
      />
    </>
  );
};

export default ActiveJobPage;
