import React from "react";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import ProfileMenu from "./components/ProfileMenu";
import NotificationBell2 from "./components/NotificationCompany";
import Chat from "./components/Chat";
import AddPostMenuList from "./components/AddPost/AddPostMenuList";
import NotificationBell from "./components/Notifications/Notification";
import { useSelector } from "react-redux";

const MenuIcons = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Box sx={{ display: { xs: "flex", sm: "flex", alignItems: "center" } }}>
        <AddPostMenuList />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Chat />
        {user.role === "user" ? <NotificationBell2 /> : <NotificationBell />}
        <ProfileMenu />
      </Box>
    </div>
  );
};

export default MenuIcons;
