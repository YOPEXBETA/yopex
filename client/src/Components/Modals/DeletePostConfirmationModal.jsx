import React from "react";

const DeletePostConfirmationModal = ({ open, handleCancel, handleConfirm }) => {
  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="dark:bg-zinc-800 bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold dark:text-white text-center mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-700 dark:text-white mb-4">
            Are you sure you want to delete this Post?
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="px-4 bg-red-500 rounded-lg py-2 text-white hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 ml-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeletePostConfirmationModal;
