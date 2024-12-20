import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import RemoveParticipantPopup from "../../../../../../Components/Popup/RemoveParticipantPopup";
import { useBanTeam } from "../../../../../../hooks/react-query/useTeamChallenge";
import ChallengeTeamModal from "../../../../../../Components/Modals/ChallengeTeamModal";

const TeamRow = ({ team, index, challenge, isOwner }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
    const { mutate: banTeam } = useBanTeam();
    const { user: currentUser } = useSelector((state) => state.auth);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    function formatDate(dateString) {
        const options = {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const canEdit = team?.team?.teamLeader?._id === currentUser._id && challenge?.start && new Date() < new Date(challenge.deadline);

    const handleRemove = async () => {
        try {
            await banTeam({ teamChallengeId: challenge._id, teamId: team.team._id });
            setConfirmationDialogOpen(false);
        } catch (error) {
            console.error("Error banning team:", error);
        }
    };

    const handleTeamClick = () => {
        setModalOpen(true); // Open the team detail modal
    };
    return (
        <>
            <tr
                key={team?.team?._id}
                className="hover:bg-gray-50 bg-white dark:bg-zinc-800 overflow-auto"
            >
                <td className="py-4 px-4 font-bold text-md dark:text-white">
                    {challenge.winner === team.team?._id ? (<span>🏆</span>) : index + 1}
                </td>
                <td className="py-4 px-4">
                    <div className="flex items-center">
                        <div className="flex items-center gap-4">
                            <div
                                onClick={handleTeamClick} // Add click handler to picture
                                className="cursor-pointer"
                            >
                                {team?.team?.teamPicture ? (
                                    <img
                                        alt="team logo"
                                        src={team?.team?.teamPicture}
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
                                onClick={handleTeamClick}
                                className="flex items-center gap-1 dark:text-white cursor-pointer"
                            >
                                <span className="text-sm">{team?.team?.name}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="text-sm text-left py-4 px-4 dark:text-white">
                    {formatDate(team?.registrationDate)}
                </td>
                <td className="text-sm py-4 px-4 text-center dark:text-white">
                    <div>{formatDate(team?.submissionDate)}</div>
                </td>

                {isOwner && (
                    <td
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="text-lg py-4 px-4 dark:text-white cursor-pointer text-right"
                    >
                        <button
                            className="bg-red-400 hover:bg-red-700 text-white px-2 py-2 rounded w-full"
                            type="button"
                            onClick={() => setConfirmationDialogOpen(true)}
                        >
                            Remove
                        </button>
                    </td>
                )}
                {confirmationDialogOpen && (
                    <RemoveParticipantPopup
                        open={confirmationDialogOpen}
                        handleCancel={() => setConfirmationDialogOpen(false)}
                        handleConfirm={handleRemove}
                    />
                )}
            </tr>
            {modalOpen && (
                <ChallengeTeamModal
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    team={team.team}
                    challenge={challenge}
                />
            )}
        </>
    );
};

export default TeamRow;
