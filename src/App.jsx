import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Homepage/Home";
import PreInterview from "./Components/Preinterview/Preinterview";
import InterviewTest from "./Components/InterviewTest/InterviewTest";
import Interview from "./Components/Interview/Interview";
import About from "./Components/About/About";
export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "interview/:role", element: <Interview /> },
        { path: "Profile", element: <Profile /> },
        { path: "home", element: <Home /> },
        { path: "PreInterview", element: <PreInterview /> },
        { path: "signup", element: <Register /> },
        { path: "*", element: <Notfound /> },
        { path: "About", element: <About /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
