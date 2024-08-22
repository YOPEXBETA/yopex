import React from "react";
import { formatDistance } from "date-fns";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import SendIcon from "@mui/icons-material/Send";

const ChallengeOwnerConversation = () => {
    return (
        <div className="flex flex-col h-full">
            <div
                id="messages"
                className="flex flex-col space-y-4 lg:p-3 p-0 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch min-h-80 max-h-[22rem] overflow-y-auto w-full px-4 overflow-auto lg:overflow-auto"
            >
                {/* Placeholder messages */}
                <div className="px-11 py-6">
                    <div className="grid">
                        <div className="col-span-12">
                            <div>
                                <div className="flex gap-2 items-center">
                                    <img
                                        alt="image"
                                        className="h-11 w-11 rounded-full bg-green-500"
                                        src={AvatarProfile}
                                    />
                                    <div>
                                        <p className="text-gray-500 text-sm">Challenge Owner</p>
                                        <p className="text-black dark:text-white">This is a placeholder message.</p>
                                        <p className="text-gray-500 text-[0.75rem]">
                                            {formatDistance(new Date(), new Date(), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-full w-full">
                <form>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <input
                                type="text"
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
                            />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-green-500 hover:bg-purple-500 focus:outline-none"
                                >
                                    <span className="font-bold">Send</span>
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChallengeOwnerConversation;
