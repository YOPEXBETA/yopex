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
        _id: user?._id,
        firstname: user?.firstname,
        picturePath: otherUser?.companyLogo
          ? otherUser?.companyLogo
          : user?.picturePath,
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
    <div className="dark:bg-zinc-800">
      <div className="flex-1   justify-between flex flex-col">
        <div className="bg-white pt-4">
          <div className="flex sm:items-center justify-between pb-3 border-b-2 border-gray-200 px-4">
            {otherUser.picturePath && (
              <div className="relative flex items-center justify-between space-x-4">
                <img
                  src={otherUser.picturePath}
                  alt=""
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border object-cover"
                />
                <div className="text-lg mt-1 dark:text-gray-200 flex items-center font-bold">
                  <span className="mr-3">
                    {otherUser.firstname} {otherUser.lastname}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          id="messages"
          ref={chatContainerRef}
          className="h-screen overflow-y-auto p-4"
        >
          {arrivalMessage?.length === 0 ? (
            <div>
              <p className="opacity-70 text-xl text-center dark:text-white">
                Open a conversation to start a chat
              </p>
            </div>
          ) : (
            <div className="h-screen pb-36">
              {arrivalMessage?.map((message, index) => {
                return (
                  <div key={index} className="overflow-y-auto p-4">
                    <div className="grid">
                      <div className="col-span-12">
                        {message.sender._id === user._id ? (
                          <div className="text-right ">
                            <p className="text-sm bg-white py-2 px-4 shadow rounded-xl max-w-96">
                              {message.message}
                            </p>
                          </div>
                        ) : (
                          <div className="flex mb-4 cursor-pointer">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                              {message.sender.picturePath && (
                                <img
                                  alt="image"
                                  className="h-9 w-9 rounded-full border object-cover"
                                  src={
                                    message.sender.companyLogo
                                      ? message.sender.companyLogo
                                      : message.sender.picturePath
                                  }
                                />
                              )}
                            </div>
                            <div className="flex max-w-96 bg-indigo-500  rounded-lg p-3 gap-3">
                              <p className="text-white">{message.message}</p>
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

        <footer class="bg-white border-t border-gray-300 p-4 bottom-0 lg:w-3/4 fixed w-full">
          <form onSubmit={handleCreateMessage}>
            <div class="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message..."
                class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleCreateMessage}
                class="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default UsersConversation;
