import React, { useState } from "react";
import Sidebar from "../components/UserSidebar";
import styles from "../styles/UserSettings.module.css"; 

const UserSettings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [githubId, setGithubId] = useState("");

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      profileImage,
      gender,
      password,
      dateOfBirth,
      linkedinId,
      githubId,
    });
  };

  return (
    <div className={styles.AddPage}>
      <Sidebar />
      <div className={styles.addPage}>
        <h1 className={styles.pageHeading}>Settings <span>Page</span></h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="profileImage" className={styles.inputLabel}>Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className={styles.inputField}
            />
            {profileImage && <img src={profileImage} alt="Profile Preview" className={styles.profileImage} />}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender" className={styles.inputLabel}>Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Change Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateOfBirth" className={styles.inputLabel}>Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="linkedinId" className={styles.inputLabel}>LinkedIn ID:</label>
            <input
              type="text"
              id="linkedinId"
              value={linkedinId}
              onChange={(e) => setLinkedinId(e.target.value)}
              placeholder="LinkedIn Profile URL"
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="githubId" className={styles.inputLabel}>GitHub ID:</label>
            <input
              type="text"
              id="githubId"
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
              placeholder="GitHub Profile URL"
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
