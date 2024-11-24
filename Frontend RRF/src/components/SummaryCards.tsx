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
        const shortlisted = applicants.filter((applicant) => applicant.status === "Hired");
        setShortlistedApplicants(shortlisted.length);

        // Count in-review applicants
        setInReviewApplicants(applicants.filter(applicant => applicant.status !== 'Rejected' && applicant.status !== 'Hired').length);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="summary-cards">
      <div className="summary-card1">
        <h2>Total Jobs</h2>
        <p>{totalJobs}</p>
      </div>
      <div className="summary-card2">
        <h2>Total Applicants</h2>
        <p>{totalApplicants}</p>
      </div>
      <div className="summary-card3">
        <h2>Shortlisted Applicants</h2>
        <p>{shortlistedApplicants}</p>
      </div>
      <div className="summary-card4">
        <h2>In Review</h2>
        <p>{inReviewApplicants}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

