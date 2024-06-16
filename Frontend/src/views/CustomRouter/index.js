import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "../../components/AuthRoute";
import AutoRedirectRoute from "../../components/AutoRedirectRoute";
import CustomFooter from "../../components/CustomFooter";
import CustomNavbar from "../../components/CustomNavbar";
import Admin from "../Admin";
import Judge from "../Judge";
import LandingPage from "../LandingPage";
import Panelist from "../Panelist";
import Participants from "../Participant";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const CustomRouter = () => {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/home" />} />

        <Route element={<AutoRedirectRoute />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        <Route element={<AuthRoute allowedRoles={["PARTICIPANT"]} />}>
          <Route path="/participant" element={<Participants />} />
        </Route>

        <Route element={<AuthRoute allowedRoles={["PANELIST"]} />}>
          <Route path="/panelist" element={<Panelist />} />
        </Route>

        <Route element={<AuthRoute allowedRoles={["JUDGE"]} />}>
          <Route path="/judge" element={<Judge />} />
        </Route>

        <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
       <CustomFooter/>
    </BrowserRouter>
  );
};

export default CustomRouter;
