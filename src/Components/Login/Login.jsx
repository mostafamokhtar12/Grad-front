import React, { useState } from "react";
import sora from "../../assets/images/Portal logo.png";
import sora2 from "../../assets/images/Union.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import myStyle from "./Login.module.css";

axios.defaults.withCredentials = true;

export default function Login() {
  let [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function Loginapi(values) {
    setLoading(true);

    let req = await axios
      .post("http://localhost:8080/auth/login", values)
      .catch((error) => {
        console.log(error);

        console.log(error.response.data.message);
        setLoading(false);
      });

    console.log(req);
    console.log(values);
    setLoading(false);
    nav("/home");
  }

  let validateScheme = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: Loginapi,
  });

  return (
    <>
      <div className=" row">
        <div className=" col-8 d-flex align-items-center justify-content-center vh-100">
          <div className=" w-75">
            <h2 className=" fw-bold text-center">Login to your account..</h2>
            <p className="text-center">
              “Own the conversation. Decode every question. Elevate your
              journey.”
            </p>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                  name="email"
                  className=" my-1 form-control"
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

                <label htmlFor="password">password:</label>
                <input
                  name="password"
                  className=" form-control my-1"
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
                    Login
                  </button>
                )}
              </form>
            </div>

            <p>
              Don't have an account?{" "}
              <Link className={`${myStyle.decorationLink}`} to={"/signup"}>
                Sign up
              </Link>
            </p>
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
