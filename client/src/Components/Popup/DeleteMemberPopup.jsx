import React from "react";
import Modal from "../Modals";
import { FaUserTimes } from "react-icons/fa"; // User with a cross icon

const DeleteMemberPopup = ({ open, handleCancel, handleConfirm, memberName }) => {
    return (
        <Modal open={open}>
            {/* content */}
            <div className="max-h-full w-full p-5 max-w-lg overflow-y-auto sm:rounded-xl bg-white dark:bg-zinc-800">
                {/* body */}
                <div className="text-center p-5 flex-auto justify-center">
                    <FaUserTimes className="w-16 h-16 text-red-500 mx-auto" />
                    <h2 className="text-xl font-bold py-4">Are you sure?</h2>
                    <p className="text-sm text-gray-500 px-8">
                        Do you really want to remove the member <strong>{memberName}</strong> from your organization?
                    </p>
                </div>
                {/* footer */}
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
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteMemberPopup;
