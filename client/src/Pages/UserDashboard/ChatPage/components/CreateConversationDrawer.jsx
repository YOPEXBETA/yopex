import AddIcon from "@mui/icons-material/Add";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";
import {
  useSuggestedUsers,
  useUsers,
} from "../../../../hooks/react-query/useUsers";

export default function CreateConversationDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { mutate } = useCreateConversation(user._id);
  const { data: users } = useSuggestedUsers();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleTextFieldClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleUserClick = (otherUser) => {
    if (otherUser.companyName) {
      mutate({
        senderId: user._id,
        receiverId: otherUser.user,
        company: otherUser._id,
      });
    }
    mutate({ senderId: user._id, receiverId: otherUser._id });
    setState({ ...state, left: false });
  };

  const list = (anchor) => (
    <div className="w-80" role="presentation">
      <ul className="list-none">
        <li>
          <input
            type="text"
            className="w-full"
            onClick={handleTextFieldClick}
          />
        </li>

        {users?.map((user) => (
          <li key={user._id} className="px-8 py-4 hover:bg-gray-100">
            <button
              className="flex items-center w-full"
              onClick={() => handleUserClick(user)}
            >
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12">
                  <img
                    src={user.companyName ? user.companyLogo : user.picturePath}
                    alt="User Avatar"
                    className="w-full h-full rounded-full bg-green-500"
                  />
                </div>
                <div className="flex flex-col">
                  {user.companyName ? (
                    <h6 className="text-[1rem]">{user.companyName}</h6>
                  ) : (
                    <div className="flex gap-1">
                      <h6 className="text-[1rem]">{user.firstname}</h6>
                      <h6 className="text-[1rem]">{user.lastname}</h6>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <button
        onClick={toggleDrawer("left", true)}
        style={{ pointerEvents: state.left ? "none" : "auto" }}
      >
        <AddIcon label="Open Left Sidebar" variant="outlined" />
      </button>

      <SwipeableDrawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
