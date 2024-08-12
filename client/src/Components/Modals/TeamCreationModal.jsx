import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import { useSelector } from "react-redux";
import {useFileUpload, useUsersData} from "../../hooks/react-query/useUsers";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import {useCreateTeam, useInviteUserToTeam} from "../../hooks/react-query/useTeamChallenge";

const TeamCreationModal = ({ open, handleClose , challenge}) => {
    const modalRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
    const [invitations, setInvitations] = useState([]); // State to store selected role
    const [searchQuery, setSearchQuery] = useState('');
    const { data: usersData, isLoading: usersLoading, isError: usersError } = useUsersData(1, searchQuery);
    const [showSuggestions, setShowSuggestions] = useState(false); // State to control when to show suggestions
    const [email, setEmail] = useState('');
    const fileUploadMutation = useFileUpload();
    const createTeamMutation = useCreateTeam();
    const inviteUserToTeamMutation = useInviteUserToTeam();
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
    };

    const handleUserSelection = (userId, firstname, lastname, picturePath) => {
        setSelectedUser({ userId, userName: `${firstname} ${lastname}`, picturePath });
        setSearchQuery('');
        setShowSuggestions(false);
    };


    const handleRemoveUser = () => {
        setSelectedUser(null); // Clear selected user
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
        console.log('invitations', invitations)
    };


    const removeInvitation = (index) => {
        setInvitations(prevInvitations => prevInvitations.filter((_, i) => i !== index));
    };

    const { handleSubmit, register, formState: { isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            picture: null,
        },
    });
    const onSubmit = async (formData) => {
        let updatedData = { ...formData };
        let logo = "";

        if (formData.picture && formData.picture.length > 0) {
            const logoFormData = new FormData();
            logoFormData.append("file", formData.picture[0]);
            logoFormData.append("type", "organizationLogo");
            const response = await fileUploadMutation.mutateAsync(logoFormData);
            logo = response.data.downloadURL;
        }

        // Create team and get the team ID
        try {
            const teamData = { ...updatedData, picture: logo };
            console.log('teamData:', teamData);

            const createdTeam = await createTeamMutation.mutateAsync({
                teamData,
                challengeId: challenge._id,
                leaderId: user._id
            });

            const teamId = createdTeam._id;

            if (invitations.length > 0) {
                await Promise.all(
                    invitations.map(async (invitation) => {
                        if (invitation.user) {
                            // For user invitations
                            await inviteUserToTeamMutation.mutateAsync({
                                teamId,
                                userId: invitation.user.userId
                            });
                        } else if (invitation.email) {
                            // For email invitations
                            await inviteUserToTeamMutation.mutateAsync({
                                teamId,
                                email: invitation.email
                            });
                        }
                    })
                );
            }

            handleClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
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
                            Create Your Team
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
                        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
                            <div className="grid gap-2 text-sm grid-cols-1 md:grid-cols-7 space-y-3">
                                <div className="md:col-span-7">
                                    <label className="dark:text-white text-sm font-medium leading-tight tracking-normal">
                                        Team Name
                                    </label>
                                    <div className="relative my-1">
                                        <input
                                            {...register("name", {required: true})}
                                            required
                                            placeholder="Team name"
                                            className="w-full h-8 p-1 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-7">
                                    <label className="dark:text-white text-sm font-medium leading-tight tracking-normal">
                                        Team Picture (Optional)
                                    </label>
                                    <div className="relative my-1">
                                        <input
                                            type="file"
                                            {...register("picture")}
                                            className="w-full py-1 px-2 mt-1 dark:bg-zinc-700 dark:text-white rounded border focus:outline-none focus:border-green-500 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
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
                                                        src={selectedUser.picturePath || AvatarProfile}
                                                        alt={selectedUser.userName}
                                                        className="w-6 h-6 rounded-full mr-1"
                                                    />
                                                    <span
                                                        className="text-gray-800 text-xs">{selectedUser.userName}</span>
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
                                                            src={user.picturePath || AvatarProfile}
                                                            alt={user.firstname}
                                                            className="w-6 h-6 rounded-full mr-2"
                                                        />
                                                        <span
                                                            className="text-gray-800">{user.firstname} {user.lastname}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* Separator with "Or" */}
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

                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-500 text-white font-bold py-1 px-3 rounded mt-4 text-xs"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>

    );
};

export default TeamCreationModal;
