import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch("http://localhost:8081/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );
        if (user) {
          // Login successful
          console.log("Login successful");
          setLoggedInUser(user); // Set the logged-in user
          navigate("/dashboard"); // Redirect to the dashboard page
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
