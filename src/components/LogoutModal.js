import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Styles/LogoutModal.css";

function LogoutModal({ isOpen, onClose, onLogout }) {
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  if (!isOpen) return null;

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    setShowLoginMessage(true);
    window.location.href = "http://localhost:3000";
  };

  const handleLogin = () => {
    // Redirect to the login page
    window.location.href = "/Login";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          <button className="close" onClick={onClose}>
            Close
          </button>
        </div>
        {showLoginMessage && (
          <div>
            <p>You must login to see the posts.</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
