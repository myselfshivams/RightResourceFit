import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../styles/LogoutModal.module.css';

interface LogoutModalProps {
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ setIsLogoutModalOpen }) => {
  const navigate = useNavigate(); 

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/logout'); 
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={handleConfirmLogout}>
            Yes, Logout
          </button>
          <button className={styles.cancelButton} onClick={handleCancelLogout}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
