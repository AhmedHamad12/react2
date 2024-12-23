import React, { useState, useEffect } from "react";
import Header from "../component/Settings/Header";
import "../styles/settings.css";

function AccountSettings() {
  const defaultUserData = {
    displayName: "John Doe",
    email: "johndoe@gmail.com",
    profilePicture: "https://via.placeholder.com/100",
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://localhost:7251/api/Accounts/GetCurrentUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();

        // قراءة الصورة من localStorage إذا كانت موجودة
        const savedProfilePicture = localStorage.getItem("profilePicture");

        setUserData({
          displayName: data.displayName || defaultUserData.displayName,
          email: data.email || defaultUserData.email,
          profilePicture: savedProfilePicture || defaultUserData.profilePicture,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result;

        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: uploadedImage,
        }));
        try {
          localStorage.setItem("profilePicture", uploadedImage); 
          console.log("Image saved to localStorage:", uploadedImage); 
        } catch (err) {
          console.error("Error saving image to localStorage:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      profilePicture: defaultUserData.profilePicture,
    }));
    localStorage.removeItem("profilePicture"); 
    console.log("Profile picture removed from localStorage"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("profilePicture"); 
    window.location.href = "/"; 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all">
      <div className="header"><Header /></div>
      <div className="account-container">
        <div className="account-settings">
          <h1>Manage Account</h1>
          <div className="image-section">
            <img
              className="profile-picture"
              src={userData.profilePicture}
              alt="Profile"
            />
            <div className="image-buttons">
              <button className="update-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="upload-image"
                />
                <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                  Update Photo
                </label>
              </button>
              <button className="delete-button" onClick={handleDeleteImage}>
                Delete
              </button>
            </div>
          </div>

          <form className="form">
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                name="displayName"
                value={userData.displayName}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                readOnly
              />
            </div>
          </form>

          <div className="logout-section">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
