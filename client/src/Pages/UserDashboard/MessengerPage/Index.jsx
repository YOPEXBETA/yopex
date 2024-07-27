import React, { useEffect, useState } from "react";
import ChatConversations from "./components/ChatConversations";
import UsersLatestMsgs from "./components/UsersLatestMsgs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConversations,
  useGetConversationById,
} from "../../../hooks/react-query/useConversations";
import useSocket from "../../../hooks/useSocket";

const Messenger = () => {
  const { user } = useSelector((state) => state?.auth);
  const { data: conversations } = useConversations(user?._id);
  const { selectedConversationId } = useParams();
  const [otherUser, setOtherUser] = useState({});
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    if (selectedConversationId === undefined && conversations?.length > 0) {
      navigate(`/chat/${conversations[0]?.conversationId}`);
    }
  }, [selectedConversationId, conversations]);
  const { data: currentConversation } = useGetConversationById(
    selectedConversationId
  );

  useEffect(() => {
    if (!currentConversation) return;
    else {
      if (
        !currentConversation?.company ||
        currentConversation?.company.user === user?._id
      ) {
        setOtherUser(currentConversation?.members[0]);
      } else {
        setOtherUser(currentConversation?.company);
      }
    }
  }, [currentConversation]);
  const socket = useSocket();

  socket.emit("joinRoom", { id: user?._id, roomid: selectedConversationId });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div class="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        <div class="relative flex-col hidden w-[24rem] px-6 pt-1 h-full bg-white dark:bg-zinc-800 dark:text-white border-r border-gray-100 shadow-xl md:block transform transition-all duration-500 ease-in-out">
          <UsersLatestMsgs />
        </div>

        <div class="relative flex flex-col flex-1">
          <ChatConversations
            conversationId={selectedConversationId}
            socket={socket}
            otherUser={otherUser}
          />
        </div>

        {/* <nav class="right-0 lg:flex flex-col w-[24rem] hidden pb-2 bg-white dark:bg-zinc-800 border-l border-gray-300 xl:block">
          <UserChatInfo otherUser={otherUser} />
  </nav>*/}
      </div>
    </div>
  );
};

export default Messenger;
