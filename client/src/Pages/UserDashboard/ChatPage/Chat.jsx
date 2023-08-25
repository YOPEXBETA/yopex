import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useConversations } from "../../../hooks/react-query/useConversations";
import Conversation from "./components/Conversation";
import UsersMsgs from "./components/UsersMsgs";
import useSocket from "../../../hooks/useSocket";

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: conversations } = useConversations(user._id);
  const { selectedConversationId } = useParams();
  const [otherUser, setOtherUser] = useState({});
  const navigate = useNavigate();

  const socket = useSocket();

  useEffect(() => {
    if (!conversations) return;
    else {
      const conn = conversations.find(
        (item) => item.conversationId === selectedConversationId
      );

      if (!conn) navigate("/chat");
      else {
        if (conn.members[0].role === "company") {
          setOtherUser(conn.members[1]);
        } else {
          setOtherUser(conn.members[0]);
        }
      }
      console.log(otherUser);
    }
  }, [selectedConversationId, conversations]);

  socket.emit("addUser", { id: user._id, roomid: selectedConversationId });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 ">
      <div className="col-span-1 border-r border-gray-300">
        <div className="mb-4">
          <UsersMsgs />
        </div>
      </div>

      <div className="col-span-1 md:col-span-3">
        <Conversation
          conversationId={selectedConversationId}
          socket={socket}
          otherUser={otherUser}
        />
      </div>
    </div>
  );
};

export default Chat;
