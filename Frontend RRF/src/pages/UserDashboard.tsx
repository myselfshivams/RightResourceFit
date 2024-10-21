import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserSidebar"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserCheck, faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/UserDashboard.module.css"; 

const UserDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sidebarCollapsed] = useState(false);
 

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
   
      };
      const formattedTime = now
        .toLocaleString("en-GB", options)
        .replace(",", "");
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
              Welcome, <span>{localStorage.getItem("username")}</span>
            </h1>
            <p className={styles.subText}>Last Login: {currentTime}</p>

            <div className={styles.infoCards}>
              <div className={styles.card}>
                <h2>Total Jobs Available</h2>
                <p>120</p>
                <FontAwesomeIcon icon={faUsers} className={styles.icon} />
              </div>

              <div className={styles.card}>
                <h2>Active Jobs</h2>
                <p>15</p>
                <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
              </div>

              <div className={styles.card}>
                <h2>New Notifications</h2>
                <p>12</p>
                <FontAwesomeIcon icon={faBell} className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default UserDashboard;
