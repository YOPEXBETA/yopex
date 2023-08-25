import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useConversations } from "../../../../hooks/react-query/useConversations";
import CreateConversationDrawer from "./CreateConversationDrawer";

const UsersMsgs = ({ onConversationSelect }) => {
  const { user } = useSelector((state) => state.auth);
  const { data: conversations } = useConversations(user._id);
  console.log(conversations);
  return (
    <div className="w-full h-screen bg-white sticky">
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-lg font-bold">Chats</p>
        <CreateConversationDrawer />
      </div>
      <div className="w-full my-0.5 border-l border-gray-200 border-b-2" />

      {conversations?.map((conversation) => {
        const otherUser = conversation?.members.find(
          (member) => member.id !== user._id
        );
        if (otherUser) {
          return (
            <div key={conversation.conversationId}>
              <Link
                to={`/chat/${conversation.conversationId}`}
                className="block hover:bg-gray-100 p-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={otherUser?.picturePath}
                    className="h-14 w-14 rounded-full bg-green-500"
                  />
                  <div>
                    <div>
                      <div className=" flex flex-row gap-1">
                        <p className="font-semibold">{otherUser.firstname}</p>
                        <p className="font-semibold">
                          {otherUser.lastname}
                          {otherUser.companyName
                            ? `(${otherUser.companyName})`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.8rem] truncate max-w-[250px] text-gray-500">
                        {otherUser.latestMessage}
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
  );
};
export default UsersMsgs;
