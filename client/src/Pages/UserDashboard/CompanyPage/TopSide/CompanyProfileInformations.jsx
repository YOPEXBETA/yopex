import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useOrganizationById, useDeleteCompany } from "../../../../hooks/react-query/useCompany";
import { useFollowCompany } from "../../../../hooks/react-query/useUsers";
import { EditCompanyModal } from "../../../../Components/shared/Modals/EditCompanyModal";
import { FaUserMinus, FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import { CompanyProfileNavigationTab } from "../../../../Components/Tabs/CompanyProfileNavigationTab";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import DeletePagePopup from "../../../../Components/Popup/DeletePagePopup";
import GlobeIcon from "../../../../Components/icons/GlobeIcon";

const CompanyProfileInformations = ({ changeValue, value }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const { organizationId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { mutate: followCompanyMutation } = useFollowCompany(user._id, organizationId);
  const { mutate: deleteCompanyMutation, isSuccess: isDeleteSuccess } = useDeleteCompany();

  const { data: organization, isLoading, isError } = useOrganizationById(organizationId);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (user.followings.includes(organizationId)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [user.followings]);

  useEffect(() => {
    if (isDeleteSuccess) {
      window.location = `/profile/${user._id}`;
    }
  }, [isDeleteSuccess, user._id]);

  const followCompany = () => {
    followCompanyMutation();
    setIsFollow((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCompanyMutation(organization._id);
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const toggleModal = () => {
    setOpenPostModal(!openPostModal);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error loading company data.</p>;
  }

  return (
      <div className="relative isolate overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {organization?.organizationBanner && (
              <img
                  src={organization.organizationBanner}
                  alt="Banner"
                  className="w-full h-full object-cover"
              />
          )}
        </div>

        <div className="relative z-10 md:pt-10 pt-6 flex flex-col justify-end dark:border-zinc-500 border-b">
          <div className="space-y-0 md:space-y-8 mx-auto container">
            <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row items-start md:items-center gap-0 pb-8 md:pb-0 md:gap-2 justify-between">
              <div className="flex lg:flex-row flex-row items-center gap-4">
                <div className="w-24 h-24 ml-2 mb-2 sm:w-40 sm:h-40">
                  <img
                      alt="Profile picture"
                      src={organization?.organizationLogo}
                      className="object-cover w-full h-full rounded-full"
                  />
                </div>

                <div className="space-y-1 md:space-y-3 xl:block md:flex lg:block flex flex-col bg-white bg-opacity-50 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold dark:text-gray-200">
                      {organization?.organizationName}
                    </p>

                    <button
                        className="flex items-center gap-1"
                        aria-label="verification badge"
                        disabled={!organization?.verified}
                    >
                      <FaCheckCircle
                          className={`text-${organization?.verified ? "green" : "gray"}-500 w-4 h-4 sm:w-5 sm:h-5 mb-[0.1rem] ${
                              !organization?.verified ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      />
                    </button>
                  </div>
                  <p className="text-base font-medium dark:text-gray-200">
                    {organization?.organizationType}
                  </p>
                  <div className="hidden xl:flex lg:flex md:flex flex-row sm:flex-row gap-6 sm:gap-4 md:w-full sm:w-72">
                    <a
                        className="text-base font-medium dark:text-white hover:text-green-500 dark:hover:text-500"
                        href={organization?.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <div className="flex gap-2">
                        <GlobeIcon className="w-6 h-6 mr-2" />
                        <p>{organization?.websiteURL}</p>
                      </div>
                    </a>
                  </div>
                  {/* Mobile version */}
                  <div className="flex gap-2 xl:hidden lg:hidden md:hidden">
                    <button
                        className="cursor-pointer capitalize font-medium hover:scale-105 bg-green-500 py-2 px-6 sm:p-4 rounded-lg text-white"
                        onClick={
                          organization && organization?.user === user?._id
                              ? toggleModal
                              : followCompany
                        }
                    >
                      {organization && organization?.user === user?._id ? (
                          <p>Edit</p>
                      ) : isFollow ? (
                          <FaUserMinus className="w-4 h-4" />
                      ) : (
                          <FaUserPlus className="w-4 h-4" />
                      )}
                    </button>
                    {organization && organization?.user === user?._id && (
                        <button
                            onClick={handleDeleteClick}
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
                        organization && organization?.user === user?._id
                            ? toggleModal
                            : followCompany
                      }
                  >
                    {organization && organization?.user === user?._id ? (
                        <FaEdit className="w-4 h-4 sm:w-6 sm:h-6" />
                    ) : isFollow ? (
                        <FaUserMinus className="w-4 h-4 sm:w-6 sm:h-6" />
                    ) : (
                        <FaUserPlus className="w-4 h-4 sm:w-6 sm:h-6" />
                    )}
                  </button>
                </a>
                {organization && organization?.user === user?._id && (
                    <button
                        onClick={handleDeleteClick}
                        className="xl:block lg:block md:block cursor-pointer capitalize font-medium hover:scale-105 bg-red-500 p-2 sm:p-4 rounded-lg text-white"
                    >
                      <FaTrash className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                )}
              </div>
            </div>
          </div>
          {/* Mobile version */}
          <div className="flex xl:hidden lg:hidden md:hidden flex-row sm:flex-row justify-between px-16 py-4 border-y-2 border-gray">
            <div className="flex-col items-center">
              <p className="text-base font-bold text-center dark:text-gray-200">
                {organization?.challenges?.length}
              </p>
              <p className="text-gray-500 text-md dark:text-gray-400">
                Challenges
              </p>
            </div>
            <div className="flex-col items-center">
              <p className="text-base font-bold text-center dark:text-gray-200">
                {organization?.jobs?.length}
              </p>
              <p className="text-gray-500 text-md dark:text-gray-400">Jobs</p>
            </div>
          </div>
          {/*mobile version*/}
          <EditCompanyModal
              open={openPostModal}
              handleClose={toggleModal}
              organization={organization}
          />
          <CompanyProfileNavigationTab
              changeValue={changeValue}
              value={value}
              organizationId={organizationId}
              userPassed={user}
              organization={organization}
          />
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
