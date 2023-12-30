import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useConversations, useCreateConversation } from "../../../../hooks/react-query/useConversations";
import {axios} from "../../../../axios";
import { TextField } from "@mui/material";
import { useQuery } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

const UsersMsgs = ({ }) => {
  const { user } = useSelector((state) => state?.auth);
  const { data: conversations } = useConversations(user?._id);
  const [query,setQuery] = useState("");
  const { mutate,data } = useCreateConversation(user._id);
  const { data:users } = useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/users?search=${query}`
      );
      return data;
    },
  });
  const handleUserClick = async (otherUser) => {
    if (otherUser.companyName) {
      mutate({
        senderId: user._id,
        receiverId: otherUser.user,
        company: otherUser._id,
      });
      
    }
    else {
      mutate({ senderId: user._id, receiverId: otherUser._id });
      
    }
    setQuery("");
  };
  return (
    <div>
      <header className="p-3 border-b border-gray-300 flex justify-between items-center  text-white">
      <TextField fullWidth onChange={(event)=>setQuery(event.target.value)}  />
      </header>
      <div className="h-screen overflow-y-auto pb-24">
        {query===""?conversations?.map((conversation) => {
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
        }):users?.map((user) => 
          (
            <li key={user._id} className="px-8 py-4 hover:bg-gray-100">
              <button
                className="flex items-center w-full"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12">
                    <img
                      src={user.companyName ? user.companyLogo : user.picturePath}
                      alt="User Avatar"
                      className="w-full h-full rounded-full bg-green-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    {user.companyName ? (
                      <h6 className="text-[1rem]">{user.companyName}</h6>
                    ) : (
                      <div className="flex gap-1">
                        <h6 className="text-[1rem]">{user.firstname}</h6>
                        <h6 className="text-[1rem]">{user.lastname}</h6>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          )
        )
        }
      </div>
    </div>
  );
};
export default UsersMsgs;
