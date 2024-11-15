import React, { useEffect, useState } from 'react';
import Sidebar from '../components/UserSidebar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserCheck,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/UserDashboard.module.css';

const UserDashboard: React.FC = () => {
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalnotifications, setTotalnotifications] = useState<number>(0);
  const [application, setApplications] = useState<number>(0);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total jobs
        const jobsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/postings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTotalJobs(jobsResponse.data.length);
        
        const applicantID = localStorage.getItem('id'); // Assuming applicant ID is stored in localStorage
        const notificationResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interaction/status/${applicantID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const notificationData = await notificationResponse.json();
        setTotalnotifications(notificationData.length);
        
        const applicationResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application?applicantID=${applicantID}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setApplications(applicationResponse.data.length);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, []);

  const [currentTime, setCurrentTime] = useState<string>('');
  const [sidebarCollapsed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      const formattedTime = now
        .toLocaleString('en-GB', options)
        .replace(',', '');
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.AdminPage}>
      <Sidebar
        // collapsed={sidebarCollapsed}
        // toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={
          sidebarCollapsed
            ? styles.mainContainerCollapsed
            : styles.mainContainer
        }
      >
        <div className={styles.centerContainer}>
          <h1 className={styles.welcomeText}>
            Welcome, <span>{localStorage.getItem('username')}</span>
          </h1>
          <p className={styles.subText}>Last Login: {currentTime}</p>

          <div className={styles.infoCards}>
            <div className={styles.card}>
              <h2>Total Jobs Available</h2>
              <p>{totalJobs}</p>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            </div>

            <div className={styles.card}>
              <h2>All Applications</h2>
              <p>{application}</p>
              <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
            </div>

            <div className={styles.card}>
              <h2>New Notifications</h2>
              <p>{totalnotifications}</p>
              <FontAwesomeIcon icon={faBell} className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
