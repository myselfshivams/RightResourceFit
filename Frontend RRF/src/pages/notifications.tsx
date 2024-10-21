import React, { useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";
import Sidebar from "../components/UserSidebar";
import styles from "../styles/UserNotifications.module.css";

interface Notification {
  id: number;
  text: string;
  date: string;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: "New job posted: Software Engineer", date: "2024-10-20" },
    { id: 2, text: "Your application for Project Manager has been received", date: "2024-10-19" },
    { id: 3, text: "New job posting: Data Analyst", date: "2024-10-18" },
    { id: 4, text: "Your application status has been updated: Under Review", date: "2024-10-17" },
    { id: 5, text: "New job posting: UX Designer", date: "2024-10-16" },
    { id: 6, text: "Your application for Frontend Developer has been shortlisted", date: "2024-10-15" },
    { id: 7, text: "You have received feedback on your application for Data Scientist", date: "2024-10-14" },
    { id: 8, text: "Your application has been rejected for Marketing Specialist", date: "2024-10-13" },
    { id: 9, text: "New job posting: HR Coordinator", date: "2024-10-12" },
    { id: 10, text: "Reminder: Job fair on 2024-10-25", date: "2024-10-11" },
  ]);

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  return (

      <div className={styles.NotificationContentPage}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.mainHeading}>
            Your <span>Notifications</span>
          </h1>
          <div className={styles.notificationListContainer}>
            <div className={styles.notificationHeader}>
              {notifications.length > 0 && (
                <button className={styles.clearAllButton} onClick={handleClearAll}>
                  Clear All
                </button>
              )}
            </div>
            <div className={styles.notificationList}>
              {notifications.length === 0 ? (
                <p className={styles.noNotifications}>No notifications available.</p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className={styles.notificationCard}>
                    <div className={styles.icon}>
                      <FaBell />
                    </div>
                    <div className={styles.notificationText}>
                      <p>{notification.text}</p>
                      <span className={styles.date}>{notification.date}</span>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(notification.id)}
                      aria-label="Delete Notification"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

  );
};

export default Notification;
