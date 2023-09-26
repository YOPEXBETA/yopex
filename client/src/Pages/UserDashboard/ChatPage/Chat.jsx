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
    }
  }, [selectedConversationId, conversations]);
  const socket = useSocket();

  socket.emit("joinRoom", { id: user._id, roomid: selectedConversationId });

  return (
    <div className="lg:grid lg:grid-cols-4 sm:grid sm:grid-cols-1">
      <div className="lg:col-span-1 sm:col-span-1 border-r border-gray-300">
        <div className="mb-4">
          <UsersMsgs />
        </div>
      </div>

      <div className="lg:col-span-3">
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
