import React, { useState } from "react";
import Sidebar from "../components/UserSidebar";
import styles from "../styles/UserSettings.module.css"; 

const UserSettings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setLinkedinId] = useState("");


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
      email,
      username,
      phone
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
            <label htmlFor="username" className={styles.inputLabel}>User Name:</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={styles.inputField}
            />
          </div>

          

          <div className={styles.formGroup}>
            <label htmlFor="linkedinId" className={styles.inputLabel}>Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setLinkedinId(e.target.value)}
              placeholder="Phone Number"
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
