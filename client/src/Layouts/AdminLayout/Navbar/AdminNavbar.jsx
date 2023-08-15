import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

//import zustand
import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { useAppStore } from "../../../appStore";
import AdminMenuList from "./components/AdminMenuList";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  color: "black",
}));

const AdminNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  //function to handle button click and route to homepage
  const handleHomePageClick = () => navigate("/feed");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Stack>
          <Stack flexDirection={"row"}>
            <IconButton
              variant="contained"
              size="large"
              edge="end"
              aria-label="homepage"
              onClick={handleHomePageClick}
            >
              <ChangeCircleIcon fontSize="large" color="primary" />
            </IconButton>
            <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
              <AdminMenuList />
              <Avatar src={user.picturePath} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNavbar;
