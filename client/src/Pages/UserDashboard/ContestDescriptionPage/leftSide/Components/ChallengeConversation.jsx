import SendIcon from "@mui/icons-material/Send";
import { formatDistance } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useContestMessages,
  useCreateMessage,
} from "../../../../../hooks/react-query/useConversations";
import { io } from "socket.io-client";

const ChallengeConversation = ({ conversationId, id }) => {
  const chatContainerRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { data: messages } = useContestMessages(id);
  const { mutate } = useCreateMessage(id);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [socket, setSocket] = useState(null);

  if (chatContainerRef.current !== null)
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  const url = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    const newSocket = io(`${url}`);
    setSocket(newSocket);
    newSocket.emit("joinRoom", { id: user._id, roomid: conversationId });
    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    setArrivalMessage(messages);
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessageinContest", (data) => {
      setArrivalMessage((prev) => [...prev, data]);
    });

    return () => {
      socket.off("getMessageinContest"); // This will remove the listener when the component unmounts or before the effect runs again
    };
  }, [socket]);

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    socket.emit("sendMessageinContest", {
      sender: {
        _id: user._id,
        firstname: user.firstname,
        picturePath: user.picturePath,
      },
      conversationId,
      message,
      createdAt: new Date(),
    });

    mutate({ message, sender: user._id });
    setMessage("");
  };

  return (
    <div className="lg:mb-0 md:mb-0 mb-12">
      {arrivalMessage?.length === 0 ? (
        <div
          ref={chatContainerRef}
          className="flex h-80 items-center justify-center"
        >
          <p className="opacity-50 text-xl dark:text-white">
            Open a conversation to start a chat
          </p>
        </div>
      ) : (
        <div
          id="messages"
          ref={chatContainerRef}
          className="flex flex-col space-y-4 lg:p-3 p-0 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-80  w-full px-4 overflow-auto lg:overflow-auto"
        >
          {arrivalMessage?.map((message, index) => {
            return (
              <div key={index} className="px-11 py-6">
                <div className="grid">
                  <div className="col-span-12">
                    {message.sender._id === user._id ? (
                      <div className="text-right">
                        <p className="dark:text-white">{message.message}</p>
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
                                  ? message.sender.picturePath
                                  : ""
                              }
                            />
                          )}
                          <div>
                            <p className="text-black dark:text-white">
                              {message.message}
                            </p>
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
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-full w-full">
        <form onSubmit={handleCreateMessage}>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                type="text"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChallengeConversation;
