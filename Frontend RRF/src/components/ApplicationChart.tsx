import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import '../styles/ApplicationChart.css';
import { useState, useEffect } from "react";
import axios from "axios";

interface ApplicationData {
  name: string;
  value: number;
}


interface Applicant {
  _id: string;
  status: string; // Assuming status is a string (e.g., 'shortlisted', 'in review', etc.)
  jobId: string;
  applicantId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const ApplicationChart: React.FC = () => {

  const [RejectedApplicants, setRejectedApplicants] = useState<number>(0);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<number>(0);
  const [inReviewApplicants, setInReviewApplicants] = useState<number>(0);

  const data: ApplicationData[] = [
    { name: 'Shortlisted', value: shortlistedApplicants },
    { name: 'in Review', value:  inReviewApplicants},
    { name: 'Rejected', value: RejectedApplicants  },
  ];
  
useEffect(() => {
  const fetchData = async () => {
    try {
     

      // Fetch all applicants
      const applicantsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const applicants: Applicant[] = applicantsResponse.data; // Ensure the data matches the Applicant type

      // Count shortlisted applicants
      const shortlisted = applicants.filter((applicant) => applicant.status === "Accepted");
      setShortlistedApplicants(shortlisted.length);

      // Count in-review applicants
      const inReview = applicants.filter((applicant) => applicant.status === "Reviewed");
      setInReviewApplicants(inReview.length);

      const Reject = applicants.filter((applicant) => applicant.status === "Rejected");
      setRejectedApplicants(Reject.length);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };
  fetchData();
}, []);

  return (
    <div className="application-chart">
      <h3>Application Response</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="application-data">
        <div>Shortlisted: {shortlistedApplicants}</div>
        <div>In Review: {inReviewApplicants}</div>
        <div>Rejected: {RejectedApplicants}</div>
      </div>
    </div>
  );
};

export default ApplicationChart;
