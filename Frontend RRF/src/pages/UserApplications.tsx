import React, { useState, useEffect } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import Sidebar from '../components/UserSidebar';
import styles from '../styles/UserNotifications.module.css';
import styles2 from '../styles/LogoutModal.module.css';

// Update the Application interface to reflect that jobID is an object with a title
interface Job {
  title: string;
}

interface Application {
  _id: string;
  applicantID: string;
  jobID: Job;  // jobID is an object with a title
  createdAt: string;
  status: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Fetch applications from the backend on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application?applicantID=${localStorage.getItem('id')}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewStatus = (application: Application) => {
    setSelectedApplication(application);
  };

  const closeStatusModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedApplication(null);
      setFadeOut(false);
    }, 400);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.NotificationContentPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.mainHeading}>
          My <span>Applications</span>
        </h1>
        <div className={styles.notificationListContainer}>
          <div className={styles.notificationList}>
            {applications.length === 0 ? (
              <p className={styles.noNotifications}>
                No applications available.
              </p>
            ) : (
              applications.map((application) => (
                <div key={application._id} className={styles.notificationCard}>
                  <div className={styles.icon}>
                    <FaClipboardList />
                  </div>
                  <div className={styles.notificationText}>
                    <p>
                      {application.jobID?.title} {/* Accessing title from jobID */}
                    </p>
                    {/* <span className={styles.date}>
                      Applied on: {formatDate(application.createdAt)}
                    </span> */}
                  </div>
                  <button
                    className={styles.StatusButton}
                    onClick={() => handleViewStatus(application)}
                    aria-label="View Status"
                  >
                    View Status
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedApplication && (
        <div className={styles2.modalOverlay}>
          <div className={`${styles2.modal} ${fadeOut ? styles2.hidden : ''}`}>
            <h2>Application Status</h2>
            <p>
              <strong>Position:</strong> {selectedApplication.jobID?.title} {/* Accessing title from jobID */}
            </p>
            <p>
              <strong>Date Applied:</strong> {formatDate(selectedApplication.createdAt)}
            </p>
            <p>
              <strong>Status:</strong> {selectedApplication.status}
            </p>
            <button className={styles2.cancelButton} onClick={closeStatusModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
