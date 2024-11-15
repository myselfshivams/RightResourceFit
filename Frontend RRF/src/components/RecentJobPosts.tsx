import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecentJobPosts.css';

interface JobPost {
  title: string;
  location: string;
  skills: string[];
  employmentType: string[];
  workingSchedule: string[];
  salary: {
    amount: number;
    type: string;
    frequency: string;
    isNegotiable: boolean;
  };
  status: boolean;
}

const RecentJobPosts: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Assuming you want to show only the first 6 jobs
        setJobPosts(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

 
  return (
    <div className="recent-job-posts">
      <h3>Recent Job Posts</h3>
      
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Skills</th>
            <th>Employment Type</th>
          </tr>
        </thead>
        <tbody>
          {jobPosts.map((post, index) => (
            <tr key={index}>
              <td>{post.title}</td>
              <td>{post.location}</td>
              <td>{post.skills.join(', ')}</td>
              <td>{post.employmentType.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentJobPosts;
