import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AdminDrawer from "./Drawer/AdminDrawer";
import AdminNavbar from "./Navbar/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <Box sx={{ display: "flex", width: "100%" }}>
        <AdminDrawer />
        <Box
          component="main"
          sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          {children}
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
