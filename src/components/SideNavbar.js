// components/SideNavbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Styles/Navbar.css";

function SideNavbar({ loggedInUser }) {
  return (
    <nav className="side-navbar">
      <ul>
        {loggedInUser ? (
          <>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/create-post">Create Post</NavLink>
            </li>
            <li>
              <NavLink to="/change-password">Change Password</NavLink>
            </li>
            {/* Add more navigation links as needed */}
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default SideNavbar;
