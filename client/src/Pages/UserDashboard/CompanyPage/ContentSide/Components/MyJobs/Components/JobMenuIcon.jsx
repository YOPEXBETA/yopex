import React, { useState } from "react";
import { useDeleteJob } from "../../../../../../../hooks/react-query/useJobs";
import { EditJobModal } from "../../../../../../../Components/shared/Modals/EditJobModal";
import { BsThreeDots } from "react-icons/bs";

const PostMenuIcon = ({ post }) => {
  // const { user } = useSelector((state) => state.auth);

  const { mutate: deleteJob } = useDeleteJob();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    // Show the confirmation dialog
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action
    deleteJob(post._id);

    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    setConfirmationDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorE2, setAnchorE2] = useState(null);
  const openEdit = Boolean(anchorE2);
  const handleClickEdit = (event) => {
    setAnchorE2(openEdit ? null : event.currentTarget);
  };
  const handleCloseEdit = () => setAnchorE2(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <button
        data-ripple-light="true"
        data-popover-target="menu"
        onClick={toggleOpen}
      >
        <BsThreeDots />
      </button>
      {isOpen && (
        <ul
          role="menu"
          data-popover="menu"
          data-popover-placement="bottom"
          className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <li
            onClick={handleDeleteClick}
            role="menuitem"
            className="block w-full hover:bg-gray-300 cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Delete Job
          </li>
          <li
            onClick={handleClickEdit}
            role="menuitem"
            className="block w-full cursor-pointer hover:bg-gray-300 select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Edit Job
          </li>
        </ul>
      )}
      <EditJobModal open={openEdit} handleClose={handleCloseEdit} job={post} />
      {/* Confirmation Dialog */}
      {confirmationDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this job?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 ml-2 bg-green-500 text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenuIcon;
