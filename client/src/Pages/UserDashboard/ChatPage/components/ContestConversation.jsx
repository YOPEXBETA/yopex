import SendIcon from "@mui/icons-material/Send";
import { formatDistance } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useContestMessages,
  useCreateMessage,
} from "../../../../hooks/react-query/useConversations";
import { io } from "socket.io-client";

const ContestConversation = ({ conversationId, id }) => {
  const chatContainerRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { data: messages } = useContestMessages(id);
  const { mutate } = useCreateMessage(id);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [socket, setSocket] = useState(null);

  if (chatContainerRef.current !== null)
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  const url = process.env.URL || "http://199.247.3.38:8000";
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
    <div>
      {arrivalMessage?.length === 0 ? (
        <div
          ref={chatContainerRef}
          style={{ textAlign: "center", padding: "40vh 0vh" }}
        >
          <p className="opacity-50 text-xl">
            Open a conversation to start a chat
          </p>
        </div>
      ) : (
        <div
          className="fixed h-[47vh] xl:w-[75%] w-full  overflow-auto pb-8"
          ref={chatContainerRef}
        >
          {arrivalMessage?.map((message, index) => {
            return (
              <div key={index} className="px-11 py-6">
                <div className="grid">
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
                                  ? message.sender.picturePath
                                  : ""
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

      <form onSubmit={handleCreateMessage}>
        <div className="fixed bottom-0 xl:w-3/4 w-full p-4 flex items-center bg-white border-t-2 border-gray-200">
          <div className="w-11/12">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type Something"
              className=" w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
            />
          </div>
          <div className="w-1/12 text-right">
            <button
              className="bg-green-500 text-white p-3 rounded-full"
              onClick={handleCreateMessage}
              type="submit"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContestConversation;
