import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateMessage,
  useMessages,
} from "../../../../hooks/react-query/useConversations";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import { useNavigate } from "react-router-dom";

const ChatConversations = ({ conversationId, socket, otherUser }) => {
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
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
        _id: user?._id,
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
    <div className="flex flex-col flex-1 overflow-hidden bg-transparent  bg-bottom bg-cover">
      <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white dark:bg-zinc-800 border-b">
        {otherUser?.companyLogo || otherUser.picturePath ? (
          <img
            src={
              otherUser.companyLogo
                ? otherUser.companyLogo
                : otherUser.picturePath
            }
            alt="User Avatar"
            className="w-12 h-12 mx-4 my-2 bg-center bg-no-repeat border rounded-full object-cover cursor-pointer"
          />
        ) : (
          <img
            src={AvatarProfile}
            alt="Default Avatar"
            className="w-12 h-12 mx-4 my-2 bg-center bg-no-repeat border rounded-full object-cover cursor-pointer"
          />
        )}
        <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
          <div
            className="overflow-hidden text-base font-medium leading-tight dark:text-white whitespace-no-wrap"
            onClick={() => {
              navigate(
                otherUser.companyLogo
                  ? "/company/" + otherUser._id
                  : "/profile/" + otherUser._id
              );
            }}
          >
            {otherUser.companyName
              ? otherUser.companyName
              : otherUser.firstname}
          </div>
        </div>

        <button className="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
          <svg
            className="w-6 h-6 text-gray-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="nonzero"
              d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"
            />
          </svg>
        </button>
      </div>
      <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden  dark:bg-zinc-700 bg-bottom bg-cover overflow-y-auto">
        <div className="self-center flex-1 w-full ">
          <div id="messages" ref={chatContainerRef}>
            {arrivalMessage?.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="opacity-70 text-xl text-center dark:text-white">
                  Open a conversation to start a chat
                </p>
              </div>
            ) : (
              <div>
                {arrivalMessage?.map((message, index) => {
                  return (
                    <div key={index} className="overflow-y-auto p-4">
                      <div className="grid">
                        <div className="col-span-12">
                          {message.sender._id === user._id ? (
                            <div className="flex justify-end">
                              <p className="text-sm bg-white  py-2 px-4 shadow rounded-xl">
                                {message.message}
                              </p>
                            </div>
                          ) : (
                            <div className="flex mb-4 cursor-pointer items-center">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2">
                                {message.sender.picturePath && (
                                  <img
                                    alt="image"
                                    className="h-10 w-10 rounded-full border object-cover"
                                    src={
                                      message.sender.companyLogo
                                        ? message.sender.companyLogo
                                        : message.sender.picturePath
                                    }
                                  />
                                )}
                              </div>
                              <div className="text-left">
                                <p className="text-sm bg-indigo-500 text-white py-2 px-4 shadow rounded-xl max-w-96">
                                  {message.message}
                                </p>
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
        </div>
        <div className="flex-none sticky bottom-0 right-0  w-full">
          <div className="flex flex-row items-center p-4">
            <div className="relative flex-grow">
              <form onSubmit={handleCreateMessage} className="w-full">
                <label>
                  <input
                    className="rounded-full py-2 pl-3 pr-10 w-full border  focus:border-gray-200 dark:bg-zinc-800 focus:bg-gray-50 focus:outline-none text-gray-500 focus:shadow-md transition duration-300 ease-in"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-green-500 hover:text-green-700 w-6 h-6"
                    onClick={handleCreateMessage}
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="nonzero"
                        d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z"
                      />
                    </svg>
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>
        {/*<div className="relative flex items-center self-center w-full max-w-xl p-4  overflow-hidden text-gray-600 focus-within:text-gray-400">
          <form onSubmit={handleCreateMessage} className="w-full">
            <span className="absolute inset-y-0 right-0 flex items-center pr-6">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-none hover:text-green-500"
                onClick={handleCreateMessage}
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="nonzero"
                    d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z"
                  />
                </svg>
              </button>
            </span>

            <input
              type="search"
              value={message}
              className="w-full py-2 pl-6 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-green-500 focus:text-gray-900 focus:shadow-outline-blue"
              placeholder="Message..."
              onChange={(event) => setMessage(event.target.value)}
              autocomplete="off"
            />
          </form>
            </div>*/}
      </div>
    </div>
  );
};

export default ChatConversations;
