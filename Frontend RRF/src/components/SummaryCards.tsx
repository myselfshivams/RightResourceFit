
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SummaryCards.css";

// Define the type for an Applicant object
interface Applicant {
  _id: string;
  status: string; // Assuming status is a string (e.g., 'shortlisted', 'in review', etc.)
  jobId: string;
  applicantId: string;
}

const SummaryCards = () => {
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalApplicants, setTotalApplicants] = useState<number>(0);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<number>(0);
  const [inReviewApplicants, setInReviewApplicants] = useState<number>(0);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total jobs
        const jobsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTotalJobs(jobsResponse.data.length);

        // Fetch all applicants
        const applicantsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const applicants: Applicant[] = applicantsResponse.data; // Ensure the data matches the Applicant type
        setTotalApplicants(applicants.length);

        // Count shortlisted applicants
        const shortlisted = applicants.filter((applicant) => applicant.status === "Accepted");
        setShortlistedApplicants(shortlisted.length);

        // Count in-review applicants
        const inReview = applicants.filter((applicant) => applicant.status === "Reviewed");
        setInReviewApplicants(inReview.length);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h2>Total Jobs</h2>
        <p className="TotalJob">{totalJobs}</p>
      </div>
      <div className="summary-card">
        <h2>Total Applicants</h2>
        <p className="TotalApplicant">{totalApplicants}</p>
      </div>
      <div className="summary-card">
        <h2>Shortlisted Applicants</h2>
        <p className="Shortlisted">{shortlistedApplicants}</p>
      </div>
      <div className="summary-card">
        <h2>In Review</h2>
        <p className="InReview">{inReviewApplicants}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

