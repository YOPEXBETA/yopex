import React, { useEffect, useState } from "react";
import { useFetchOrganizations } from "../../hooks/react-query/useCompany";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useUpdateUserWorkspace} from "../../hooks/react-query/useUsers";

// ==============================|| CODE ||============================== //

const WorkSpaceMenu = ({
  currentLayout,
  organizations,
  onSwitch,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: fetchedOrganizations } = useFetchOrganizations(organizations);
  const { user } = useSelector((state) => state.auth);
  const [orgList, setOrgList] = useState([]);
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

  const handleOrganizationSwitch = async (organization) => {
    try {
      await updateWorkspace.mutateAsync({
        workspace: 'Organization',
        organizationID: organization._id // Include the organization ID
      });

      onSwitch({
        organizationName: organization.organizationName,
        organizationLogo: organization.organizationLogo,
      });

      setNavigatePath(`/organization/${organization._id}/dashboard`);
    } catch (error) {
      // Handle any error that might occur during workspace update
      console.error("Failed to update workspace:", error.message);
    }
  };

  const handleUserWorkspaceSwitch = async () => {
    try {
      await updateWorkspace.mutateAsync({
        workspace: 'User',
        organizationID: null // Set organizationId to null for user workspace
      });

      setNavigatePath("/feed");
    } catch (error) {
      // Handle any error that might occur during workspace update
      console.error("Failed to update workspace:", error.message);
    }
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
