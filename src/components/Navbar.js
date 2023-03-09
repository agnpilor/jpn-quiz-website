import React from "react";
import logo from "../images/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <ul className="navbar-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/quizzes">Quizzes</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/resources">Resources</a>
            </li>
          </ul>
        </div>
        <div className="navbar-middle">
          <img src={logo} alt="Kuizu Logo" />
          {/* figure out why logo isnt centering when text/buttons is increased in size */}
        </div>
        {/* <div className="navbar-right">
          <button className="navbar-button">Login</button>
          <button className="navbar-button">Register</button>
        </div> */}
      </nav>
    </div>
  );
};

export default Navbar;
