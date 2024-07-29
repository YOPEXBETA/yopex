import React, { useEffect, useState } from "react";
import { useFetchOrganizations } from "../../hooks/react-query/useCompany";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserWorkspace } from "../../hooks/react-query/useUsers";

// ==============================|| CODE ||============================== //

const WorkSpaceMenu = ({
  currentLayout,
  currentWorkspace,
  organizations,
  onSwitch,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: fetchedOrganizations } = useFetchOrganizations(organizations);
  const { user } = useSelector((state) => state.auth);
  const [orgList, setOrgList] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(currentWorkspace);
  const updateWorkspace = useUpdateUserWorkspace(user?._id);
  const [navigatePath, setNavigatePath] = useState(null);

  useEffect(() => {
    if (fetchedOrganizations) {
      setOrgList(fetchedOrganizations);
    }
  }, [fetchedOrganizations]);

  useEffect(() => {
    if (navigatePath) {
      navigate(navigatePath);
      setNavigatePath(null);
    }
  }, [navigatePath, navigate]);

  useEffect(() => {
    setSelectedWorkspace(currentWorkspace);
  }, [currentWorkspace]);

  const handleOrganizationSwitch = async (organization) => {
    try {
      await updateWorkspace.mutateAsync({
        workspace: 'Organization',
        organizationID: organization._id
      });

      onSwitch({
        organizationName: organization.organizationName,
        organizationLogo: organization.organizationLogo,
      });

      setSelectedWorkspace(organization._id); // Update selectedWorkspace to organization ID
      setNavigatePath(`/organization/${organization._id}/dashboard`);
    } catch (error) {
      console.error("Failed to update workspace:", error.message);
    }
  };

  const handleUserWorkspaceSwitch = async () => {
    try {
      await updateWorkspace.mutateAsync({
        workspace: 'User',
        organizationID: null
      });

      setSelectedWorkspace(null); // Update selectedWorkspace to null
      setNavigatePath("/feed");
    } catch (error) {
      console.error("Failed to update workspace:", error.message);
    }
  };


  return (
    <div className="absolute left-4 z-10 w-56 origin-top-right dark:bg-zinc-700 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
      <div className="py-1" role="none">
        {orgList?.map((organization) => (
          <div
            key={organization._id}
            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:text-white"
            onClick={() => handleOrganizationSwitch(organization)}
          >
            <input
              type="radio"
              id={`org-${organization._id}`}
              name="workspace"
              value={`Organization-${organization._id}`}
              checked={selectedWorkspace === organization._id} // Correctly checked based on organization ID
              onChange={() => handleOrganizationSwitch(organization)} // This might be redundant
              className="mr-2"
            />
            <img
              src={organization?.organizationLogo}
              alt={organization?.organizationName}
              className="h-5 w-5 mr-2"
            />
            <span>{organization?.organizationName}</span>
          </div>
        ))}
      </div>
      <div className="py-1" role="none">
        <div
          className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
          onClick={handleUserWorkspaceSwitch}
        >
          <input
            type="radio"
            id="user-workspace"
            name="workspace"
            value="User"
            checked={selectedWorkspace === null} // Correctly checked for user workspace
            onChange={handleUserWorkspaceSwitch} // This might be redundant
            className="mr-2"
          />
          <>
            <img
              src={user?.picturePath}
              alt={`${user?.firstname} ${user?.lastname}`}
              className="h-8 w-8 rounded-full mr-2"
            />
            <span>{`${user?.firstname} ${user?.lastname}`}</span>
          </>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceMenu;
