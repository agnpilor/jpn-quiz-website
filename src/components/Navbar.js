import React from "react";
import logo from "../images/logo.png";
import "../styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = ({isActive}) => {
    return isActive ? "nav-active" : null
  };

  return (
<header className="navbar">
  <div className="navbar-left">
<Link to="/">
        <img
          className="logo"
          src={logo}
          alt="Kuizu logo"
          title="Kuizu Logo | Home"
        />
      </Link>
      </div>
      <div className="navbar-right">
      <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/quizzes' activeStyle>
            Quizzes
          </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/resources' activeStyle>
            Resources
          </NavLink>
          </div>
  </header>
  );
};

export default Navbar;