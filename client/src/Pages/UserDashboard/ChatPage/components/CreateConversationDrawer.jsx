import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";
import { useSuggestedUsers, useUserById } from "../../../../hooks/react-query/useUsers";

export default function CreateConversationDrawer() {
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useCreateConversation(user._id);
  let { data: users } = useSuggestedUsers();
  const { data: userProfile} = useUserById(user._id);
  const [selectedOption, setSelectedOption] = useState(user._id);
  const [filteredUsers, setFilteredUsers] = useState(users);

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
  useEffect(() => {
    if (selectedOption !== user._id && users) {
      const filtered = users?.filter((user) => user.role === "user");
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [selectedOption, users]);
  

  const handleUserClick = (otherUser) => {
    if (otherUser.companyName){
      mutate({ senderId: user._id, receiverId: otherUser.user,company:otherUser._id });
    }
    else if (selectedOption !== user._id) {
      mutate({ senderId: otherUser._id, receiverId: user._id , company:selectedOption });
    }else{
      mutate({ senderId: user._id, receiverId: otherUser._id });
    }
    setState({ ...state, left: false });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
    >
      <List>
        <ListItem>
          <TextField fullWidth onClick={handleTextFieldClick} />
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
          <ListItemButton key={user._id} onClick={() => handleUserClick(user)} >
            <ListItem
              key={user.id}
              alignItems="flex-start"
              sx={{ alignItems: "center" }}
            >
              <ListItemAvatar>
                <Avatar src={user.companyName?user.companyLogo:user.picturePath} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack flexDirection={"row"} columnGap={"0.2rem"}>{
                    user.companyName?
                    (
                      <Typography variant="h6">{user.companyName}</Typography>
                    ):(
                      <div>
                        <Typography variant="h6">{user.firstname}</Typography>
                        <Typography variant="h6">{user.lastname}</Typography>
                      </div>
                      
                    )
                  }
                    
                  </Stack>
                }
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("left", true)}
        style={{ pointerEvents: state.left ? "none" : "auto" }}
      >
        <AddIcon label="Open Left Sidebar" variant="outlined" />
      </IconButton>
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
