import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./index";
import JobOfferModal from "../shared/Modals/JobOfferModal";
import JobMenuIcon from "../MenuIcons/JobMenuIcon";
import Dropdown from "../dropdown";
import { BsThreeDots } from "react-icons/bs";
import { EditJobModal } from "../shared/Modals/EditJobModal";
import DeleteJobPopup from "../Popup/DeleteJobPopup";
import { useDeleteJob } from "../../hooks/react-query/useJobs";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.jpg";

const WorkCard = ({ job, extra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user } = useSelector((state) => state.auth);
  const { mutate: deleteJob } = useDeleteJob();
  const handleClose = () => setIsOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleClickEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteClick = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteJob(job._id);
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };
  return (
    <Card>
      <div
        onClick={toggleOpen}
        className=" flex flex-col sm:flex-row gap-3 sm:items-end justify-between px-5 py-4 rounded-md"
      >
        <div className="flex gap-4">
          <img
            src={
              job?.company?.companyLogo
                ? job?.company?.companyLogo
                : job?.owner?.picturePath
                ? job?.owner?.picturePath
                : ImagePlaceholder
            }
            alt="Icon"
            className="w-16 h-16 rounded-lg object-cover hidden md:block lg:block"
          />

          <div>
            <h3 className="font-bold mt-px">{job?.title}</h3>

            <div className="flex items-center gap-3 mt-2">
              <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                {job?.jobType}
              </span>
              <span className="text-slate-600 text-sm flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job?.offerType}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            className="font-medium p-2 flex hover:bg-zinc-500 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(user?.companies?.includes(job?.company?._id) ||
              user?._id === job?.owner?._id) && (
              <div>
                <Dropdown
                  button={
                    <p className="cursor-pointer ">
                      <BsThreeDots />
                    </p>
                  }
                  animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                  children={
                    <JobMenuIcon
                      job={job}
                      handleClickEdit={handleClickEdit}
                      handleDeleteClick={handleDeleteClick}
                    />
                  }
                  classNames={"py-2 top-4 right-0"}
                />
              </div>
            )}
          </button>
        </div>
      </div>
      <JobOfferModal open={isOpen} handleClose={handleClose} job={job} />
      {openEdit && (
        <EditJobModal open={openEdit} handleClose={handleCloseEdit} job={job} />
      )}

      {confirmationDialogOpen && (
        <DeleteJobPopup
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </Card>
  );
};

export default WorkCard;
