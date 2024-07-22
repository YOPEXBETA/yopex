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

    <div className="absolute left-4 z-10 w-56 origin-top-right dark:bg-zinc-700 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div className="py-1" role="none">
        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">
          {orgList?.map((organization) => (
          <div
            key={organization._id}
            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:text-white"
            onClick={() => handleOrganizationSwitch(organization)}
          >
            <img
              src={organization?.organizationLogo}
              alt={organization?.organizationName}
              className="h-5 w-5 mr-2"
            />
            <span>{organization?.organizationName}</span>
          </div>
        ))}</a>
      </div>
      <div className="py-1" role="none">
        <a href="#" className="block px-4 py-2 text-sm dark:text-white" role="menuitem" tabindex="-1" id="menu-item-3"  onClick={handleUserWorkspaceSwitch}> {currentLayout !== "UserLayout" && (
          <div
            className="flex items-center px-4 py-2 text-sm  cursor-pointer hover:bg-gray-100"
          >
            <img
              src={user?.picturePath}
              alt={`${user?.firstname} ${user?.lastname}`}
              className="h-8 w-8 rounded-full mr-2"
            />
            <span>{`${user?.firstname} ${user?.lastname}`}</span>
          </div>
      )}</a>
      </div>   
  </div>
    
  );
};

export default WorkSpaceMenu;

