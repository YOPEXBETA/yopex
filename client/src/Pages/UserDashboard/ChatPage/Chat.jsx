import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useConversations } from "../../../hooks/react-query/useConversations";
import UsersMsgs from "./components/UsersMsgs";
import useSocket from "../../../hooks/useSocket";
import UserMsgsSideBar from "../../../Components/Mobile/UserMsgsSideBar";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the icons
import UsersConversation from "./components/UsersConversation";

const Chat = () => {
  const { user } = useSelector((state) => state?.auth);
  const { data: conversations } = useConversations(user?._id);
  const { selectedConversationId } = useParams();
  const [otherUser, setOtherUser] = useState({});
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!conversations) return;
    else {
      const conn = conversations.find(
        (item) => item?.conversationId === selectedConversationId
      );

      if (!conn) ;
      else {
        if (conn?.members[0]?.role === "company") {
          setOtherUser(conn?.members[1]);
        } else {
          setOtherUser(conn?.members[0]);
        }
      }
    }
  }, [selectedConversationId, conversations]);
  const socket = useSocket();

  socket.emit("joinRoom", { id: user?._id, roomid: selectedConversationId });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="lg:grid lg:grid-cols-4 sm:grid sm:grid-cols-1  overflow-hidden h-[100vh]">
      <div className="hidden col-span-1 sm:col-span-1 border-r bg-white border-gray-300 lg:block dark:bg-zinc-800">
        <UsersMsgs />
      </div>
      <div className="bg-white dark:bg-zinc-800  w-full relative lg:hidden md:hidden border-b-2 py-4">
        <div className="border-gray-300  lg:hidden md:hidden pl-6 l">
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? (
              <FaTimes className="dark:text-gray-200" />
            ) : (
              <FaBars className="dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar 
      <UserMsgsSideBar isOpen={isSidebarOpen} />*/}
      <div className="block dark:bg-zinc-800 lg:h-full  lg:col-span-3  mb-8">
        <UsersConversation
          conversationId={selectedConversationId}
          socket={socket}
          otherUser={otherUser}
        />
      </div>
    </div>
  );
};

export default Chat;
