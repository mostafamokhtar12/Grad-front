import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import myStyle from "./Register.module.css";
import { Link } from "react-router-dom";
import sora from "../../assets/images/Portal logo.png";
import sora2 from "../../assets/images/Union.png";

export default function Register() {
  let [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function Registerapi(values) {
    setLoading(true);
    let req = await axios
      .post("https://761h6v0q-3000.uks1.devtunnels.ms/auth/signup", values)
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
    console.log(values);
    console.log(req);
    setLoading(false);
    nav("/login");
  }

  let validateScheme = Yup.object({
    firstName: Yup.string().required("First name is required").min(2),
    lastName: Yup.string().required("Last name is required").min(2),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Confirmation password doesn't match the password"
      )
      .required("Confirmation Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: Registerapi,
  });

  return (
    <>
      <div className=" row">
        <div className=" col-8 d-flex align-items-center justify-content-center vh-100">
          <div className=" w-75">
            <h2 className=" fw-bold text-center">Create an account...</h2>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  name="firstName"
                  className=" form-control mt-1"
                  type="text"
                  value={formik.values.firstName}
                  id="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className=" text-danger">{formik.errors.firstName}</p>
                ) : (
                  ""
                )}

                <label htmlFor="lastName">Last Name:</label>
                <input
                  name="lastName"
                  className=" form-control mt-1"
                  type="text"
                  value={formik.values.lastName}
                  id="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className=" text-danger">{formik.errors.lastName}</p>
                ) : (
                  ""
                )}

                <label htmlFor="email">email:</label>
                <input
                  name="email"
                  className=" form-control mt-1"
                  type="email"
                  value={formik.values.email}
                  id="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-danger">{formik.errors.email}</p>
                ) : (
                  ""
                )}

                <label htmlFor="password">Password:</label>
                <input
                  name="password"
                  className=" form-control mt-1"
                  type="password"
                  value={formik.values.password}
                  id="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.errors.password && formik.touched.password ? (
                  <p className=" text-danger">{formik.errors.password}</p>
                ) : (
                  ""
                )}

                <label htmlFor="confirmPassword">confirmPassword:</label>
                <input
                  name="confirmPassword"
                  className=" form-control mt-1"
                  type="password"
                  value={formik.values.confirmPassword}
                  id="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <p className=" text-danger">
                    {formik.errors.confirmPassword}
                  </p>
                ) : (
                  ""
                )}

                {loading ? (
                  <button
                    type="button"
                    className={`${myStyle.btnMain} w-100 btn text-white my-2`}
                  >
                    <i className=" fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    className={`${myStyle.btnMain} w-100 btn my-2`}
                  >
                    Register
                  </button>
                )}
              </form>
            </div>

            <p>
              Already have an account?{" "}
              <Link className={`${myStyle.decorationLink}`} to={"/login"}>
                Login
              </Link>
            </p>

            <div class="d-flex align-items-center my-3">
              <hr class="flex-grow-1 me-2"></hr>
              <span class="fw-bold fs-4">Or</span>
              <hr class="flex-grow-1 ms-2"></hr>
            </div>

            <div className=" container d-flex justify-content-center flex-wrap">
              <button className="btn mx-2 w-25 border-black">
                <i class="fa-brands fa-facebook mx-2"></i>
                Login with Facebook
              </button>
              <button className="btn w-25 border-black">
                <i class="fa-brands fa-square-x-twitter mx-2"></i>
                Login with X
              </button>
              <button className="btn w-50 my-2 border-black">
                <i class="fa-brands fa-google mx-2"></i>
                Login with google
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${myStyle.bgMain} px-0 col-4 vh-100 rounded-start-5 position-relative`}
        >
          <div className=" mt-3 d-flex flex-wrap align-items-center justify-content-center">
            <h1 className={`${myStyle.myFont} w-50 h4 text-white`}>
              Interview Coach
            </h1>
            <img src={sora} className={`${myStyle.logo}`}></img>
          </div>

          <div className=" d-flex justify-content-center align-items-end position-absolute bottom-0">
            <img src={sora2}></img>
          </div>
        </div>
      </div>
    </>
  );
}
