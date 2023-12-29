import AddIcon from "@mui/icons-material/Add";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";
import { useSearchUsers, useSetquery, useSuggestedUsers, useUserById } from "../../../../hooks/react-query/useUsers";
import { ListItem } from "@mui/material";

export default function CreateConversationDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { mutate } = useCreateConversation(user._id);
  let { data: users } = useSearchUsers();
  const { data: userProfile} = useUserById(user._id);
  const [selectedOption, setSelectedOption] = useState(user._id);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [query, setQuery] = useState("");
  const { mutate:search, isSuccess } = useSetquery();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleSearchUsers = (event) => {
    setQuery(event.target.value);
    search(event.target.value);
  };


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

  
  useEffect(() => {
    
    if (selectedOption !== user._id && users) {
      const filtered = users?.filter((user) => user.role === "user");
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
    
  }, [selectedOption, users]);
  

  const handleUserClick = (otherUser) => {
    if (otherUser.companyName) {
      mutate({
        senderId: user._id,
        receiverId: otherUser.user,
        company: otherUser._id,
      });
    }
    else if (selectedOption !== user._id) {
      mutate({ senderId: otherUser._id, receiverId: user._id , company:selectedOption });
    }else{
      mutate({ senderId: user._id, receiverId: otherUser._id });
    }
    setState({ ...state, left: false });
  };

  const list = (anchor) => (
    <div
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
    >
      <ul>
        <ListItem>
          <TextField fullWidth 
          onChange={handleSearchUsers} />
        </ListItem>
        {userProfile?.companies.length!==0 && <select
          id="selectField"
          className="block p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2 mx-5"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value={user._id}>Current User</option>
            {userProfile?.companies.map((option) => (
            <option key={option._id} value={option._id}>
              {option.companyName}
            </option>
            ))}
        </select>}

        {filteredUsers?.map((user) => (
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
        <AddIcon label="Open Left Sidebar" className="dark:text-gray-200" variant="outlined" />
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
