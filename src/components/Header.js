import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Header.css";
import logo from "./logo.png";
import user from "./user-profile.png";
import LogoutModal from "./LogoutModal";

function Header({ toggleSideNav, loggedInUser, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserProfileHover = () => {
    setShowUserDetails(true);
  };

  const handleUserProfileLeave = () => {
    setShowUserDetails(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    handleCloseLogoutModal();
  };

  return (
    <header>
      <div className="main">
        <button className="side-nav-toggle" onClick={toggleSideNav}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Post-IT</h1>
        </div>
      </div>
      <div className="user-actions">
        <div
          className="user-profile"
          onMouseEnter={handleUserProfileHover}
          onMouseLeave={handleUserProfileLeave}
        >
          <img src={user} alt="User Profile" />
          {showUserDetails && loggedInUser && (
            <div className="user-details">
              <p>Username: {loggedInUser.username}</p>
              <p>Email: {loggedInUser.email}</p>
            </div>
          )}
          {showUserDetails && !loggedInUser && (
            <div className="no-user-details">No user logged in</div>
          )}
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            <span className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}>
              &#9662;
            </span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/preferences" onClick={toggleDropdown}>
                Preferences
              </Link>
              <span className="logout-link" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
      {showLogoutModal && (
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={handleCloseLogoutModal}
          onLogout={handleConfirmLogout} // Pass handleConfirmLogout as the onLogout prop
        />
      )}
    </header>
  );
}

export default Header;
