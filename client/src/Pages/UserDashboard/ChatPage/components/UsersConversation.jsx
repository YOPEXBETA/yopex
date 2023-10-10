import SendIcon from "@mui/icons-material/Send";
import { formatDistance } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateMessage,
  useMessages,
} from "../../../../hooks/react-query/useConversations";

const UsersConversation = ({ conversationId, socket, otherUser }) => {
  const chatContainerRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { data: messages } = useMessages(conversationId);
  const { mutate } = useCreateMessage(conversationId);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);

  if (chatContainerRef.current !== null)
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

  useEffect(() => {
    setArrivalMessage(messages);
  }, [messages]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage((prev) => [...prev, data]);
    });

    return () => {
      socket.off("getMessage"); // This will remove the listener when the component unmounts or before the effect runs again
    };
  }, [socket]);

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    const { id: receiverId } = otherUser;

    socket.emit("sendMessage", {
      sender: {
        _id: user._id,
        firstname: user.firstname,
        picturePath: otherUser.companyLogo
          ? otherUser.companyLogo
          : user.picturePath,
      },
      conversationId,
      receiverId,
      message,
      createdAt: new Date(),
    });

    mutate({ message, sender: user._id });
    setMessage("");
  };
  return (
    <div className="flex-1 pt-4  justify-between flex flex-col h-[80vh] lg:h-full">
      <div className="flex sm:items-center justify-between pb-3 border-b-2 border-gray-200 px-4">
        <div className="relative flex items-center justify-between space-x-4">
          <img
            src={otherUser.picturePath}
            alt=""
            className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
          />
          <div className="text-lg mt-1 flex items-center font-bold">
            <span className="mr-3">
              {otherUser.firstname} {otherUser.lastname}
            </span>
          </div>
        </div>
      </div>

      <div
        id="messages"
        ref={chatContainerRef}
        className="flex flex-col space-y-4 lg:p-3 p-0 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-80  w-full px-4 overflow-auto lg:overflow-auto"
      >
        {arrivalMessage?.length === 0 ? (
          <div>
            <p className="opacity-50 text-xl">
              Open a conversation to start a chat
            </p>
          </div>
        ) : (
          <div className="h-full">
            {arrivalMessage?.map((message, index) => {
              return (
                <div key={index} className="px-11 py-6">
                  <div className="grid ">
                    <div className="col-span-12">
                      {message.sender._id === user._id ? (
                        <div className="text-right">
                          <p>{message.message}</p>
                          <p className="text-gray-500 text-[0.75rem]">
                            {formatDistance(
                              new Date(message.createdAt),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2 items-center">
                            {message.sender.picturePath && (
                              <img
                                alt="image"
                                className="h-11 w-11 rounded-full bg-green-500"
                                src={
                                  message.sender.companyLogo
                                    ? message.sender.companyLogo
                                    : message.sender.picturePath
                                }
                              />
                            )}
                            <div>
                              <p>{message.message}</p>
                              <p className="text-gray-500 text-[0.75rem]">
                                {formatDistance(
                                  new Date(message.createdAt),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-10 sm:mb-0">
        <form className="relative flex" onSubmit={handleCreateMessage}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="submit"
              onClick={handleCreateMessage}
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-green-500 hover:bg-purple-500 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersConversation;