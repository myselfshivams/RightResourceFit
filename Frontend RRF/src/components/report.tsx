import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import jsPDF from 'jspdf';
import '../styles/report.css';

interface Applicant {
  name: string;
  _id: string;
  imageUrl: string;
  email: string;
  phoneNumber: string;
}

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

interface Application {
  _id: string;
  applicantID: Applicant;
  jobID: Job;
  resume: string;
  coverLetter: string;
  status: 'Applied' | 'Interview' | 'Hired' | 'Reviewed' | 'Accepted' | 'Rejected';
}



const JobReport: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [totalApplicants, setTotalApplicants] = useState<number>(0);
  const [shortlistedApplicants, setShortlistedApplicants] = useState<number>(0);
  const [inReviewApplicants, setInReviewApplicants] = useState<number>(0);
  const [inRejectApplicants, setInRejectApplicants] = useState<number>(0);
  
  if (!jobId) {
    return <><div className='qw23'>
    <AdminSidebar />
    </div> <div 
    style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      backgroundImage: 'url(/bg.png)', 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover' 
    }}
  >
    Job ID is missing!
  </div>
    </>
    
    
  }

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Fetch the job details and applications for the given jobId
    const fetchJobData = async () => {
      try {
        const applicationsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application/?jobID=${jobId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        const applicationsData = applicationsRes.data;
        setApplications(applicationsData);
        setTotalApplicants(applicationsData.length);

        const shortlisted = applicationsData.filter((application: Application) => application.status === "Hired");
        setShortlistedApplicants(shortlisted.length);

        const rejected = applicationsData.filter((application: Application) => application.status === "Rejected");
        setInRejectApplicants(rejected.length);

        const inReview = applicationsData.filter((application: Application) => application.status !== "Rejected" && application.status !== "Hired");
        setInReviewApplicants(inReview.length);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (jobId) {
      fetchJobData();
    }
  }, [jobId]);
  const generatePDFReport = () => {
    const jobDetails = applications.length > 0 ? applications[0].jobID : null;
    const report = {
      jobTitle: jobDetails?.title,
      jobDescription: jobDetails?.description,
      jobSkills: jobDetails?.skills.join(", "),
      jobmploymentType: jobDetails?.employmentType.join(", "),
      joblocation: jobDetails?.location,
      jobSalary: jobDetails?.salary.amount ,
      totalApplicants,
      hired: shortlistedApplicants,
      rejected: inRejectApplicants,
      inReview: inReviewApplicants,
      applicants: applications.map((app) => ({
        name: app.applicantID.name,
        status: app.status,
        resumeLink: app.resume,
      coverLetter: app.coverLetter,
        phoneNumber: app.applicantID.phoneNumber,
        email: app.applicantID.email, // Assuming _id is used as an email for simplicity
      })),
    };

    const doc = new jsPDF();
    doc.setFontSize(12);
    let currentYPosition = 10; // Start at top of page

  // Job details section
  doc.setFont('helvetica', 'bold');
  doc.text('Job Details', 10, currentYPosition);
  currentYPosition += 10;
  doc.setFont('helvetica', 'normal');
  doc.text(`Job Title: ${report.jobTitle}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Description: ${report.jobDescription}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Skills: ${report.jobSkills}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Employment Type: ${report.jobmploymentType}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Location: ${report.joblocation}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Salary: ${report.jobSalary}`, 10, currentYPosition);
  currentYPosition += 15; // Add extra space after job details section


  // Bold line after job details
  doc.setLineWidth(1); // Set the line width
  doc.line(10, currentYPosition, 200, currentYPosition); // Draw the line
  currentYPosition += 5; // Add space after the line

  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 10, currentYPosition);
  currentYPosition += 10;
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Applicants: ${report.totalApplicants}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Rejected: ${report.rejected}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`Hired: ${report.hired}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`In Review: ${report.inReview}`, 10, currentYPosition);
  currentYPosition += 15; // Add space after totals

  // Bold line after job details
  doc.setLineWidth(1); // Set the line width
  doc.line(10, currentYPosition, 200, currentYPosition); // Draw the line
  currentYPosition += 5; // Add space after the line


  // Add applicant details dynamically
  doc.setFont('helvetica', 'bold');
  doc.text('Applicants Details', 10, currentYPosition);
  currentYPosition += 10;
  doc.setFont('helvetica', 'normal');
  report.applicants.forEach((applicant, index) => {
    doc.text(`${index + 1}. Name: ${applicant.name}`, 10, currentYPosition);
    currentYPosition += 10;
    doc.text(`Email: ${applicant.email}`, 10, currentYPosition);
    currentYPosition += 10;
    doc.text(`Phone: ${applicant.phoneNumber}`, 10, currentYPosition);
    currentYPosition += 10;
    doc.text(`Status: ${applicant.status}`, 10, currentYPosition);
    currentYPosition += 10;
    doc.text(`Resume:`, 10, currentYPosition);
    doc.setFont('helvetica', 'normal'); // Normal text for the content
    doc.text('View Resume', 50, currentYPosition); // Display text
    doc.link(50, currentYPosition - 5, 60, 10, { url: applicant.resumeLink }); // Make the text a clickable link
    currentYPosition += 10;
    doc.setFont('helvetica', 'normal');

    doc.text(`Cover Letter: ${applicant.coverLetter}`, 10, currentYPosition);
    currentYPosition += 20; // Space between applicants

    // Dynamic page break if content exceeds page length
    if (currentYPosition > 270) {
      doc.addPage(); // Add a new page
      currentYPosition = 10; // Reset Y position to top of new page
    }
  });

    doc.save(`Job_Report_${report.jobTitle}.pdf`);
  };

  if (!applications.length) {
    return <><div className='qw23'>
    <AdminSidebar />
    </div> <div 
    style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      backgroundImage: 'url(/bg.png)', 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover' 
    }}
  >
    Loading job details...
  </div>
    </>
  }

  return (
    <div>
    <div className='qw23'>
    <AdminSidebar />
    </div>
    <div className='qw'>
      <h1>Job Report</h1>
      <button onClick={generatePDFReport}>Download PDF Report</button>
      <div>
        {applications.length > 0 && (
          <div>
            <h2>Job Title: {applications[0].jobID.title}</h2>
            <p><strong>Description:</strong> {applications[0].jobID.description}</p>
            <p><strong>Location:</strong> {applications[0].jobID.location}</p>
            <p><strong>Skills:</strong> {applications[0].jobID.skills.join(", ")}</p>
            <p><strong>Employment Type:</strong> {applications[0].jobID.employmentType.join(", ")}</p>
            <p><strong>Working Schedule:</strong> {applications[0].jobID.workingSchedule.join(", ")}</p>
            <p><strong>Salary:</strong> {applications[0].jobID.salary.amount} {applications[0].jobID.salary.type} ({applications[0].jobID.salary.frequency})</p>
            <p><strong>Hiring Multiple Candidates:</strong> {applications[0].jobID.isHiringMultiple ? "Yes" : "No"}</p>
          </div>
        )}
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h2>Total Applicants</h2>
          <p className="TotalApplicant">{totalApplicants}</p>
        </div>
        <div className="summary-card">
          <h2>Shortlisted Applicants</h2>
          <p className="Shortlisted">{shortlistedApplicants}</p>
        </div>
        <div className="summary-card">
          <h2>Rejected</h2>
          <p className="TotalJob">{inRejectApplicants}</p>
        </div>
        <div className="summary-card">
          <h2>In Review</h2>
          <p className="InReview">{inReviewApplicants}</p>
        </div>
      </div>
      
      <h3>Applications for this Job:</h3>
      <table>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Cover Letter</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: Application) => (
            <tr key={application._id}>
                
              <td>
              {application.applicantID.imageUrl ? (
                    <img src={application.applicantID.imageUrl} alt="Applicant" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  ) : (
                    <span>No Image</span>
                  )}
                {application.applicantID.name} <br />
                {application.applicantID.email} <br />
                {application.applicantID.phoneNumber}
                </td>
              <td>{application.status}</td>
              <td><a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></td>
              <td>{application.coverLetter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default JobReport;
