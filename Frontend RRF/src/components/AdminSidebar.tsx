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
import LogoutModal from "./LogoutModal";

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
            onClick={() => navigate("/dashboard")}
            className={`${styles.navItem} ${
              window.location.pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            <FaHome className={styles.icon} />
            {!collapsed && <span>Home</span>}
          </a>
          {/* <a
            onClick={() => navigate("/admin/search")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/search" ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.icon} />
            {!collapsed && <span>Search</span>}
          </a> */}
          
          <a
            onClick={() => navigate("/admin/createJob")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/createJob" ? styles.active : ""
            }`}
          >
            <FaFileAlt className={styles.icon} />
            {!collapsed && <span>Post Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/admin/manageJob")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/manageJob" ? styles.active : ""
            }`}
          >
            
            <FaCog className={styles.icon} />
            {!collapsed && <span>Manage Jobs</span>}
          </a>
          <a
            onClick={() => navigate("/admin/userManage")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/userManage" ? styles.active : ""
            }`}
          >
            <IoMdPersonAdd className={styles.icon} />
            {!collapsed && <span>User Manage</span>}
          </a>
          <a
            onClick={() => navigate("/admin/applications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/applications" ? styles.active : ""
            }`}
          >
            <FaUsers className={styles.icon} />
            {!collapsed && <span>All Appilications</span>}
          </a>
          <a
            onClick={() => navigate("/admin/notifications")}
            className={`${styles.navItem} ${
              window.location.pathname === "/admin/notifications" ? styles.active : ""
            }`}
          >
            <FaBell className={styles.icon} />
            {!collapsed && <span>Notifications</span>}
          </a>
          <a onClick={handleLogoutClick} className={styles.navItem}>
            <FaSignOutAlt className={styles.icon} />
            {!collapsed && <span>Logout</span>}
          </a>
        </nav>
      </div>

      <div className={styles.footerNav}>
        <a
          onClick={() => navigate("/dashboard")}
          className={window.location.pathname === "/dashboard" ? styles.active : ""}
        >
          <FaHome className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/createJob")}
          className={window.location.pathname === "/admin/createJob" ? styles.active : ""}
        >
          <FaFileAlt className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/manageJob")}
          className={window.location.pathname === "/admin/manageJob" ? styles.active : ""}
        >
          <FaCog className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/userManage")}
          className={window.location.pathname === "/admin/userManage" ? styles.active : ""}
        >
          <IoMdPersonAdd className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/applications")}
          className={window.location.pathname === "/admin/applications" ? styles.active : ""}
        >
          <FaUsers className={styles.icon} />
        </a>
        <a
          onClick={() => navigate("/admin/notifications")}
          className={window.location.pathname === "/admin/notifications" ? styles.active : ""}
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
