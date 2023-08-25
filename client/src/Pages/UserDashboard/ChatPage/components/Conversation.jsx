import SendIcon from "@mui/icons-material/Send";
import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateMessage,
  useMessages,
} from "../../../../hooks/react-query/useConversations";

const Conversation = ({ conversationId, socket, otherUser }) => {
  console.log(otherUser);

  const { user } = useSelector((state) => state.auth);
  const { data: messages } = useMessages(conversationId);
  const { mutate } = useCreateMessage(conversationId);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);

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
    <div>
      {arrivalMessage?.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40vh 0vh" }}>
          <p className="opacity-50 text-xl">
            Open a conversation to start a chat
          </p>
        </div>
      ) : (
        <div className="fixed h-[82vh] xl:w-[75%]  overflow-auto pb-8">
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

export default Conversation;
