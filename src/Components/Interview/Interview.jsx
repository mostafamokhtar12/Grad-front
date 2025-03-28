import React from "react";
import "./interview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Interview() {
  return (
    <div className="interview-page">
      <p className="site-name">Interview Coach</p>
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} className="Home-logo-second" />
      </Link>
      <div className="interview-container">
        <div className="Answer-Section">
          <FontAwesomeIcon icon={faMicrophone} className="Mic-logo" />
        </div>
      </div>
    </div>
  );
}
