import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import RemoveParticipantPopup from "../../../../../../Components/Popup/RemoveParticipantPopup";
import { useUnbanTeam} from "../../../../../../hooks/react-query/useTeamChallenge";
import ChallengeTeamModal from "../../../../../../Components/Modals/ChallengeTeamModal";

const RemovedTeam = ({ team, index, challenge, isOwner }) => {
    const { mutate: unbanTeam } = useUnbanTeam();

    const handleTeamClick = () => {
        unbanTeam({ teamChallengeId: challenge._id, teamId: team._id });
    };
    return (
        <>
            <tr
                key={team?._id}
                className="hover:bg-gray-50 bg-white dark:bg-zinc-800 overflow-auto"
            >
                <td className=" py-4 px-4 font-bold text-md dark:text-white">
                    {index + 1}{" "}
                </td>
                <td className="py-4 px-4">
                    <div className="flex items-center">
                        <div className="flex items-center gap-4">
                            <div
                                className="cursor-pointer"
                            >
                                {team?.teamPicture ? (
                                    <img
                                        alt="team logo"
                                        src={team?.teamPicture}
                                        className="hidden md:block w-10 h-10 rounded-full border object-cover"
                                    />
                                ) : (
                                    <img
                                        alt="default"
                                        src={AvatarProfile}
                                        className="rounded-full object-cover w-10 h-10 border border-gray-200"
                                    />
                                )}
                            </div>

                            <div
                                className="flex items-center gap-1 dark:text-white cursor-pointer"
                            >
                                <span className="text-sm">{team?.name}</span>
                            </div>
                        </div>
                    </div>
                </td>

                {isOwner && (
                    <td
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="text-lg py-4 px-4 dark:text-white cursor-pointer text-right"
                    >
                        <button
                            className="bg-red-400 hover:bg-red-700 text-white px-2 py-2 rounded"
                            type="button"
                            onClick={handleTeamClick}
                        >
                            Unremove
                        </button>
                    </td>
                )}
            </tr>
        </>
    );
};

export default RemovedTeam;
