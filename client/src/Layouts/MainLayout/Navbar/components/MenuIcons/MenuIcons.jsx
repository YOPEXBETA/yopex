import React, { useState } from "react";
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
      <div className="flex gap-2 items-center">
        <AddPostMenuList />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <div className="flex">
          <Chat />
          {user.role === "user" ? <NotificationBell2 /> : <NotificationBell />}
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default MenuIcons;
