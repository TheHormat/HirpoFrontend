import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/hirpo_white_logo.png";
import "./navbar.css";
import UserDropdown from "./UserDropdown";
const handleLogout = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/wizard/logout", {
      method: "POST",
    });
    if (response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.reload();
    } else {
      <p>kdjks</p>;
    }
  } catch (error) {
    console.error(error);
  }
};


function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav>
      <div className="topbar">
        <Link to="/dashboard">
          <div className="logo-team">
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="logo-text">
              <p>Hirpo</p>
            </div>
          </div>
        </Link>
        <div className="right-topbar">
          {/* <div className="search">
            <input type="text" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div> */}
          <ul className="notifications">
            <li>
              <Link to="/">Hirpo</Link>
            </li>
            <li>
              <Link to="/">Pricing & Bills</Link>
            </li>
            <li className="notification-icon">
              <UserDropdown
                showDropdown={showDropdown}
                setShowDropdown={() => setShowDropdown(!showDropdown)}
              />
            </li>
            <li className="notification-icon">
              <i className="fa-solid fa-bell"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
