import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CustomNavbar from "./Navbar/CustomNavbar";

//render the data under the navbar
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  return (
    <div className="">
      <CustomNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
