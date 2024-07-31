import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaEdit, FaPlus, FaTimes} from "react-icons/fa";
import { useAllRoles } from "../../../../../hooks/react-query/useRoles";
import { useEditMemberRole, useDeleteMember } from "../../../../../hooks/react-query/useCompany"; // Adjust path as necessary
import toast from "react-hot-toast";
import { fetchCurrentOrganization } from "../../../../../redux/organization/organizationSlice";
import DeleteMemberPopup from "../../../../../Components/Popup/DeleteMemberPopup";
import MemberInvitationCard from "../../../../../Components/Cards/MembersInvitationCard";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";

const MembersSettings = ({ extra }) => {
    const dispatch = useDispatch();
    const { currentOrganization } = useSelector(state => state.organization);
    const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useAllRoles();
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [showInvitationModal, setShowInvitationModal] = useState(false);

    const { mutate: editMemberRole } = useEditMemberRole();
    const { mutate: deleteMember } = useDeleteMember();

    const handleRemoveMember = (userId) => {
        setMemberToDelete(userId);
        setShowDeletePopup(true);
    };

    const confirmDeleteMember = () => {
        if (memberToDelete) {
            deleteMember({ organizationId: currentOrganization._id, memberId: memberToDelete }, {
                onSuccess: () => {
                    toast.success("Member removed successfully");
                    setShowDeletePopup(false);
                    dispatch(fetchCurrentOrganization(currentOrganization._id));
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to remove member");
                    setShowDeletePopup(false);
                }
            });
        }
    };

    const handleEditRole = (userId, currentRoleName) => {
        setEditingMemberId(userId);
        setSelectedRole(currentRoleName);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleSaveRole = (userId) => {
        editMemberRole(
            { organizationId: currentOrganization._id, memberId: userId, newRole: selectedRole },
            {
                onSuccess: () => {
                    toast.success("Role updated successfully");
                    setEditingMemberId(null);
                    dispatch(fetchCurrentOrganization(currentOrganization._id));
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to update role");
                }
            }
        );
    };
    return (
        <div className="flex flex-col items-center w-full">
            <div className="mt-2 mb-8 w-full flex items-center justify-between">
                <p className="px-2 text-lg font-bold dark:text-white">
                    {currentOrganization?.organizationName} Team ({currentOrganization.organizationMembers?.length})
                </p>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600"
                    onClick={() => setShowInvitationModal(true)}
                >
                    <FaPlus size={16}/>
                    <span>Add Member</span>
                </button>
            </div>
            {currentOrganization.organizationMembers?.length === 0 ? (
                <span className="text-gray-600">
                    You haven't added any team members to your organization yet.
                </span>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {currentOrganization.organizationMembers?.map((member) => (
                        <div
                            key={member.userId._id}
                            className="bg-white p-4 rounded-lg shadow-md flex items-center relative"
                        >
                            <img
                                src={member.userId.picturePath || AvatarProfile}
                                alt={`${member.userId.firstname} ${member.userId.lastname}`}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="flex-grow">
                                <p className="font-semibold">{member.userId.firstname} {member.userId.lastname}</p>
                                {editingMemberId === member.userId._id ? (
                                    <div>
                                        <select
                                            className="border border-gray-300 px-3 py-2 rounded-md"
                                            value={selectedRole}
                                            onChange={handleRoleChange}
                                        >
                                            {rolesLoading && <option disabled>Loading roles...</option>}
                                            {rolesError && <option disabled>Error fetching roles.</option>}
                                            {rolesData?.map((role) => (
                                                <option key={role._id} value={role.name}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleSaveRole(member.userId._id)}
                                            className="ml-2 text-green-600 hover:text-green-800"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">{member.roleName}</p>
                                )}
                            </div>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                {editingMemberId === member.userId._id ? (
                                    <button
                                        onClick={() => setEditingMemberId(null)}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        <FaTimes size={20}/>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditRole(member.userId._id, member.roleName)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <FaEdit size={20}/>
                                        </button>
                                        <button
                                            onClick={() => handleRemoveMember(member.userId._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTimes size={20}/>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Render DeleteMemberPopup */}
            {showDeletePopup && (
                <DeleteMemberPopup
                    open={showDeletePopup}
                    handleCancel={() => setShowDeletePopup(false)}
                    handleConfirm={confirmDeleteMember}
                    memberName={currentOrganization.organizationMembers.find(member => member.userId._id === memberToDelete)?.userId?.firstname + ' ' + currentOrganization.organizationMembers.find(member => member.userId._id === memberToDelete)?.userId?.lastname}
                />
            )}

            {showInvitationModal && (
                <MemberInvitationCard
                    open={showInvitationModal}
                    handleClose={() => setShowInvitationModal(false)}
                />
            )}
        </div>
    );
};

export default MembersSettings;
