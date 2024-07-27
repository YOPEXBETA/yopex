import React, { useState } from 'react';
import AvatarProfile from '../../assets/images/AvatarProfile.jpg';
import {useUsersData} from "../../hooks/react-query/useUsers";
import {useAllRoles} from "../../hooks/react-query/useRoles";
import Modal from "../Modals";
import {useSelector} from "react-redux";
import {useSendInvitation} from "../../hooks/react-query/useCompany";


const MemberInvitationCard = ({open, handleClose}) => {
    const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
    const [selectedRole, setSelectedRole] = useState(''); // State to store selected role
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false); // State to control when to show suggestions
    const [email, setEmail] = useState(''); // State for email input
    const [invitations, setInvitations] = useState([]); // State to store invitations
    const { currentOrganization } = useSelector(state => state.organization);
    const sendInvitationMutation = useSendInvitation();

    const { data: usersData, isLoading: usersLoading, isError: usersError } = useUsersData(1, searchQuery); // Adjust the page number as needed
    const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useAllRoles(); // Fetch all roles

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true); // Show suggestions when typing
    };


    const handleInputBlur = () => {
        // Hide suggestions when input field loses focus
    };

    const handleUserSelection = (userId, firstname, lastname, picturePath) => {
        setSelectedUser({ userId, userName: `${firstname} ${lastname}`, picturePath });
        setSearchQuery(''); // Clear the search query
        setShowSuggestions(false); // Hide suggestions after selection
    };

    const handleRemoveUser = () => {
        setSelectedUser(null); // Clear selected user
    };

    const addInvitation = () => {
        let invitationData;
        if (selectedUser && selectedRole) {
            invitationData = {
                userId: selectedUser.userId,
                roleName: selectedRole,
                userName: selectedUser.userName,
                picturePath: selectedUser.picturePath || AvatarProfile,
            };
        } else if (email && selectedRole) {
            invitationData = {
                email,
                roleName: selectedRole,
            };
        }

        if (invitationData) {
            setInvitations([
                ...invitations,
                invitationData,
            ]);
        }

        // Reset input values
        setSelectedUser(null);
        setSelectedRole('');
        setEmail('');
        setSearchQuery('');
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const removeInvitation = (index) => {
        const updatedInvitations = [...invitations];
        updatedInvitations.splice(index, 1);
        setInvitations(updatedInvitations);
    };

    const sendInvitations = async () => {
        try {
            const invitationPromises = invitations.map(invitation => {
                const { userId, email, roleName } = invitation;
                if (userId) {
                    // Use mutateAsync if it's available
                    return sendInvitationMutation.mutateAsync({
                        organizationId: currentOrganization._id,
                        userId: userId,
                        roleName: roleName,
                    });
                } else if (email) {
                    return sendInvitationMutation.mutateAsync({
                        organizationId: currentOrganization._id,
                        email: email,
                        roleName: roleName,
                    });
                }
                return Promise.resolve();
            });

            await Promise.all(invitationPromises);

            handleClose();
        } catch (error) {
            console.error("Error sending invitations:", error);
        }
    };



    return (
        <Modal open={open}>
            <div className="h-full w-full p-5  max-w-4xl overflow-y-auto sm:rounded-xl bg-white dark:bg-zinc-800">
                <h2 className="text-2xl font-bold text-center mb-4">Invite Members</h2>
                <div className="flex mb-4">
                    {/* Left side: User ID input */}
                    <div className="flex-1 mr-2 relative">
                        {selectedUser === null ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">User ID:</label>
                                <input
                                    type="text"
                                    placeholder="Search for members by name..."
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                                {showSuggestions && (
                                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                        {usersLoading && <li className="py-2 px-3">Loading users...</li>}
                                        {usersError && <li className="py-2 px-3">Error fetching users.</li>}
                                        {usersData?.users.map((user) => (
                                            <li
                                                key={user._id}
                                                className="py-2 px-3 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() => handleUserSelection(user._id, user.firstname, user.lastname, user.picturePath)}
                                            >
                                                <img
                                                    src={user.picturePath || AvatarProfile}
                                                    alt={user.firstname}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                                <span className="text-gray-800">{user.firstname} {user.lastname}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Selected User:</label>
                                <div className="bg-blue-100 p-2 rounded-md flex items-center">
                                    <img
                                        src={selectedUser.picturePath || AvatarProfile}
                                        alt={selectedUser.userName}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span className="text-gray-800">{selectedUser.userName}</span>
                                    <button
                                        type="button"
                                        onClick={handleRemoveUser}
                                        className="ml-2 text-red-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Separator with "Or" */}
                    <div className="relative flex py-5 items-center flex-col">
                        <div className="">
                            <div
                                className="h-6 min-h-[1em] w-px bg-gradient-to-tr
                        from-transparent via-neutral-500 to-transparent opacity-25
                        dark:via-neutral-400 self-center"></div>
                        </div>
                        <div className="mt-2 flex items-center">
                            <span className=" text-gray-400">Or</span>
                        </div>
                        <div className="mt-2">
                            <div
                                className="h-6 min-h-[1em] w-px bg-gradient-to-tr
                        from-transparent via-neutral-500 to-transparent opacity-25
                        dark:via-neutral-400 self-center"></div>
                        </div>
                    </div>
                    {/* Right side: Email input */}
                    <div className="flex-1 ml-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex justify-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-center">Role:</label>
                        <select
                            className="border border-gray-300 px-3 py-2 rounded-md"
                            value={selectedRole}
                            onChange={handleRoleChange}
                        >
                            <option value="">Select Role</option>
                            {rolesLoading && <option disabled>Loading roles...</option>}
                            {rolesError && <option disabled>Error fetching roles.</option>}
                            {rolesData?.map((role) => (
                                <option key={role._id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Add Invitation button */}
                <button
                    type="button"
                    onClick={addInvitation}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
                    disabled={!selectedUser && !email || !selectedRole}
                >
                    Add Invitation
                </button>
                {/* Display added invitations */}
                <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {invitations.map((invitation, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-md text-sm">
                                <p className="font-semibold mb-1">Member {index + 1}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img
                                            src={invitation.picturePath || AvatarProfile}
                                            alt={invitation.userName}
                                            className="w-6 h-6 rounded-full mr-2"
                                        />
                                        <p className="text-gray-800">{invitation.userName}</p>
                                        {invitation.email && (
                                            <p className="text-gray-800 ml-2 text-xs">Email: {invitation.email}</p>
                                        )}
                                    </div>
                                    <p className="text-gray-800 text-xs">Role: {invitation.roleName}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeInvitation(index)}
                                        className="text-red-600 ml-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="p-3 mt-2 text-center space-x-4 md:block">
                    <button
                        onClick={handleClose}
                        className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={sendInvitations}
                        className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
                    >
                        Send Invitations
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default MemberInvitationCard;
