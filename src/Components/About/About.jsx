import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Portalss from "../../assets/Portalss.png";
import "./About.css";
import { Link } from "react-router-dom";

export default function About() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove("loaded");
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 500);
  }, [location]);

  return (
    <div className="Container">
      <div className="bar">
        <img src={Portalss} alt="Logo-photo" className="logo" />

        <Link to="/Preinterview">MOCK INTERVIEW</Link>
        <Link to="/cv-generation">CV GENERATION</Link>
        <Link to="/Profile">PROFILE</Link>
        <Link to="/Home">HOME</Link>
      </div>
      <div className="question">
        <p>Who Are We?</p>
      </div>
      <div className="Answer">
        <p className="ANS">
          As 4th-year computer science students, we understand how challenging
          the job application process can be. We've been in your shoes,
          navigating the complexities of crafting the perfect CV and preparing
          for mock interviews. That’s why we’ve developed this platform—to
          simplify the tasks and make the job application process more efficient
          and personalized for you. We’ve faced the same difficulties, and now
          we want to help you overcome them with ease.
        </p>
      </div>
    </div>
  );
}
