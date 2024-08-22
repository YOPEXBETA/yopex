import SendIcon from "@mui/icons-material/Send";
import {format, formatDistance} from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import {
    useCreateTeamChallengeMessage,
    useGetTeamChallengeConversation,
    useGetTeamChallengeMessages,
} from "../../../../../../hooks/react-query/useTeamChallengeConversations";
import ChevronUpIcon from "../../../../../../Components/icons/ChevronUpIcon";
import ChevronDownIcon from "../../../../../../Components/icons/ChevronDownIcon";
import ChevronLeftIcon from "../../../../../../Components/icons/ChevronLeftIcon";
import InfoIcon from "../../../../../../Components/icons/InfoIcon";
import ChatInfoIcon from "../../../../../../Components/icons/ChatInfoIcon";
import EmojiPicker from "emoji-picker-react";
import EmojiIcon from "../../../../../../Components/icons/EmojiIcon";

const TeamChallengeConversation = ({ challenge }) => {
    const chatContainerRef = useRef(null);
    const [membersVisible, setMembersVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { data: teamChallengeConversation } = useGetTeamChallengeConversation(challenge?._id);
    const [members, setMembers] = useState([]);
    const conversationId = teamChallengeConversation?._id;
    const { user } = useSelector((state) => state.auth);
    const { data: messages } = useGetTeamChallengeMessages(conversationId);
    const { mutate } = useCreateTeamChallengeMessage(conversationId);
    const [message, setMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState([]);
    const [socket, setSocket] = useState(null);
    const emojiPickerRef = useRef(null);

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
        socket.on("getTeamChallengeMessage", (data) => {
            setArrivalMessage((prev) => [...prev, data]);
        });

        return () => {
            socket.off("getTeamChallengeMessage");
        };
    }, [socket]);

    useEffect(() => {
        if (teamChallengeConversation) {
            setMembers(teamChallengeConversation.members);
        }
    }, [teamChallengeConversation]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleCreateMessage = async (event) => {
        event.preventDefault();

        socket.emit("sendTeamChallengeMessage", {
            sender: {
                _id: user._id,
                firstname: user.firstname,
                picturePath: user.picturePath,
            },
            conversationId,
            message,
            createdAt: new Date(),
        });

        mutate({ conversationId: conversationId, message, sender: user._id });
        setMessage("");
    };
    const handleEmojiClick = (emoji) => {
        setMessage((prev) => prev + emoji.emoji);
    };
    return (
        <div className="container mx-auto grid grid-cols-3">
            <div className={`col-span-${sidebarVisible ? "2" : "3"} bg-white flex shadow-md rounded-lg flex-col justify-between`}>
                <div className="flex flex-col ">
                    <div className="flex items-center bg-white rounded-t-lg drop-shadow-md p-4 border-b border-gray-300">
                        <img
                            src={user.picturePath || AvatarProfile}
                            className="object-cover h-10 w-10 rounded-full"
                            alt={user.firstname}
                        />
                        <div className="ml-3 flex-grow">
                            <p className="font-semibold text-lg">{user.firstname} {user.lastname}</p>
                        </div>
                        <div
                            className="ml-3 cursor-pointer"
                            onClick={() => setSidebarVisible(!sidebarVisible)}
                            title="Chat Information">
                            <ChatInfoIcon/>
                        </div>
                    </div>
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
                            className="flex flex-col space-y-4 lg:p-3 p-0 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch min-h-80 max-h-[22rem] overflow-y-auto w-full"
                        >
                            {arrivalMessage?.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-${message.sender._id === user._id ? "end" : "start"} mb-4`}
                                >
                                    <div className="flex items-end">
                                        {message.sender._id !== user._id && (
                                            <img
                                                src={message.sender.picturePath || AvatarProfile}
                                                className="object-cover h-8 w-8 rounded-full shadow-md"
                                                alt={message.sender.firstname}
                                                title={message.sender.firstname}
                                            />
                                        )}
                                        <div
                                            className={`ml-2 py-3 px-4 max-w-xs md:max-w-md lg:max-w-lg ${
                                                message.sender._id === user._id
                                                    ? "bg-green-500 rounded-l-2xl rounded-tr-lg"
                                                    : "bg-gray-200 rounded-tl-lg rounded-r-2xl"
                                            } text-black break-words shadow-md`}
                                            style={{wordWrap: "break-word"}}
                                        >
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                    <p className="text-black text-[0.75rem] mt-1">
                                        {formatDistance(new Date(message.createdAt), new Date(), {addSuffix: true})}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="py-5 px-2">
                    <form onSubmit={handleCreateMessage} className="flex items-center relative">
                        <input
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="w-full shadow-inner bg-gray-100 py-2 px-3 rounded-l-xl"
                            type="text"
                            placeholder="type your message here..."
                        />
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                            className="absolute end-28 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            <EmojiEmotionsIcon/>
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white flex items-center px-4 py-2 rounded-r-xl hover:bg-green-600"
                        >
                            <span className="mr-2">Send</span>
                            <SendIcon/>
                        </button>
                        {showEmojiPicker && (
                            <div ref={emojiPickerRef}
                                 className="absolute bottom-full right-0 z-50">
                                <EmojiPicker onEmojiClick={handleEmojiClick}/>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {sidebarVisible && (
                <div className="col-span-1 bg-white rounded-lg shadow-md ml-2 flex flex-col">
                    <div className="flex text-center pt-2 items-center flex-col">
                        <img
                            src={challenge.picturePath}
                            className="object-cover h-24 w-24 rounded-full shadow-md"
                            alt=""
                        />
                        <div className="font-semibold pt-4">General Challenge Conversation</div>
                        <div className="py-2">Created {format(new Date(challenge.createdAt), "dd MMM yyyy")}</div>
                        <div className="w-full dark:bg-gray-800 rounded-lg">
                            <button
                                className="flex gap-12 items-center justify-center w-11/12 mx-auto text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                                onClick={() => setMembersVisible(!membersVisible)}
                            >
                                <span>Chat Members</span>
                                {membersVisible ? (
                                    <ChevronUpIcon className="ml-2"/>
                                ) : (
                                    <ChevronDownIcon className="ml-2"/>
                                )}
                            </button>
                            {membersVisible && (
                                <div className="p-4">
                                <ul>
                                        {members.map((member) => (
                                            <li key={member._id} className="flex items-center mb-2">
                                                <img
                                                    alt={member.firstname}
                                                    src={member.picturePath || AvatarProfile}
                                                    className="h-10 w-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <p className="text-gray-800 dark:text-gray-200 text-start font-medium">
                                                        {member.firstname} {member.lastname}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamChallengeConversation;
