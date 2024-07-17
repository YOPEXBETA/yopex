import React, { useState } from "react";
import { useUsersData } from "../../../../hooks/react-query/useUsers"; // Adjust the path to your hook
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import { useAllRoles } from "../../../../hooks/react-query/useRoles";

const InvitationsStep = ({ formData, updateFormData }) => {
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  const [selectedRole, setSelectedRole] = useState(""); // State to store selected role
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useUsersData(1, searchQuery); // Adjust the page number as needed
  const {
    data: rolesData,
    isLoading: rolesLoading,
    isError: rolesError,
  } = useAllRoles(); // Fetch all roles
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control when to show suggestions

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true); // Show suggestions when typing
  };

  const handleInputBlur = () => {
    // Hide suggestions when input field loses focus
  };

  const handleUserSelection = (userId, firstname, lastname, picturePath) => {
    setSelectedUser({
      userId,
      userName: `${firstname} ${lastname}`,
      picturePath,
    });
    setSearchQuery(""); // Clear the search query
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleRemoveUser = () => {
    setSelectedUser(null); // Clear selected user
  };

  const addInvitation = () => {
    if (selectedUser && selectedRole) {
      updateFormData({
        ...formData,
        invitations: [
          ...formData.invitations,
          {
            userId: selectedUser.userId,
            roleName: selectedRole,
            userName: selectedUser.userName,
            picturePath: selectedUser.picturePath || AvatarProfile,
          },
        ],
      });
    }

    // Reset input values
    setSelectedUser(null);
    setSelectedRole("");
    setSearchQuery("");
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const removeInvitation = (index) => {
    const updatedInvitations = [...formData.invitations];
    updatedInvitations.splice(index, 1);
    updateFormData({ ...formData, invitations: updatedInvitations });
  };

  return (
    <div>
      <h2 className="text-lg mb-4">
        Let's invite some awesome members to join your organization!
      </h2>
      <div className="mb-4 relative">
        {selectedUser === null ? (
          <div>
            <label className="text-sm text-black mb-2 block dark:text-white">
              Choose a user
            </label>
            <input
              type="text"
              placeholder="Search for members by name..."
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleInputBlur}
              onFocus={() => setShowSuggestions(true)}
            />
          </div>
        ) : (
          <div className="mb-2">
            <label className="text-sm text-black mb-2 block dark:text-white">
              Selected User
            </label>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {showSuggestions && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {usersLoading && <li className="py-2 px-3">Loading users...</li>}
            {usersError && <li className="py-2 px-3">Error fetching users.</li>}
            {usersData?.users.map((user) => (
              <li
                key={user._id}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() =>
                  handleUserSelection(
                    user._id,
                    user.firstname,
                    user.lastname,
                    user.picturePath
                  )
                }
              >
                <img
                  src={user.picturePath || AvatarProfile}
                  alt={user.firstname}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-800">
                  {user.firstname} {user.lastname}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm text-black mb-2 block dark:text-white">
          Role
        </label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
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
      <button
        type="button"
        onClick={addInvitation}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
        disabled={!selectedUser || !selectedRole}
      >
        Add Invitation
      </button>
      <div className="grid gap-4">
        {formData.invitations.map((invitation, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-bold mb-2">Member {index + 1}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={invitation.picturePath || AvatarProfile}
                  alt={invitation.userName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-gray-800">{invitation.userName}</p>
              </div>
              <p className="text-gray-800">Role: {invitation.roleName}</p>
              <button
                type="button"
                onClick={() => removeInvitation(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvitationsStep;
