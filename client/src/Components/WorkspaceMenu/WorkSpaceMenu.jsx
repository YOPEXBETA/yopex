import React, { useEffect, useState } from "react";
import { useFetchOrganizations } from "../../hooks/react-query/useCompany";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ==============================|| CODE ||============================== //

const WorkSpaceMenu = ({
  currentLayout,
  currentWorkspace,
  organizations,
  onSwitch,
}) => {
  const navigate = useNavigate();
  const { data: fetchedOrganizations } = useFetchOrganizations(organizations);
  const { user } = useSelector((state) => state.auth);
  const [orgList, setOrgList] = useState([]);

  useEffect(() => {
    if (fetchedOrganizations) {
      setOrgList(fetchedOrganizations);
    }
  }, [fetchedOrganizations]);

  const handleOrganizationSwitch = async (organization) => {
    navigate(`/organization/${organization._id}/dashboard`);
    onSwitch({
      organizationName: organization.organizationName,
      organizationLogo: organization.organizationLogo,
    });
  };

  const handleUserWorkspaceSwitch = () => {
    navigate("/feed");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex w-56 flex-col rounded-[20px] bg-white py-2 shadow-xl shadow-shadow-500 dark:!bg-zinc-700 dark:text-white dark:shadow-none">
      <hr className="border-gray-200 dark:border-gray-400" />

      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold">Switch to an organization</h2>
        {orgList?.map((organization) => (
          <div
            key={organization?._id}
            className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => handleOrganizationSwitch(organization)}
          >
            <img
              src={organization?.organizationLogo}
              alt={organization?.organizationName}
              className="h-5 w-5 mr-2"
            />
            <span>{organization?.organizationName}</span>
          </div>
        ))}
      </div>

      {currentLayout !== "UserLayout" && (
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold">
            Switch to individual workspace:
          </h2>
          <div
            className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={handleUserWorkspaceSwitch}
          >
            <img
              src={user?.picturePath}
              alt={`${user?.firstname} ${user?.lastname}`}
              className="h-8 w-8 rounded-full mr-2"
            />
            <span>{`${user?.firstname} ${user?.lastname}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSpaceMenu;
