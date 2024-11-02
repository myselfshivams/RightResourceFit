import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaBell,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 
import styles from "../styles/UserSidebar.module.css";
import LogoutModal from "../components/LogoutModal";

const Sidebar: React.FC = () => {
  const [collapsed] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();



  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
       

        <div className={styles.userSection}>
          <img
            src={localStorage.getItem("avatar") || "/assets/user.png"}
            alt="User Avatar"
            className={styles.userImage}
          />
          {!collapsed && <span className={styles.userName}>{localStorage.getItem("username")}</span>}
        </div>
        <nav className={styles.nav}>
          <a
            onClick={() => navigate("/user-dashboard")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user-dashboard" ? styles.active : ""
            }`}
          >
            <FaHome className={styles.icon} />
            {!collapsed && <span>Home</span>}
          </a>
          {/* <a
            onClick={() => navigate("/user/search")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/search" ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.icon} />
            {!collapsed && <span>Search</span>}
          </a> */}
          <a
            onClick={() => navigate("/user/applications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/applications" ? styles.active : ""
            }`}
          >
            <FaFileAlt className={styles.icon} />
            {!collapsed && <span>My Appilications</span>}
          </a>
          <a
            onClick={() => navigate("/user/jobs")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/jobs" ? styles.active : ""
            }`}
          >
            <IoMdPersonAdd className={styles.icon} />
            {!collapsed && <span>Active Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/user/manage")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/manage" ? styles.active : ""
            }`}
          >
            <FaUsers className={styles.icon} />
            {!collapsed && <span>Manage Applications</span>}
          </a>
          <a
            onClick={() => navigate("/user/notifications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/notifications" ? styles.active : ""
            }`}
          >
            <FaBell className={styles.icon} />
            {!collapsed && <span>Notifications</span>}
          </a>
          <a
            onClick={() => navigate("/user/settings")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/settings" ? styles.active : ""
            }`}
          >
            <FaCog className={styles.icon} />
            {!collapsed && <span>Settings</span>}
          </a>
          <a onClick={handleLogoutClick} className={styles.navItem}>
            <FaSignOutAlt className={styles.icon} />
            {!collapsed && <span>Logout</span>}
          </a>
        </nav>
      </div>

      <div className={styles.footerNav}>
        <a
          onClick={() => navigate("/user-dashboard")}
          className={window.location.pathname === "/user-dashboard" ? styles.active : ""}
        >
          <FaHome className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/user/applications")}
          className={window.location.pathname === "/manage" ? styles.active : ""}
        >
          <FaFileAlt className={styles.icon} />
        </a>
        <a
            onClick={() => navigate("/user/jobs")}
            className={
              window.location.pathname === "/user/jobs" ? styles.active : ""
            }
          >
            <IoMdPersonAdd className={styles.icon} />
          </a>
          <a
            onClick={() => navigate("/user/manage")}
            className={
              window.location.pathname === "/user/manage" ? styles.active : ""
            }
          >
            <FaUsers className={styles.icon} />
          </a>
        {/* <a
          onClick={() => navigate("/user/search")}
          className={window.location.pathname === "/user/search" ? styles.active : ""}
        >
          <FaSearch className={styles.icon} />
        </a> */}
        <a
          onClick={() => navigate("/user/notifications")}
          className={window.location.pathname === "/notifications" ? styles.active : ""}
        >
          <FaBell className={styles.icon} />
        </a>
        <a
            onClick={() => navigate("/user/settings")}
            className=
              {window.location.pathname === "/user/settings" ? styles.active : ""}
            
          >
            <FaCog className={styles.icon} />
          </a>
        <a
          onClick={handleLogoutClick}
          className={window.location.pathname === "/logout" ? styles.active : ""}
        >
          <FaSignOutAlt className={styles.icon} />
        </a>
      </div>

      {isLogoutModalOpen && <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />}
    </>
  );
};

export default Sidebar;
