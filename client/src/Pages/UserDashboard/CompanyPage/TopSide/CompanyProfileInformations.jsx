import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useCompanyById } from "../../../../hooks/react-query/useCompany";
import { useFollowCompany } from "../../../../hooks/react-query/useUsers";
import { useDeleteCompany } from "../../../../hooks/react-query/useCompany";
import { EditCompanyModal } from "../../../../Components/shared/Modals/EditCompanyModal";

import { FaUserMinus, FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import { CompanyProfileNavigationTab } from "../../../../Components/Tabs/CompanyProfileNavigationTab";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import DeletePagePopup from "../../../../Components/Popup/DeletePagePopup";
import GlobeIcon from "../../../../Components/icons/GlobeIcon";

const CompanyProfileInformations = ({ changeValue, value }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const handleDeleteClick = () => {
    // Show the confirmation dialog
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action
    handleDeleteCompany();

    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  };
  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    setConfirmationDialogOpen(false);
  };

  const [openPostModal, setOpenPostModal] = useState(false);
  const { companyId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { mutate, isLoadinge } = useFollowCompany(user._id, companyId);
  const { mutate: deleteCompanyMutation, isSuccess } = useDeleteCompany();
  const handleDeleteCompany = async () => {
    console.log('id',company)
    await deleteCompanyMutation(company._id);
  };

  if (isSuccess) {
    window.location = `/profile/${user._id}`;
  }

  const [isfollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (user.followings.includes(companyId)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [user.followings]);

  const followCompany = async () => {
    mutate();
    setIsFollow((prev) => !prev);
  };

  const { data: company, isLoading, isError } = useCompanyById(companyId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error loading company data.</p>;
  }
  const toggleModal = () => {
    setOpenPostModal(!openPostModal);
  };

  return (
    <div>
      <div className="md:pt-10 pt-6 flex flex-col justify-end dark:border-zinc-500 border-b">
        <div className="space-y-0 md:space-y-8 mx-auto container">
          <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row items-start md:items-center gap-0 pb-8 md:pb-0 md:gap-2 justify-between">
            <div className="flex lg:flex-row flex-row items-center gap-4">
              <div className="w-24 h-24 sm:w-40 sm:h-40">
                <img
                  alt="Profile picture"
                  src={company?.organizationLogo}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              <div className="space-y-2 sm:space-y-5 xl:block md:flex lg:block  flex flex-col ">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    {company?.organizationName}
                  </p>

                  <button
                    className="flex items-center gap-1"
                    aria-label="verification badge"
                    disabled={!company?.verified}
                  >
                    <FaCheckCircle
                      className={`text-${
                        company?.verified ? "green" : "gray"
                      }-500 w-4 h-4 sm:w-5 sm:h-5 mb-[0.1rem] ${
                        !company?.verified
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="hidden xl:flex lg:flex md:flex flex-row sm:flex-row gap-6 sm:gap-4 w-full sm:w-72">
                  <a
                    className="text-base font-medium text-zinc-700 dark:text-white hover:text-green-500 dark:hover:text-  -500"
                    href={company?.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex gap-2">
                      <GlobeIcon className="w-6 h-6 mr-2" />
                      <p>{company?.websiteURL}</p>
                    </div>
                  </a>
                </div>
                {/*mobile version*/}
                <div className="flex gap-2 xl:hidden lg:hidden md:hidden">
                  <div>
                    <button
                      className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-2 px-6 sm:p-4 rounded-lg text-white"
                      onClick={
                        company && company?.user === user?._id
                          ? toggleModal
                          : followCompany
                      }
                    >
                      {company && company?.user === user?._id ? (
                        <p>Edit</p>
                      ) : isfollow ? (
                        <FaUserMinus className="w-4 h-4" />
                      ) : (
                        <FaUserPlus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {company && company?.user === user?._id && (
                    <button
                      onClick={handleDeleteCompany}
                      className="xl:block lg:block md:block cursor-pointer capitalize font-medium hover:scale-105 bg-red-500 py-2 px-6 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-1 flex-wrap">
              <a href="#" className="xl:block lg:block md:block">
                <button
                  className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 p-2 sm:p-4 rounded-lg text-white"
                  onClick={
                    company && company?.user === user?._id
                      ? toggleModal
                      : followCompany
                  }
                >
                  {company && company?.user === user?._id ? (
                    <FaEdit className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : isfollow ? (
                    <FaUserMinus className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    <FaUserPlus className="w-4 h-4 sm:w-6 sm:h-6" />
                  )}
                </button>
              </a>
              {company && company?.user === user?._id && (
                <button
                  onClick={handleDeleteClick}
                  className="xl:block lg:block md:block cursor-pointer capitalize font-medium hover:scale-105 bg-red-500 p-2 sm:p-4 rounded-lg text-white"
                >
                  <FaTrash className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>
          </div>
          {/*mobile version*/}
          <div className="flex xl:hidden lg:hidden md:hidden flex-row sm:flex-row justify-between px-16 py-4 border-y-2 border-gray">
            <div className="flex-col items-center">
              <p className="text-base font-bold text-center dark:text-gray-200">
                {company?.challenges?.length}
              </p>
              <p className="text-zinc-500 text-md dark:text-gray-400">
                Challenges
              </p>
            </div>
            <div className="flex-col items-center">
              <p className="text-base font-bold text-center dark:text-gray-200">
                {company?.jobs?.length}
              </p>
              <p className="text-zinc-500 text-md dark:text-gray-400">Jobs</p>
            </div>
          </div>
          {/*mobile version*/}
          <EditCompanyModal
            open={openPostModal}
            handleClose={toggleModal}
            company={company}
          />
          <CompanyProfileNavigationTab
            changeValue={changeValue}
            value={value}
            companyId={companyId}
            userPassed={user}
            company={company}
          />
        </div>
      </div>

      {confirmationDialogOpen && (
        <DeletePagePopup
          open={confirmationDialogOpen}
          handleCancel={handleCancelDelete}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default CompanyProfileInformations;
