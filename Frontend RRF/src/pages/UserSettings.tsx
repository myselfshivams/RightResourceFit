import React, { useState } from 'react';
import Sidebar from '../components/UserSidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from "react-icons/ai";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
}

const UserSettings: React.FC = () => {


  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState<{ name: boolean; phoneNumber: boolean; imageUrl: boolean }>({
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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
        setNewName(response.data.name);
        localStorage.setItem('username', response.data.name)
        setNewPhoneNumber(response.data.phoneNumber);
        setNewImageUrl(response.data.imageUrl);
        localStorage.setItem('avatar', response.data.imageUrl)
      } catch (error) {
        console.error("Error fetching user profile:", error);
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

        const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        updatedImageUrl = uploadResponse.data.fileUrl; // Get the Cloudinary URL
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
        { name: newName, phoneNumber: newPhoneNumber, avatar: updatedImageUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setUser(response.data);
      setEditing({ name: false, phoneNumber: false, imageUrl: false });
      alert('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile');
    }
  };

  return (
 <div className='HH'>
      <Sidebar/>
      <div className="user-profile-container">
        <h1>User Profile</h1>

        {user && (
          <div className="user-profile-details">
            {/* Profile Picture */}
            <div className="profile-item">
              <label></label>
              <div className="profile-editable">
                {editing.imageUrl ? (
                  <>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </>
                ) : (
                  <img src={user.imageUrl} alt="User Profile" className="profile-image" />
                )}
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() => setEditing({ ...editing, imageUrl: !editing.imageUrl })}
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
                  onClick={() => setEditing({ ...editing, name: !editing.name })}
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
                  onClick={() => setEditing({ ...editing, phoneNumber: !editing.phoneNumber })}
                />
              </div>
            </div>

            {/* Save Changes Button */}
            {(editing.name || editing.phoneNumber || editing.imageUrl) && (
              <button onClick={handleSaveChanges} className="save-changes-button">
                Save Changes
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
