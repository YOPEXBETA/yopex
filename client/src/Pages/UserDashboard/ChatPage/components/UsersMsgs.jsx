import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useConversations } from "../../../../hooks/react-query/useConversations";
import CreateConversationDrawer from "./CreateConversationDrawer";
import SearchUsers from "./SearchUsers";

const UsersMsgs = ({ onConversationSelect }) => {
  const { user } = useSelector((state) => state?.auth);
  const { data: conversations } = useConversations(user?._id);
  return (
    <div>
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-green-600 text-white">
        <h1 className="text-2xl font-semibold">Chat</h1>
        <div className="relative">
          <CreateConversationDrawer />
        </div>
      </header>
      <div className="h-screen overflow-y-auto pb-24">
        {conversations?.map((conversation) => {
          const otherUser = conversation?.members?.find(
            (member) => member?.id !== user?._id
          );
          if (otherUser) {
            return (
              <div key={conversation?.conversationId}>
                <Link
                  to={`/chat/${conversation?.conversationId}`}
                  className=" hover:bg-gray-100 dark:hover:bg-green-600 p-4
                sm :p-2 flex flex-col gap-2 w-full"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={otherUser?.picturePath}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div>
                        <div className=" flex flex-row gap-1">
                          <p className="font-semibold dark:text-gray-200">
                            {otherUser?.firstname}
                          </p>
                          <p className="font-semibold dark:text-gray-200">
                            {otherUser?.lastname}
                            {otherUser?.companyName
                              ? `(${otherUser?.companyName})`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[0.8rem] dark:text-gray-200 truncate max-w-[250px] text-gray-500">
                          {otherUser?.latestMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="w-full border-l border-gray-100 border-b-2" />
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};
export default UsersMsgs;
