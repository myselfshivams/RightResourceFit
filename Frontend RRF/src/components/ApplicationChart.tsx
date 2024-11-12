import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import '../styles/ApplicationChart.css';
import axios from 'axios';



interface Applicant {
  _id: string;
  status: string;
  jobId: string;
  applicantId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const ApplicationChart: React.FC = () => {
  const [rejectedApplicants, setRejectedApplicants] = useState<number>(0);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<number>(0);
  const [inReviewApplicants, setInReviewApplicants] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const applicants: Applicant[] = response.data;

        setShortlistedApplicants(applicants.filter(applicant => applicant.status === 'Hired').length);
        setInReviewApplicants(applicants.filter(applicant => applicant.status !== 'Rejected' && applicant.status !== 'Hired').length);
        setRejectedApplicants(applicants.filter(applicant => applicant.status === 'Rejected').length);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = useMemo(() => [
    { name: 'Shortlisted', value: shortlistedApplicants },
    { name: 'In Review', value: inReviewApplicants },
    { name: 'Rejected', value: rejectedApplicants },
  ], [shortlistedApplicants, inReviewApplicants, rejectedApplicants]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <div>Rejected: {rejectedApplicants}</div>
      </div>
    </div>
  );
};

export default ApplicationChart;
