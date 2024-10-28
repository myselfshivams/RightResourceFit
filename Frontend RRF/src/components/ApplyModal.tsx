import React, { useState, useEffect } from "react";
import styles from "../styles/ApplyModal.module.css"; 

interface ApplyModalProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ jobTitle, isOpen, onClose, onConfirm }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 400); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !isAnimating) return null; 

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isAnimating ? styles.hidden : ''}`}>
        <h2>Apply for {jobTitle}?</h2>
        <p>Do you want to apply for the job titled "{jobTitle}"?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
