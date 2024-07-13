// pages/Preferences.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Preferences.css";

function Preferences({ loggedInUser, setLoggedInUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    // Add more form fields as needed
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    // Add more error fields as needed
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      // User is not logged in, redirect to login page
      navigate("/login");
    } else {
      // Fetch user preferences from the server or local storage
      const fetchedPreferences = {
        username: loggedInUser.username,
        email: loggedInUser.email,
        // Add more preferences as needed
      };
      setFormData(fetchedPreferences);
    }
  }, [loggedInUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your preferences update logic here
    // Validate form data and handle errors
    console.log("Updated Form Data:", formData);

    // Update user preferences on the server
    fetch(`http://localhost:8081/users/${loggedInUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...loggedInUser,
        username: formData.username,
        email: formData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User preferences updated:", data);
        setLoggedInUser(data); // Update the logged-in user state
      })
      .catch((error) =>
        console.error("Error updating user preferences:", error)
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="preferences-page">
      <h2>Preferences</h2>
      {loggedInUser ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          {/* Add more form fields as needed */}
          <button type="submit">Update Preferences</button>
        </form>
      ) : (
        <div>
          <p>You need to login to edit preferences.</p>
          <Link to="/login">Go to Login</Link>
        </div>
      )}
    </div>
  );
}

export default Preferences;
