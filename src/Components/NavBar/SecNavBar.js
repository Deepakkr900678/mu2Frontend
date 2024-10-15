import React, { useState, useEffect } from "react";

import Logo from "./logo.png";
import "./SecNavBar.css";
import { logout } from "../../Slices/authSlice";
import { useDispatch } from "react-redux";

const SecNavbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };

  return (
    <div>
      <header className="hello scroll">
        <a alt="logo" className="logo" href="">
          <img
            src={Logo}
            alt="Mahindra University"
            class="navbar-brand"
            width="240"
          />
        </a>
        <ul>
          <li>
            <h3 className="sec-portal">Approved Leave Tokens </h3>
          </li>

          <li>
            {/* <Link to="griev" smooth={true} duration={1000}>
              <span className="middle-main">Sign Out</span>
            </Link> */}
            <a
              className="middle1"
              style={
                ({ float: "right" },
                { fontSize: "25" },
                { border: "2px solid" })
              }
              href="/security-login"
              onClick={handleLogout}
            >
              Sign Out
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default SecNavbar;
