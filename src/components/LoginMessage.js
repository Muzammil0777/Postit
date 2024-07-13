// components/LoginMessage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/LoginMessage.css";

const LoginMessage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-message">
      <p>You need to login to see posts.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginMessage;
