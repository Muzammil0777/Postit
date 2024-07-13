import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import SideNavbar from "./components/SideNavbar";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import Preferences from "./components/pages/Preferences";
import CreatePost from "./components/pages/CreatePost";
import ChangePassword from "./components/pages/ChangePassword";
import LogoutModal from "./components/LogoutModal";
import LoginMessage from "./components/LoginMessage";
import "./App.css";

const App = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
    setLoggedInUser(null); // Clear the logged-in user state
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal((prevState) => !prevState);
  };

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Header
          toggleSideNav={toggleSideNav}
          onLogoutClick={toggleLogoutModal}
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
        />
        <div className="main-content">
          <div className={`side-nav-container ${isSideNavOpen ? "open" : ""}`}>
            <SideNavbar loggedInUser={loggedInUser} />
          </div>
          <div className="page-content">
            <Routes>
              <Route
                path="/"
                element={
                  loggedInUser ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginMessage />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    setLoggedInUser={setLoggedInUser}
                    loggedInUser={loggedInUser}
                  />
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/preferences"
                element={
                  <Preferences
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                  />
                }
              />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </div>
        </div>
        <Footer />
        {showLogoutModal && (
          <LogoutModal
            isOpen={showLogoutModal}
            onClose={toggleLogoutModal}
            onLogout={handleLogout}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
