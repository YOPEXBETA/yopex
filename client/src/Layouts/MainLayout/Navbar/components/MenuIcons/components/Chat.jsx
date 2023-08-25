import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isLoading)
    return (
      <div className="relative">
        <div className="relative">
          <div className="absolute top-0 right-0">
            <button
              onClick={handleClick}
              className="flex items-center justify-center rounded-full  w-8 h-8 text-gray-600"
            >
              <ChatIcon />
            </button>
          </div>
          <div className="w-8 h-8">
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 text-white text-[10px] flex items-center justify-center">
              {conversations?.length}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute z-10 right-0 mt-2 bg-white shadow-lg rounded-lg min-w-[380px] max-w-[380px] overflow-visible">
            <ul>
              <li>
                <div className="p-4">
                  <h4 className="text-xl font-bold">Chats</h4>
                </div>
                <hr className="border-t border-gray-200" />
              </li>
              {conversations?.map((conversation) => {
                const otherUser = conversation.members.find(
                  (member) => member.id !== user._id
                );

                if (!otherUser) return null;
                const createdAt = new Date(otherUser.createdAt);
                if (!isValid(createdAt)) return null;

                return (
                  <div key={conversation.conversationId}>
                    <li>
                      <Link
                        to={`/chat/${conversation.conversationId}`}
                        className="flex items-center p-4 space-x-4 hover:bg-gray-100"
                      >
                        <img
                          src={otherUser.picturePath}
                          className="bg-green-500 rounded-full w-11 h-11"
                        />

                        <div className="flex-grow">
                          <h6 className="text-md font-semibold">
                            {otherUser.firstname} {otherUser.lastname}
                          </h6>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <div className="truncate max-w-[190px]">
                              {otherUser.latestMessage}
                            </div>
                            <span>.</span>
                            <span>
                              {formatDistance(createdAt, new Date(), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <hr className="border-t border-gray-200" />
                  </div>
                );
              })}
              <li>
                <Link
                  to="/chat"
                  className="block p-4 text-center hover:bg-gray-100"
                >
                  <p className="text-green-500">View all in Chat</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
};

export default Chat;
