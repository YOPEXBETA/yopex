import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useUsersData } from "../../hooks/react-query/useUsers";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import {
    useInviteUserToTeam,
    useLeaveTeam,
    useRemoveTeamMember,
    useTeamById
} from "../../hooks/react-query/useTeamChallenge";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import RemoveTeamMemberPopup from "../Popup/RemoveTeamMemberPopup";

const ChallengeTeamModal = ({ open, handleClose, challenge, team }) => {
    const modalRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const [selectedUser, setSelectedUser] = useState(null);
    const [invitations, setInvitations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: usersData, isLoading: usersLoading, isError: usersError } = useUsersData(1, searchQuery);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [email, setEmail] = useState('');
    const [showInviteForm, setShowInviteForm] = useState(false); // Toggle invite form visibility
    const inviteUserToTeamMutation = useInviteUserToTeam();
    const removeTeamMemberMutation = useRemoveTeamMember();
    const leaveTeamMutation = useLeaveTeam();
    const [showRemovePopup, setShowRemovePopup] = useState(false); // State for the remove popup
    const [removeAction, setRemoveAction] = useState(null);
    const [removeMember, setRemoveMember] = useState(null);

    const { data: currentTeam, isLoading, isError, error } = useTeamById(team._id);

    const isTeamLeader = user._id === currentTeam?.teamLeader._id;
    const isMember = currentTeam?.members.some(member => member._id === user._id);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        // Implementation can be added if needed
    };

    const handleUserSelection = (userId, firstname, lastname, picturePath) => {
        setSelectedUser({ userId, userName: `${firstname} ${lastname}`, picturePath });
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handleRemoveUser = () => {
        setSelectedUser(null);
    };

    const addInvitation = () => {
        if (selectedUser) {
            setInvitations(prevInvitations => [
                ...prevInvitations,
                { user: { ...selectedUser }, email: null }
            ]);
            setSelectedUser(null);
            setEmail('');
        } else if (email) {
            setInvitations(prevInvitations => [
                ...prevInvitations,
                { user: null, email }
            ]);
            setEmail('');
        }
    };

    const removeInvitation = (index) => {
        setInvitations(prevInvitations => prevInvitations.filter((_, i) => i !== index));
    };

    const handleInvite = async () => {
        try {
            const teamId = team._id;

            if (invitations.length > 0) {
                await Promise.all(
                    invitations.map(async (invitation) => {
                        if (invitation.user) {
                            await inviteUserToTeamMutation.mutateAsync({
                                teamId,
                                userId: invitation.user.userId,
                                challengeId: challenge._id,
                            });
                        } else if (invitation.email) {
                            await inviteUserToTeamMutation.mutateAsync({
                                teamId,
                                email: invitation.email,
                                challengeId: challenge._id,
                            });
                        }
                    })
                );

                handleClose();
            }
        } catch (error) {
            console.error('Error during invitation:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };
    const handleRemoveMember = (memberId) => {
        setRemoveMember(memberId)
        setRemoveAction('removeMember');
        setShowRemovePopup(true);
    };

    const confirmRemoveMember  = async () => {
        try {
            await removeTeamMemberMutation.mutateAsync({
                teamId: team._id,
                userId: removeMember
            });
            setShowRemovePopup(false);

        } catch (error) {
            console.error('Error removing member:', error);
        }
    };
    const handleLeaveTeam = () => {
        setRemoveAction('leaveTeam');
        setShowRemovePopup(true);
    };
    const confirmLeaveTeam  = async () => {
        try {
            await leaveTeamMutation.mutateAsync({
                teamId: team._id,
                userId: user._id
            });
            setShowRemovePopup(false);
            handleClose();

        } catch (error) {
            console.error('Error leaving team:', error);
        }
    };
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={`fixed inset-0 z-50 ${open ? "" : "hidden"}`}
        >
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-6">
                <div ref={modalRef} className="max-h-full w-full max-w-[35rem] overflow-y-auto sm:rounded-xl bg-white dark:bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                        <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
                            {currentTeam?.name}
                        </h4>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-xs w-6 h-6 md:w-7 md:h-7 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <CloseIcon width={3} height={3} />
                        </button>
                    </div>
                    <hr />
                    <div className="m-6 max-w-[500px] mx-auto space-y-4">

                        <div className="flex items-center mb-4">
                            <img
                                src={currentTeam?.teamPicture || AvatarProfile}
                                alt={currentTeam?.name}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="text-lg font-bold text-black dark:text-white">{team?.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {currentTeam?.members?.length + 1} Members
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1"></div>
                            {/* Empty 1/4 column */}

                            <div className="col-span-2 flex flex-col items-center">
                                <div className="bg-yellow-100 p-3 rounded-md flex flex-col items-start">
                                    <div className="flex justify-center w-full mb-2">
                                        <span className="text-yellow-500 text-2xl">👑</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={currentTeam?.teamLeader?.picturePath || AvatarProfile}
                                            alt="Team Leader"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h4 className="text-lg font-bold text-black dark:text-white">
                                                {currentTeam?.teamLeader?.firstname} {currentTeam?.teamLeader?.lastname}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1"></div>
                            {/* Empty 1/4 column */}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {currentTeam?.members?.map((member) => (
                                <div key={member._id} className="bg-gray-100 p-3 rounded-md flex items-center relative">
                                    <img
                                        src={member?.picturePath || AvatarProfile}
                                        alt={member?.firstname}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <p className="text-gray-800 text-sm">{member?.firstname} {member?.lastname}</p>
                                    {isTeamLeader && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMember(member._id)}
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isTeamLeader && (
                            <button
                                type="button"
                                onClick={() => setShowInviteForm(!showInviteForm)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md mb-3 hover:bg-green-600 text-xs"
                            >
                                {showInviteForm ? "Hide Invite Form" : "Add Members"}
                            </button>
                        )}
                        {showInviteForm && (
                            <div>
                                <div className="text-center mb-6">
                                    <h2 className="text-xl mt-4 font-bold text-left dark:text-white">
                                        Members Invitation
                                    </h2>
                                </div>
                                <h2 className="text-base mb-3">Let's invite some awesome members to join your team!</h2>
                                <div className="flex mb-3">
                                    <div className="flex-1 mr-1">
                                        {selectedUser === null ? (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">User
                                                    ID:</label>
                                                <input
                                                    type="text"
                                                    placeholder="Search for members by name..."
                                                    className="border border-gray-300 px-2 py-1 rounded-md w-full text-xs"
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                    onBlur={handleInputBlur}
                                                    onFocus={() => setShowSuggestions(true)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="mb-1">
                                                <label className="block text-sm font-medium text-gray-700">Selected
                                                    User:</label>
                                                <div className="bg-blue-100 p-1 rounded-md flex items-center">
                                                    <img
                                                        src={selectedUser?.picturePath || AvatarProfile}
                                                        alt={selectedUser?.userName}
                                                        className="w-6 h-6 rounded-full mr-1"
                                                    />
                                                    <span
                                                        className="text-gray-800 text-xs">{selectedUser?.userName}</span>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveUser}
                                                        className="ml-1 text-red-600"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-3 w-3"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M6 18L18 6M6 6l12 12"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        {showSuggestions && (
                                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                                {usersLoading && <li className="py-1 px-2">Loading users...</li>}
                                                {usersError && <li className="py-1 px-2">Error fetching users.</li>}
                                                {usersData?.users.map((user) => (
                                                    <li
                                                        key={user._id}
                                                        className="py-1 px-2 cursor-pointer hover:bg-gray-100 flex items-center text-xs"
                                                        onClick={() => handleUserSelection(user._id, user.firstname, user.lastname, user.picturePath)}
                                                    >
                                                        <img
                                                            src={user?.picturePath || AvatarProfile}
                                                            alt={user?.firstname}
                                                            className="w-6 h-6 rounded-full mr-2"
                                                        />
                                                        <span
                                                            className="text-gray-800">{user.firstname} {user.lastname}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="relative flex py-4 items-center flex-col">
                                        <div
                                            className="h-4 min-h-[1em] w-px bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 self-center"></div>
                                        <div className="mt-1 flex items-center">
                                            <span className="text-gray-400 text-xs">Or</span>
                                        </div>
                                        <div className="mt-1">
                                            <div
                                                className="h-4 min-h-[1em] w-px bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 self-center"></div>
                                        </div>
                                    </div>
                                    {/* Right side: Email input */}
                                    <div className="flex-1 ml-1">
                                        <div className="mb-1">
                                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                                            <input
                                                type="email"
                                                placeholder="Enter email address"
                                                className="border border-gray-300 px-2 py-1 rounded-md w-full text-xs"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addInvitation}
                                    className="bg-green-500 text-white px-3 py-1 rounded-md mb-3 hover:bg-green-600 text-xs"
                                    disabled={!selectedUser && !email}
                                >
                                    Add Invitation
                                </button>
                                {/* Display added invitations */}
                                <div className="grid grid-cols-2 gap-3">
                                    {invitations.map((invitation, index) => (
                                        <div key={index}
                                             className="bg-gray-100 p-2 rounded-md flex items-center space-x-2">
                                            <div className="flex items-center">
                                                {invitation.user ? (
                                                    <>
                                                        <img
                                                            src={invitation.user.picturePath || AvatarProfile}
                                                            alt={invitation.user.userName}
                                                            className="w-5 h-5 rounded-full"
                                                        />
                                                        <p className="text-gray-800 text-xs ml-2">{invitation.user.userName}</p>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-800 text-xs">{invitation.email}</p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeInvitation(index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-xs ml-auto"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleInvite}
                                    className="bg-green-500 text-white font-bold py-1 px-3 rounded mt-4 text-xs"
                                >
                                    Invite Members
                                </button>
                            </div>
                        )}
                        {showRemovePopup && (
                            <RemoveTeamMemberPopup
                                open={showRemovePopup}
                                handleCancel={() => setShowRemovePopup(false)}
                                handleConfirm={removeAction === 'removeMember' ? confirmRemoveMember : confirmLeaveTeam}
                                actionType={removeAction}
                            />
                        )}
                    </div>
                    {isMember && !isTeamLeader && (
                        <div className="px-6 pb-4 flex justify-end">
                            <button
                                type="button"
                                onClick={handleLeaveTeam}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-xs"
                            >
                                Leave Team
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ChallengeTeamModal;
