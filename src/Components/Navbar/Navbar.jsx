import React from "react";
import { Link } from "react-router-dom";
import Portalss from "../../assets/Portalss.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="bar">
      <img src={Portalss} alt="Logo-photo" className="logo" />
      <Link to="/about">ABOUT</Link>
      <Link to="/cv-generation">CV GENERATION</Link>
      <Link to="/Profile">PROFILE</Link>
      <Link to="/home">HOME</Link>
    </div>
  );
};

export default Navbar;
