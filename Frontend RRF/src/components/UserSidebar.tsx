import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaUsers,
  FaBell,
  FaCog,
  FaBars,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 
import styles from "../styles/UserSidebar.module.css";
import LogoutModal from "../components/LogoutModal";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <button className={styles.collapseButton} onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className={styles.userSection}>
          <img
            src="/assets/user.png"
            alt="User Avatar"
            className={styles.userImage}
          />
          {!collapsed && <span className={styles.userName}>Shivam</span>}
        </div>

        <nav className={styles.nav}>
          <a
            onClick={() => navigate("/user-dashboard")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user" ? styles.active : ""
            }`}
          >
            <FaHome className={styles.icon} />
            {!collapsed && <span>Home</span>}
          </a>
          <a
            onClick={() => navigate("/user/search")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/search" ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.icon} />
            {!collapsed && <span>Search</span>}
          </a>
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
            onClick={() => navigate("/user/subject")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/subject" ? styles.active : ""
            }`}
          >
            <FaFileAlt className={styles.icon} />
            {!collapsed && <span>Active Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/manage")}
            className={`${styles.navItem} ${
              window.location.pathname === "/manage" ? styles.active : ""
            }`}
          >
            <FaUsers className={styles.icon} />
            {!collapsed && <span>Manage Applications</span>}
          </a>
          <a
            onClick={() => navigate("/user/notification")}
            className={`${styles.navItem} ${
              window.location.pathname === "/user/notification" ? styles.active : ""
            }`}
          >
            <FaBell className={styles.icon} />
            {!collapsed && <span>Notifications</span>}
          </a>
          <a
            onClick={() => navigate("/settings")}
            className={`${styles.navItem} ${
              window.location.pathname === "/settings" ? styles.active : ""
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
          onClick={() => navigate("/user")}
          className={window.location.pathname === "/user" ? styles.active : ""}
        >
          <FaHome className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/manage")}
          className={window.location.pathname === "/manage" ? styles.active : ""}
        >
          <FaUsers className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/user/search")}
          className={window.location.pathname === "/user/search" ? styles.active : ""}
        >
          <FaSearch className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/notifications")}
          className={window.location.pathname === "/notifications" ? styles.active : ""}
        >
          <FaBell className={styles.icon} />
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
