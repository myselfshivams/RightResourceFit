import React, { useState, useEffect } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/UserSidebar';
import styles from '../styles/UserNotifications.module.css';
import styles2 from '../styles/LogoutModal.module.css';

interface Notification {
  _id: string;
  message: string;
  notifiedAt: string;
}

const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Fetch all notifications for the applicant
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const applicantID = localStorage.getItem('id'); // Assuming applicant ID is stored in localStorage
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interaction/status/${applicantID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  // Delete a single notification
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interaction/notification/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Only update notifications if the delete request was successful
      if (response.ok) {
        setNotifications(notifications.filter((notification) => notification._id !== id));
      } else {
        console.error('Failed to delete notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };
  

  // Open modal for clearing all notifications
  const handleClearAll = () => {
    setShowModal(true);
  };

  // Confirm and clear all notifications
  const confirmClearAll = async () => {
    try {
      const applicantID = localStorage.getItem('id');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interaction/notifications/user/${applicantID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Only clear notifications if the server response is successful
      if (response.ok) {
        setNotifications([]);
        setShowModal(false);
      } else {
        console.error('Failed to clear notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };
  
  // Cancel clearing all notifications with fade-out effect
  const cancelClearAll = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      setFadeOut(false);
    }, 400);
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
                <div key={notification._id} className={styles.notificationCard}>
                  <div className={styles.icon}>
                    <FaBell />
                  </div>
                  <div className={styles.notificationText}>
                    <p>{notification.message}</p>
                    <span className={styles.date}>
                      {new Date(notification.notifiedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(notification._id)}
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

      {showModal && (
        <div className={styles2.modalOverlay}>
          <div className={`${styles2.modal} ${fadeOut ? styles2.hidden : ''}`}>
            <h2>Clear All Notifications</h2>
            <p>
              Are you sure you want to clear all notifications? This action cannot be undone.
            </p>
            <div className={styles2.buttonGroup}>
              <button className={styles2.confirmButton} onClick={confirmClearAll}>
                Clear
              </button>
              <button className={styles2.cancelButton} onClick={cancelClearAll}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
