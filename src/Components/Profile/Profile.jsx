import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import InputProfile from "./InputProfile";
import "./Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    async function FetchUserData() {
      try {
        const res = await fetch("http://localhost:8080/profile");
        const data = await res.json();

        setUserData(data);
      } catch (err) {
        console.error("error occured: ", err);
      }
      setIsLoading(false);
    }
  }, []);

  // const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  // const fileInputRef = useRef(null);

  // useEffect(() => {
  //   const savedImage = localStorage.getItem("userProfileImage");
  //   if (savedImage) {
  //     setProfileImage(savedImage);
  //   }
  // }, []);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const imageData = event.target.result;
  //     setProfileImage(imageData);
  //     localStorage.setItem("userProfileImage", imageData);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  return (
    <div className="body">
      <div className="inputs">
        <InputProfile
          className="firstName"
          label="First Name"
          value={userData.firstName}
          isEditable={isEditing}
          onChange={handleChange("firstName")}
        />

        <InputProfile
          className="lastName"
          label="Last Name"
          value={userData.lastName}
          isEditable={isEditing}
          onChange={handleChange("LastName")}
        />
      </div>

      <div className="header">
        <p className="Title">Interview Coach</p>
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} className="Home-logo" />
        </Link>
      </div>

      <p className="info">User Information</p>
      <button
        className="edit-save-button"
        onClick={() => {
          if (isEditing) {
            console.log("Saving data:", userData);
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Save Information" : "Edit Information"}
      </button>

      <div className="user-sidebar">
        <FontAwesomeIcon icon={faUser} className="user-icon" />

        {/* <div
          className="profile-upload-circle"
          onClick={() => fileInputRef.current.click()}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="uploaded-image" />
          ) : (
            <div className="default-profile">
              <FontAwesomeIcon icon={faUser} className="profile-silhouette" />
            </div>
          )} */}
        {/* <div className="upload-overlay">
            <FontAwesomeIcon icon={faCamera} />
            <span>Upload Image</span>
          </div>
        </div> */}

        {/* <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        /> */}
      </div>
    </div>
  );
}
