import React, {useEffect, useState} from "react";
import { RiChat1Line, RiTeamLine, RiUserStarLine } from "react-icons/ri";
import TeamChallengeConversation from "./TeamChallengeConversation";
import TeamConversation from "./TeamConversation";
import ChallengeOwnerConversation from "./ChallengeOwnerConversation";
import {useGetTeamChallengeConversation} from "../../../../../../hooks/react-query/useTeamChallengeConversations"; // Example icons, update as needed
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import {useUserById} from "../../../../../../hooks/react-query/useUsers";

const ConversationTabs = ({ challenge, user, isOwner, isRegistered, team }) => {
    const [activeTab, setActiveTab] = useState("teamChallenge");
    const { data: teamChallengeConversation } = useGetTeamChallengeConversation(challenge?._id);
    const { data: challengeOwner } = useUserById(challenge?.owner?._id);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (teamChallengeConversation) {
            setMembers(
                teamChallengeConversation.members.filter(member => member._id !== user._id)
            );
        }
    }, [teamChallengeConversation, user]);


    const renderContent = () => {
        switch (activeTab) {
            case "teamChallenge":
                return <TeamChallengeConversation challenge={challenge} />;
            case "teamConversation":
                return isRegistered && !isOwner ? <TeamConversation challenge={challenge} team={team} /> : null;
            case "ownerConversation":
                return isRegistered ? <ChallengeOwnerConversation member={user} owner={challengeOwner} /> : null;
            default:
                if (isOwner) {
                    const member = members.find(member => member._id === activeTab);
                    if (member) {
                        return <ChallengeOwnerConversation member={member} owner={user} />;
                    }
                }
                return null;
        }
    };

    return (
        <div className="md:flex">
            <ul className="flex flex-col space-y-4 w-96 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <button
                        className={`inline-flex items-center px-4 py-4 rounded-lg w-full ${
                            activeTab === "teamChallenge"
                                ? "text-white bg-green-500 dark:bg-green-600 shadow-lg hover:shadow-xl"
                                : "text-gray-900 bg-gray-50 dark:bg-zinc-500  dark:text-white hover:bg-zinc-100 bg-zinc-200 hover:shadow-lg"
                        }`}
                        onClick={() => setActiveTab("teamChallenge")}
                        aria-current={activeTab === "teamChallenge" ? "page" : undefined}
                    >
                        <RiTeamLine className="w-6 h-6 me-2" />
                        <span className=" font-semibold">Chat With Everyone</span>
                    </button>
                </li>
                {isRegistered && !isOwner && (
                    <li>
                        <button
                            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                                activeTab === "teamConversation"
                                    ? "text-white bg-green-500 dark:bg-green-600 shadow-lg hover:shadow-xl"
                                    : "text-gray-900 bg-gray-50 dark:bg-zinc-500  dark:text-white hover:bg-zinc-100 bg-zinc-200 hover:shadow-lg"
                            }`}
                            onClick={() => setActiveTab("teamConversation")}
                        >
                            <RiChat1Line className="w-6 h-6 me-2" />
                            <span className=" font-semibold">Chat With Your Team</span>
                        </button>
                    </li>
                )}
                {isRegistered && (
                <li>
                    <button
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "ownerConversation"
                                 ? "text-white bg-green-500 dark:bg-green-600 shadow-lg hover:shadow-xl"
                                 : "text-gray-900 bg-gray-50 dark:bg-zinc-500  dark:text-white hover:bg-zinc-100 bg-zinc-200 hover:shadow-lg"
                        }`}
                        onClick={() => setActiveTab("ownerConversation")}
                    >
                        <RiUserStarLine className="w-6 h-6 me-2" /> {/* Larger icon */}
                        <span className=" font-semibold">Chat With The Moderator</span> {/* Improved title styling */}
                    </button>
                </li>
                )}
                {isOwner && members.map((member) => (
                    <li key={member._id}>
                        <button
                            className={`inline-flex items-center px-1 py-1 rounded-lg w-full ${
                                activeTab === member._id
                                    ? "text-white bg-green-500 dark:bg-green-600 shadow-lg hover:shadow-xl"
                                    : "text-gray-900 bg-gray-50 dark:bg-zinc-500  dark:text-white hover:bg-zinc-100 bg-zinc-200 hover:shadow-lg"
                            }`}
                            onClick={() => setActiveTab(member._id)}
                        >
                            <img
                                src={member.picturePath || AvatarProfile }
                                alt={member.firstname}
                                className="w-16 h-16 rounded-lg mr-2 object-cover flex-shrink-0"
                            />
                            <span className="font-semibold truncate">{`${member.firstname} ${member.lastname}`}</span>
                        </button>
                    </li>
                ))}

            </ul>
            <div className="dark:bg-gray-800 rounded-lg w-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default ConversationTabs;
