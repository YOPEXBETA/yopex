import { Divider, List } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useConversations } from "../../../../hooks/react-query/useConversations";
import CreateConversationDrawer from "./CreateConversationDrawer";
const UsersMsgs = ({ onConversationSelect }) => {
  const { user } = useSelector((state) => state.auth);
  const { data: conversations } = useConversations(user._id);

  return (
    <div
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: "100%",
        overflow: "auto",
      }}
    >
      <div sx={{ height: "100vh" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            height: "calc(100vh - 64px)",
            overflow: "auto",
          }}
          subheader={<li />}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Chats</Typography>
            <CreateConversationDrawer />
          </ListItem>
          {conversations?.map((conversation) => {
            const otherUser = conversation?.members.find(
              (member) => member.id !== user._id
            );
            if (otherUser) {
              return (
                <React.Fragment key={conversation.conversationId}>
                  <ListItemButton
                    to={`/chat/${conversation.conversationId}`}
                    component={Link}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={otherUser?.picturePath} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack flexDirection={"row"} columnGap={"0.2rem"}>
                            <Typography variant="h6">
                              {otherUser.firstname}
                            </Typography>
                            <Typography variant="h6">
                              {otherUser.lastname}
                            </Typography>
                          </Stack>
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
                              ></Typography>
                            </Stack>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            } else return null;
          })}
        </List>
      </div>
    </div>
  );
};
export default UsersMsgs;
