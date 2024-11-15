import React, { useState, useEffect } from 'react';
import Sidebar from '../components/UserSidebar';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
}

const UserSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState<{
    name: boolean;
    phoneNumber: boolean;
    imageUrl: boolean;
  }>({
    name: false,
    phoneNumber: false,
    imageUrl: false,
  });
  const [newName, setNewName] = useState<string>('');
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the uploaded image file

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUser(response.data);
        setNewName(response.data.name);
        localStorage.setItem('username', response.data.name);
        setNewPhoneNumber(response.data.phoneNumber);
        setNewImageUrl(response.data.imageUrl);
        localStorage.setItem('avatar', response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setNewImageUrl(URL.createObjectURL(file)); // Preview the image locally
    }
  };

  const handleSaveChanges = async () => {
    try {
      let updatedImageUrl = newImageUrl;
      if (imageFile) {
        // Upload the new image to the server if there's a file selected
        const formData = new FormData();
        formData.append('image', imageFile); // 'image' is the field name used in multer

        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        updatedImageUrl = uploadResponse.data.fileUrl; // Get the Cloudinary URL
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        { name: newName, phoneNumber: newPhoneNumber, avatar: updatedImageUrl },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUser(response.data);
      setEditing({ name: false, phoneNumber: false, imageUrl: false });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="HH">
      <Sidebar />
      <div className="user-profile-container">
        <h1>User Profile</h1>

        {user && (
          <div className="user-profile-details">
            {/* Profile Picture */}
            <div className="profile-item">
              <label></label>
              <div className="profile-imgg">
                {editing.imageUrl ? (
                  <>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </>
                ) : (
                  <img
                    src={user.imageUrl}
                    alt="User Profile"
                    className="profile-image"
                  />
                )}
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() =>
                    setEditing({ ...editing, imageUrl: !editing.imageUrl })
                  }
                />
              </div>
            </div>

            {/* Name */}
            <div className="profile-item">
              <label>Name:</label>
              <div className="profile-editable">
                {editing.name ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name"
                  />
                ) : (
                  <p>{user.name}</p>
                )}
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() =>
                    setEditing({ ...editing, name: !editing.name })
                  }
                />
              </div>
            </div>

            {/* Email (not editable) */}
            <div className="profile-item">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>

            {/* Phone Number */}
            <div className="profile-item">
              <label>Phone Number:</label>
              <div className="profile-editable">
                {editing.phoneNumber ? (
                  <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    placeholder="Enter new phone number"
                  />
                ) : (
                  <p>{user.phoneNumber}</p>
                )}
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() =>
                    setEditing({
                      ...editing,
                      phoneNumber: !editing.phoneNumber,
                    })
                  }
                />
              </div>
            </div>

            {/* Save Changes Button */}
            {(editing.name || editing.phoneNumber || editing.imageUrl) && (
              <button
                onClick={handleSaveChanges}
                className="save-changes-button"
              >
                Save Changes
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
  .HH {
    background-image: url('/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 250px;
  }

  .user-profile-container {
    flex: 1;
    padding: 20px;
    margin: 0 auto;
    min-width: 640px;
     background: rgba(255, 255, 255, 0.565);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
   
  }

  .user-profile-container h1 {
    text-align: center;
    font-size: 32px; 
    color: #333;
    margin-bottom: 40px; 

  }

  .user-profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 20px;
  }

  .profile-item {
    display: flex;
    flex:1;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .profile-editable {
    display: flex;
    align-items: center;
  }

   .profile-imgg {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }

  .profile-image {
    width: 120px;  /* Increased profile image size */
    height: 120px;
    border-radius: 50%;
    margin-right: 15px;  /* Increased margin */
    
  }

  .edit-icon {
    cursor: pointer;
    color: #007bff;
    font-size: 20px;
  }

  input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: 10px;
    width: 200px;
  }

  .save-changes-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
    margin-top: 20px;
  }

  .save-changes-button:hover {
    background-color: #0056b3;
  }

@media (max-width: 768px) {
  .HH {
  padding-left: 0;
  }
  .user-profile-container{
  transform: scale(0.6);
  }
      }
`}</style>
    </div>
  );
};

export default UserSettings;
