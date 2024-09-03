import React from "react";
import Modal from "../Modals";
import { FaUserTimes } from "react-icons/fa";

const RemoveTeamMemberPopup = ({ open, handleCancel, handleConfirm, actionType  }) => {
    return (
        open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center p-5 flex-auto justify-center">
                        <FaUserTimes className="w-16 h-16 text-red-500 mx-auto"/>
                        <h4 className="text-lg font-bold mb-4 text-black dark:text-white">
                            {actionType === 'removeMember' ? 'Remove Member' : 'Leave Team'}
                        </h4>
                        <p className="text-sm text-gray-500 px-8">
                            Are you sure you want
                            to {actionType === 'removeMember' ? 'remove this member' : 'leave the team'}?
                        </p>
                    </div>
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button
                            onClick={handleCancel}
                            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default RemoveTeamMemberPopup;
