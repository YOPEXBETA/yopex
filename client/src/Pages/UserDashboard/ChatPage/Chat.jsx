import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useConversations } from "../../../hooks/react-query/useConversations";
import Conversation from "./components/Conversation";
import UsersMsgs from "./components/UsersMsgs";

const useStyles = makeStyles({
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

const Chat = () => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const { data: conversations } = useConversations(user._id);
  const { selectedConversationId } = useParams();

  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    if (!conversations) return;
    setOtherUser(conversations.find((item) => item._id !== user._id));
  }, [conversations, user._id]);

  const socket = io.connect("localhost:8900");

  return (
    <div>
      <Grid container component={Paper}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Grid item xs={12}>
            <UsersMsgs />
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Conversation
            conversationId={selectedConversationId}
            socket={socket}
            otherUser={otherUser}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
