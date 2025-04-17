import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Portal logo.png";
import { Link, NavLink } from "react-router-dom";
import interviewSora from "../../assets/images/interview_image.png";
import cvSora from "../../assets/images/cv_image.png";
import rateSora from "../../assets/images/ellipse.png";
import myStyle from './Home.module.css'


function Home() {
  const [homeData, setHomeData] = useState({});
  const { firstName, lastName, interviewsCount } = homeData;
  useEffect(function () {
    async function FetchUserData() {
      try {
        const res = await fetch("http://localhost:8080/home", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setHomeData(data);
      } catch (err) {
        console.log("error occured", err);
      }
    }

    FetchUserData();
  }, []);
  return (
    <>
      <div className={`${myStyle.backGround}`}>
        <nav className={`navbar ${myStyle.bgColor} navbar-expand-lg w-75 m-auto rounded-3 my-3`}>
          <div className="container">
            <img src={logo} className={`${myStyle.logoImage}`} alt="Logo" />

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <NavLink
                    to="/interview/history"
                    className={`nav-link text-white ${myStyle.myFont} fs-5`}

                  >
                    History
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={`nav-link text-white ${myStyle.myFont} fs-5`}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={`nav-link text-white ${myStyle.myFont} fs-5`}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className={`row w-75 ${myStyle.bgColor} m-auto mb-3 rounded-3`}>
          <div className=" col-9 d-flex">
            <div className="row align-content-around">
              <div className=" col-6">
                <h6 className="h4 text-white">Interview Entered</h6>
                <h6 className="h4 text-white">{interviewsCount}</h6>
              </div>
              <div className=" col-6">
                <h6 className="h4 text-white">Interviewing Minutes spent</h6>
              </div>
              <hr className=" border-4 text-white"></hr>
              <div className=" col-6">
                <h6 className="h4 text-white">CVS Generated</h6>
              </div>
              <div className=" col-6">
                <h6 className="h4 text-white">Answers accuracy</h6>
              </div>
            </div>
          </div>

          <div className=" col-3">
            <img src={rateSora} className="w-50" />
            <h3>{`${firstName} ${lastName}`}</h3>
          </div>
        </div>

        <Link
          className={`h-25 w-75 d-block m-auto btn ${myStyle.bgColor} mb-3`}
          to={"/preinterview"}
        >
          <div className={`${myStyle.imageContainer} d-flex justify-content-between`}>
            <h2 className=" text-white w-75 align-content-center">
              Elevate your interviewing skills with our AI mock interview.
            </h2>
            <img src={interviewSora} className="w-25" alt="" />
          </div>
        </Link>

        <Link className={`w-75 d-block m-auto btn ${myStyle.bgColor} mb-3`} to={"/cv"}>
          <div className={`${myStyle.imageContainer} d-flex justify-content-between`}>
            <img src={cvSora} className="w-25" alt="" />
            <h2 className=" text-white w-75 align-content-center">
              Still struggling to create a proper CV? Use our expertly crafted templates to make a lasting impression.
            </h2>
          </div>
        </Link>
      </div>

    </>
  );
}

export default Home;
