import { useState } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa';
import styles from '../styles/UserNotifications.module.css';
import styles2 from '../styles/LogoutModal.module.css';
import AdminSidebar from '../components/AdminSidebar';

interface Notification {
  id: number;
  text: string;
  date: string;
}

const AdminNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: 'New job posted: Software Engineer', date: '2024-10-20' },
    {
      id: 2,
      text: 'Your application for Project Manager has been received',
      date: '2024-10-19',
    },
    { id: 3, text: 'New job posting: Data Analyst', date: '2024-10-18' },
    {
      id: 4,
      text: 'Your application status has been updated: Under Review',
      date: '2024-10-17',
    },
    { id: 5, text: 'New job posting: UX Designer', date: '2024-10-16' },
    {
      id: 6,
      text: 'Your application for Frontend Developer has been shortlisted',
      date: '2024-10-15',
    },
    {
      id: 7,
      text: 'You have received feedback on your application for Data Scientist',
      date: '2024-10-14',
    },
    {
      id: 8,
      text: 'Your application has been rejected for Marketing Specialist',
      date: '2024-10-13',
    },
    { id: 9, text: 'New job posting: HR Coordinator', date: '2024-10-12' },
    { id: 10, text: 'Reminder: Job fair on 2024-10-25', date: '2024-10-11' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleDelete = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleClearAll = () => {
    setShowModal(true);
  };

  const confirmClearAll = () => {
    setNotifications([]);
    setShowModal(false);
  };

  const cancelClearAll = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      setFadeOut(false);
    }, 400);
  };

  return (
    <div>
      <div className={styles.NotificationContentPage}>
        <AdminSidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.mainHeading}>
            Your <span>Notifications</span>
          </h1>
          <div className={styles.notificationListContainer}>
            <div className={styles.notificationHeader}>
              {notifications.length > 0 && (
                <button
                  className={styles.clearAllButton}
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              )}
            </div>
            <div className={styles.notificationList}>
              {notifications.length === 0 ? (
                <p className={styles.noNotifications}>
                  No notifications available.
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationCard}
                  >
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

        {showModal && (
          <div className={styles2.modalOverlay}>
            <div
              className={`${styles2.modal} ${fadeOut ? styles2.hidden : ''}`}
            >
              <h2>Clear All Notifications</h2>
              <p>
                Are you sure you want to clear all notifications? This action
                cannot be undone.
              </p>
              <div className={styles2.buttonGroup}>
                <button
                  className={styles2.confirmButton}
                  onClick={confirmClearAll}
                >
                  Clear
                </button>
                <button
                  className={styles2.cancelButton}
                  onClick={cancelClearAll}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotification;
