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
    <div className="dark:bg-zinc-800 bg-white">
      <div className="w-full overflow-auto">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="text-lg font-bold dark:text-gray-200">Chats</p>
          <CreateConversationDrawer />
        </div>
        <div className="w-full my-0.5 border-l border-gray-200 border-b-2 overflow-y-auto" />

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
                      alt="image"
                      src={otherUser?.picturePath}
                      className="h-14 w-14 rounded-full border object-cover"
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
