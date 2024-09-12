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
import LocationIcon from "../../../../Components/icons/LocationIcon";
import WebIcon from "../../../../Components/icons/WebIcon";

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
        <div>
          <div className="relative  w-full h-48 bg-white rounded-lg shadow-lg overflow-hidde mb-16">
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
          <img src={organization?.organizationBanner} alt={organization?.organizationName} className="w-full object-cover"/>
          <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black w-full">
          </div>
        </div>
      <div className="absolute flex space-x-4 transform translate-x-6 translate-y-20">
        <div className="w-36 h-36 rounded-lg border-4 border-white shadow-lg object-fill overflow-hidden bg-white">
          <img src={organization.organizationLogo}  alt={organization?.organizationName}/>
        </div>
      
        <div className="text-white pt-16 space-y-1">
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
        </div>
    </div>
            </div> 
          <CompanyProfileNavigationTab
              changeValue={changeValue}
              value={value}
              organizationId={organizationId}
              userPassed={user}
              organization={organization}
          />

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
