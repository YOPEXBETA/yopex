import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useConversations } from "../../../hooks/react-query/useConversations";
import Conversation from "./components/Conversation";
import UsersMsgs from "./components/UsersMsgs";
import useSocket from "../../../hooks/useSocket";

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
  const navigate = useNavigate();

  const socket = useSocket();
  

  useEffect(() => {
    if (!conversations) return;
    else{
      
      const conn = conversations.find((item) => item.conversationId === selectedConversationId);
      
      if (!conn) navigate("/chat");
      else {
        if (conn.members[0].role === "company") {
          setOtherUser(conn.members[1]);
        }else{
          setOtherUser(conn.members[0]);
        }
      }
      console.log(otherUser);
    }
  }, [selectedConversationId,conversations]);

  
  socket.emit("addUser", {id:user._id,roomid:selectedConversationId});
  
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
