import React from "react";
import UsersMsgs from "../../Pages/UserDashboard/ChatPage/components/UsersMsgs";

const UserMsgsSideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform border-l-2 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform ease-in-out duration-300 overflow-y-auto`}
    >
      <UsersMsgs />
    </div>
  );
};

export default UserMsgsSideBar;
