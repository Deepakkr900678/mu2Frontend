import React from 'react'
import { NavLink } from "react-router-dom";
import './MainNavbar.css'; // Import the CSS file
import logo from "../../Components/NavBar/logo.png"
const MainNavbar = () => {
  return (
    <nav className="navbar" style={{position: 'fixed', width: '100vw',zIndex:"2",background:"#de5c74" }}>
      <div className="navbar-logo">
      <div className="flex justify-center items-center p-2 flex-shrink-0">
        <img src={logo} alt="logo" width={140} height={40} />
      </div>
      </div>

      {/* Menu Links */}
      <div className="navbar-links">
        <NavLink
          to="/approval"
          className={({ isActive }) =>
            isActive
              ? "navlink navlink-active"
              : "navlink"
          }
        >
          In/Out
        </NavLink>
        <NavLink
          to="/mess"
          className={({ isActive }) =>
            isActive
              ? "navlink navlink-active"
              : "navlink"
          }
        >
          Mess
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "navlink navlink-active"
              : "navlink"
          }
        >
          Dashboard
        </NavLink>
      </div>

      {/* Avatar */}
      <div className="navbar-avatar">
        <span className="avatar-name">John Doe</span>
        <img
          src="https://via.placeholder.com/40"
          alt="avatar"
          className="avatar-image"
        />
      </div>
    </nav>
  )
}

export default MainNavbar;
