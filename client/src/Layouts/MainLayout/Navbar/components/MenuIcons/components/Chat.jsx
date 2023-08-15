import ChatIcon from "@mui/icons-material/Chat";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { formatDistance, isValid } from "date-fns";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
// import { getConversations } from "../../../../../../redux/actions/ConversationAction";

export const getConversations = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:8000/conversation/${userId}`,
    {
      withCredentials: true,
    }
  );

  return data;
};

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations", user._id],
    queryFn: () => getConversations(user._id),
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  if (!isLoading)
    return (
      <div>
        <React.Fragment>
          <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "profile-grow" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Badge badgeContent={conversations.length} color="primary">
                <ChatIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              disableScrollLock={true}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  minWidth: 380,
                  maxWidth: 380,
                  "& .MuiAvatar-root": {
                    width: 45,
                    height: 45,
                    mr: 1.5,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/*==============================|| Content ||==============================*/}

              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <Stack flexDirection={"row"} columnGap={1}>
                        <Typography variant="h4">Chats</Typography>
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider />
                {conversations.map((conversation) => {
                  // Find the other user in the conversation
                  const otherUser = conversation.members.find(
                    (member) => member.id !== user._id
                  );

                  if (!otherUser) return null;
                  const createdAt = new Date(otherUser.createdAt);
                  if (!isValid(createdAt)) return null;

                  return (
                    <React.Fragment key={conversation.conversationId}>
                      <ListItemButton
                        component={Link}
                        to={`/chat/${conversation.conversationId}`}
                      >
                        <ListItemAvatar>
                          <Avatar src={otherUser.picturePath} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              <Typography
                                component="span"
                                variant="h6"
                                noWrap
                                fontWeight={"bold"}
                              >
                                {otherUser.firstname} {otherUser.lastname}
                              </Typography>
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Stack
                                flexDirection={"row"}
                                columnGap={1}
                                alignItems={"flex-end"}
                              >
                                <Typography
                                  sx={{ display: "inline" }}
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                >
                                  {otherUser.latestMessage}
                                </Typography>
                                <Typography>.</Typography>
                                <Typography
                                  sx={{ display: "inline" }}
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                >
                                  {formatDistance(
                                    new Date(otherUser.createdAt),
                                    new Date(),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </Typography>
                              </Stack>
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  );
                })}
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/chat"
                    sx={{
                      textAlign: "center",
                      pb: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          <Typography
                            color="primary"
                            variant="body1"
                            sx={{
                              textDecoration: "none",
                            }}
                          >
                            View all in Chat
                          </Typography>
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Menu>
          </Box>
        </React.Fragment>
      </div>
    );
};

export default Chat;
