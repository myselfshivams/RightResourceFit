import AdminSidebar from '../components/AdminSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/AdminAllApplication.css";

interface Application {
  _id: string;
  jobID: string;
  applicantID: string;
  resume: string;
  coverLetter?: string;
  status: string;
  createdAt: string;
  avatar: string;
  applicantName?: string;
  jobTitle?: string;
  mail: string;
  email?: string;
  imageUrl?: string;
  MobNo: string;
  phoneNumber?: string;
  site: string;
  location?: string;

}

const AllApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');  // State for search term

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch all applications
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        // Populate each application's applicant and job details
        const detailedApplications = await Promise.all(
          response.data.map(async (application: Application) => {
            const applicationDetails = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/application/${application._id}`,
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return {
              ...application,
              avatar: applicationDetails.data.applicantID?.imageUrl || 'N/A',
              mail: applicationDetails.data.applicantID?.email || 'N/A',
              MobNo: applicationDetails.data.applicantID?.phoneNumber || 'N/A',
              applicantName: applicationDetails.data.applicantID?.name || 'N/A',
              jobTitle: applicationDetails.data.jobID?.title || 'N/A',
              site: applicationDetails.data.jobID?.location || 'N/A',
            };
          })
        );

        setApplications(detailedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []); // No dependencies, fetch once on component mount

  const handleSeeApplication = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleStatusChange = async () => {
    if (selectedApplication && newStatus) {
      try {
        // Update the application status
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/application/${selectedApplication._id}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
  
        // Send a notification to the user about the status update
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/interaction/notify`,
          {
            applicationID: selectedApplication._id,
            message: `Your application status has been ${newStatus}`,
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
  
        alert('Status updated and notification sent successfully');
        setSelectedApplication({ ...selectedApplication, status: newStatus });
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app._id === selectedApplication._id ? { ...app, status: newStatus } : app
          )
        );
      } catch (error) {
        console.error("Failed to update status or send notification:", error);
        alert('Failed to update status or send notification');
      }
    }
  };
  

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter applications based on the search term (jobTitle)
  const filteredApplications = applications.filter(application => 
    (application.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminSidebar />
      <div className="Application">
        <h1 className="H2">All Applications</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Job Role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm as the user types
          />
        </div>

        <table className="tble">
          <thead>
            <tr className="tr">
              <th >Applicant</th>
              <th >Name</th>
              <th>Applicant Email</th>
              <th>Applied Job</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>View Applications</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <tr  key={application._id}>
                  <td> <img
                    src={application.avatar}
                    alt={`${application.applicantName}'s avatar`}
                    className="userAvatar"
                  /></td>
                  <td>{application.applicantName}</td>
                  <td>{application.mail}</td>
                  <td>{application.jobTitle}</td>
                  <td>{formatDate(application.createdAt)}</td>
                  <td>{application.status}</td>
                  <td>
                    <button onClick={() => handleSeeApplication(application)}>See Application</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No applications found</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedApplication && (
          <div className="modal">
            <div className="modal-content">
              <h3>Applicat Details</h3>
              <p><img src={selectedApplication.avatar} className='userImg' alt={selectedApplication.applicantName}  /><strong>{selectedApplication.applicantName} </strong> </p>
              
              <p><strong>Email:</strong> {selectedApplication.mail}</p>
              <p><strong>Contact No.</strong> {selectedApplication.MobNo}</p>
              <p><strong>Applied Job:</strong> {selectedApplication.jobTitle}</p>
              <p><strong>Job Location:</strong> {selectedApplication.site}</p>
              {/* <p><strong>Employment Type:</strong> {selectedApplication.employment}</p> */}
              <p><strong>Applied Date:</strong> {formatDate(selectedApplication.createdAt)}</p>
              <p><strong>Resume:</strong> <a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer">Download</a></p>
              <p><strong>Cover Letter:</strong> {selectedApplication.coverLetter || 'Not provided'}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              

              <label htmlFor="status">Change Status
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option  value="Applied">Applied</option>
                <option value="Reviewed">Reviewed</option>
                <option  value="Accepted">Accepted</option>
                <option  value="Interview">Interview</option>
                <option  value="Hired">Hired</option>
                <option  value="Rejected">Rejected</option>
              </select></label>
              
              <button className='Updtebutn' onClick={handleStatusChange}>Update Status</button>
              <button className='Cancelbutn' onClick={() => setSelectedApplication(null)}>Close</button>
            </div>
            
          </div>
          
        )}
        
      </div>
  </div>
  
  );
};

export default AllApplicationsPage;
