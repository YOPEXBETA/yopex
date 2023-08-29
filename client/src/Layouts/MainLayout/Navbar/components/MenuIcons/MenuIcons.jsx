import React from "react";
import ProfileMenu from "./components/ProfileMenu";
import Chat from "./components/Chat";
import AddPostMenuList from "./components/AddPost/AddPostMenuList";
import NotificationBell from "./components/Notifications/Notification";

const MenuIcons = () => {
  //const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <AddPostMenuList />
        <div className="h-6 my-0.5 border-l border-gray-300" />

        <div className="flex">
          <Chat />
          <NotificationBell />
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default MenuIcons;
