import React, { useState } from "react";
import { RiChat1Line, RiTeamLine, RiUserStarLine } from "react-icons/ri";
import TeamChallengeConversation from "./TeamChallengeConversation";
import TeamConversation from "./TeamConversation";
import ChallengeOwnerConversation from "./ChallengeOwnerConversation"; // Example icons, update as needed

const ConversationTabs = ({ challenge, user }) => {
    const [activeTab, setActiveTab] = useState("teamChallenge");

    const renderContent = () => {
        switch (activeTab) {
            case "teamChallenge":
                return <TeamChallengeConversation challenge={challenge} />;
            case "teamConversation":
                return <TeamConversation />;
            case "ownerConversation":
                return <ChallengeOwnerConversation />;
            default:
                return null;
        }
    };

    return (
        <div className="md:flex bg-gray-50 p-2 rounded-xl">
            <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <button
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "teamChallenge"
                                ? "text-white bg-green-500 dark:bg-blue-600 shadow-lg hover:shadow-xl"
                                : "text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
                        }`}
                        onClick={() => setActiveTab("teamChallenge")}
                        aria-current={activeTab === "teamChallenge" ? "page" : undefined}
                    >
                        <RiTeamLine className="w-6 h-6 me-2" />
                        <span className=" font-semibold">Chat With Everyone</span>
                    </button>
                </li>
                <li>
                    <button
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "teamConversation"
                                ? "text-white bg-green-500 dark:bg-blue-600 shadow-lg hover:shadow-xl"
                                : "text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
                        }`}
                        onClick={() => setActiveTab("teamConversation")}
                    >
                        <RiChat1Line className="w-6 h-6 me-2" /> {/* Larger icon */}
                        <span className=" font-semibold">Chat With Your Team</span> {/* Improved title styling */}
                    </button>
                </li>
                <li>
                    <button
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "ownerConversation"
                                ? "text-white bg-green-500 dark:bg-blue-600 shadow-lg hover:shadow-xl"
                                : "text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
                        }`}
                        onClick={() => setActiveTab("ownerConversation")}
                    >
                        <RiUserStarLine className="w-6 h-6 me-2" /> {/* Larger icon */}
                        <span className=" font-semibold">Chat With The Moderator</span> {/* Improved title styling */}
                    </button>
                </li>
            </ul>
            <div className="  dark:bg-gray-800 rounded-lg w-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default ConversationTabs;
