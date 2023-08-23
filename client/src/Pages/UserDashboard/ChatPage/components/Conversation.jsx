import SendIcon from "@mui/icons-material/Send";
import { Avatar, ListItemAvatar, Stack, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateMessage,
  useMessages,
} from "../../../../hooks/react-query/useConversations";

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    overflow: "auto",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "82vh",
    overflowY: "auto",
  },
});

const Conversation = ({ conversationId, socket, otherUser }) => {
  const classes = useStyles();
  console.log(otherUser);

  const { user } = useSelector((state) => state.auth);
  const { data: messages } = useMessages(conversationId);
  const { mutate } = useCreateMessage(conversationId);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  
  useEffect(() => {
    setArrivalMessage(messages);

  }, [messages]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage((prev) => [...prev, data]);
    });
  
    return () => {
      socket.off("getMessage"); // This will remove the listener when the component unmounts or before the effect runs again
    };
  }, [socket]);
  

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    const { id: receiverId } = otherUser;
    
    
    socket.emit("sendMessage", {
      sender: {
        _id: user._id,
        firstname: user.firstname,
        picturePath: otherUser.companyLogo? otherUser.companyLogo : user.picturePath,
      },
      conversationId,
      receiverId,
      message,
      createdAt: new Date(),
    });

    mutate({ message, sender: user._id });
    setMessage("");
  };

  return (
    <div>
      {arrivalMessage?.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40vh 0vh" }}>
          <Typography variant="h4" color={"gray"} sx={{ opacity: "50%" }}>
            Open a conversation to start a chat
          </Typography>
        </div>
      ) : (
        <List className={classes.messageArea}>
          {arrivalMessage?.map((message, index) => {
            return (
              <ListItem key={index}>
                <Grid container>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        {message.sender._id === user._id ? (
                          <ListItemText
                            align="right"
                            primary={message.message}
                            secondary={formatDistance(
                              new Date(message.createdAt),
                              new Date(),
                              { addSuffix: true }
                            )}
                          />
                        ) : (
                          <React.Fragment>
                            <Stack flexDirection={"row"} alignItems={"center"}>
                              {message.sender.picturePath && (
                                <ListItemAvatar>
                                  <Avatar src={message.sender.companyLogo?message.sender.companyLogo:message.sender.picturePath} />
                                </ListItemAvatar>
                              )}
                              <ListItemText
                                align="left"
                                primary={message.message}
                                secondary={formatDistance(
                                  new Date(message.createdAt),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              />
                            </Stack>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      )}

      <form onSubmit={handleCreateMessage}>
        <Grid
          container
          sx={{
            position: "fixed",
            bottom: 0,
            width: "75%",
            padding: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={11}>
            <TextField
              id="messageInput"
              label="Type Something"
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={(event) => handleCreateMessage(event)}
              type="submit"
            >
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Conversation;
