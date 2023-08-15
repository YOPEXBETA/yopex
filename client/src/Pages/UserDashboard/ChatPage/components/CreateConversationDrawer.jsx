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
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";
import { useUsers } from "../../../../hooks/react-query/useUsers";

export default function CreateConversationDrawer() {
  const { user } = useSelector((state) => state.auth);
  const { mutate } = useCreateConversation(user._id);
  const { data: users } = useUsers();

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
    mutate({ senderId: user._id, receiverId: otherUser._id });
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

        {users?.map((user) => (
          <ListItemButton key={user._id} onClick={() => handleUserClick(user)}>
            <ListItem
              key={user.id}
              alignItems="flex-start"
              sx={{ alignItems: "center" }}
            >
              <ListItemAvatar>
                <Avatar src={user.picturePath} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack flexDirection={"row"} columnGap={"0.2rem"}>
                    <Typography variant="h6">{user.firstname}</Typography>
                    <Typography variant="h6">{user.lastname}</Typography>
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
