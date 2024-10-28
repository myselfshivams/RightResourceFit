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
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleConfirm = () => {
    setIsApplying(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsApplying(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen && !isAnimating) return null; 

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isAnimating ? styles.hidden : ''}`}>
        {isApplying ? (
          <>
            <h2>Applying...</h2>
            <div className={styles.spinner}></div> 
          </>
        ) : isSuccess ? (
          <>
            <h2>Successfully Applied!</h2>
            <p>Your application for "{jobTitle}" has been submitted.</p>
            <button className={styles.closeButton} onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2>Apply for {jobTitle}?</h2>
            <p>Do you want to apply for the job titled "{jobTitle}"?</p>
            <div className={styles.buttonGroup}>
              <button className={styles.confirmButton} onClick={handleConfirm}>
                Yes
              </button>
              <button className={styles.cancelButton} onClick={onClose}>
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
