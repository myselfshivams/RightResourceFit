import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ApplyModal.module.css';

interface ApplyModalProps {
  jobTitle: string;
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({
  jobTitle,
  jobId,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isOpen) {
      fetchUserProfile();
      setIsAnimating(false);
    } else if (!isOpen && isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimating, onClose]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async () => {
    if (!resume) {
      alert('Application submitted successfully.');
      return;
    }

    setIsApplying(true);
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append('image', resume);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const resumeUrl = uploadResponse.data.fileUrl;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/application`,
        {
          jobID: jobId,
          resume: resumeUrl,
          coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setIsSuccess(true);
      onConfirm();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application.');
    } finally {
      setIsApplying(false);
    }
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
            <h2>Apply for {jobTitle}</h2>
            <form className={styles.applicationForm}>
              {/* Display User Profile Info */}
              {userProfile && (
                <>
                  <label>Name: {userProfile.name}</label>
                  
                  <label>Email: {userProfile.email}</label>
                  
                  <label>Phone Number: {userProfile.phoneNumber}</label>
                  
                </>
              )}
              
              {/* Resume Upload */}
              <label className='Resume'>
                Resume:
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required />
              </label>
              
              {/* Cover Letter */}
              <label className='coverLetter'>
                Cover Letter:
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a brief cover letter"
                />
              </label>
              
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.confirmButton}
                  onClick={handleSubmitApplication}
                >
                  Apply
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
