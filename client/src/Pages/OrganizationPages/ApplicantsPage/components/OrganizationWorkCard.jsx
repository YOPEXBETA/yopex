import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImagePlaceholder from "../../../../assets/images/ImagePlaceholder.jpg";
import {useDeleteJob} from "../../../../hooks/react-query/useJobs";
import Dropdown from "../../../../Components/dropdown";
import {BsThreeDots} from "react-icons/bs";
import JobMenuIcon from "../../../../Components/MenuIcons/JobMenuIcon";
import {EditJobModal} from "../../../../Components/shared/Modals/EditJobModal";
import DeleteJobPopup from "../../../../Components/Popup/DeleteJobPopup";
import Card from "../../../../Components/Cards";
import { useNavigate } from "react-router-dom";

const OrganizationWorkCard = ({ job, extra }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen((prev) => !prev);
    const { user } = useSelector((state) => state.auth);
    const { mutate: deleteJob } = useDeleteJob();
    const handleClose = () => setIsOpen(false);
    const navigate = useNavigate();
    const [openEdit, setOpenEdit] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const { currentOrganization } = useSelector(state => state.organization);


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
        deleteJob(job?._id);
        setConfirmationDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setConfirmationDialogOpen(false);
    };

    const handleApplicantsClick = () => {
        navigate(`/organization/${currentOrganization?._id}/jobs/${job?._id}/applicants`);
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
                            job?.organization?.organizationLogo
                                ? job?.organization?.organizationLogo
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
                <div className="flex gap-2 items-center">
                    <button
                        onClick={handleApplicantsClick}
                        className="font-medium p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Applicants {job?.appliers.length}/{job?.appliersNumber}
                    </button>
                    <button
                        className="font-medium p-2 flex hover:bg-zinc-500 rounded-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <Dropdown
                                button={
                                    <p className="cursor-pointer ">
                                        <BsThreeDots/>
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
                    </button>
                </div>
            </div>
            {openEdit && (
                <EditJobModal open={openEdit} handleClose={handleCloseEdit} job={job}/>
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

export default OrganizationWorkCard;
