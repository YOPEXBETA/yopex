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
  //const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <AddPostMenuList />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <div className="flex">
          <Chat />
          {/*<NotificationBell2 /> this notification supposed to be for the company but we don't work with role anymore
          so there is only on notfication component */}
          <NotificationBell />
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default MenuIcons;
