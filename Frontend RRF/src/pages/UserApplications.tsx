import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import Sidebar from "../components/UserSidebar";
import styles from "../styles/UserNotifications.module.css"; 
import styles2 from "../styles/LogoutModal.module.css"; 

interface Application {
  id: number;
  position: string;
  company: string;
  dateApplied: string;
  status: string;
}

const Applications: React.FC = () => {
  const [applications] = useState<Application[]>([
    { id: 1, position: "Software Engineer", company: "TechCorp", dateApplied: "2024-10-20", status: "Under Review" },
    { id: 2, position: "Project Manager", company: "BizSolutions", dateApplied: "2024-10-19", status: "Received" },
    { id: 3, position: "Data Analyst", company: "DataWorks", dateApplied: "2024-10-18", status: "Shortlisted" },
    { id: 4, position: "UX Designer", company: "CreativeHub", dateApplied: "2024-10-16", status: "Rejected" },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

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
              <p className={styles.noNotifications}>No applications available.</p>
            ) : (
              applications.map((application) => (
                <div key={application.id} className={styles.notificationCard}>
                  <div className={styles.icon}>
                    <FaClipboardList />
                  </div>
                  <div className={styles.notificationText}>
                    <p>{application.position} at {application.company}</p>
                    <span className={styles.date}>Applied on: {application.dateApplied}</span>
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
          <div className={`${styles2.modal} ${fadeOut ? styles2.hidden : ""}`}>
            <h2>Application Status</h2>
            <p>
              <strong>Position:</strong> {selectedApplication.position}
            </p>
            <p>
              <strong>Company:</strong> {selectedApplication.company}
            </p>
            <p>
              <strong>Date Applied:</strong> {selectedApplication.dateApplied}
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
