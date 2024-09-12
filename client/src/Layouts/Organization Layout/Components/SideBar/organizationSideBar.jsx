import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import YopexLogo from "../../../../assets/images/LogoYopex.png";
import organizationRoutes from "../../../../routes/OrganizationRoutes";
import OrganizationSidebarLinks from "./organizationLinks";
import WorkspaceSwitch from "../../../../Components/sidebar/components/WorkspaceSwitch";
import { useSelector } from "react-redux";
import Dropdown from "../../../../Components/dropdown";
import ProfileMenu from "../../../../Components/ProfileMenu/ProfileMenu";
import { NavLink, useLocation } from 'react-router-dom';
import WorkSpaceMenu from "../../../../Components/WorkspaceMenu/WorkSpaceMenu";
import SwitchCardWorkspace from "../../../../Components/Cards/SwitchCardWorkspace";
import SidebarCard from "../../../../Components/sidebar/components/SidebarCard";

const OrganizationSidebar = ({
  open,
  onClose,
  isRouteWithSpecificWidth,
  handleCreateClick,
  closeCreateMenuModal, onPostChallengeClick, onPostJobClick
}) => {
  const { currentOrganization } = useSelector((state) => state.organization);
  //console.log('current org', currentOrganization)
  const { user, error } = useSelector((state) => state.auth);
  //console.log('current user', user)

  const organizations = user?.organizations || [];
  const [currentWorkspace, setCurrentWorkspace] = useState({
    organizationName: currentOrganization?.organizationName,
    organizationLogo: currentOrganization?.organizationLogo,
  });

  const handleSwitch = (workspace) => {
    setCurrentWorkspace(workspace);
  };
  return (
    <div
    className={`sm:none duration-175 linear fixed  flex min-h-full flex-col bg-gray-950 pb-10 border-r-[1px] border-gray-100 shadow-2xl shadow-white/5 transition-all dark:bg-zinc-800 dark:text-white z-30  dark:border-zinc-700  ${
      open ? "translate-x-0" : "-translate-x-96"
    } ${isRouteWithSpecificWidth ? "w-[6.2rem]" : ""}`}
  >
   
       <div className={`py-[0.6rem] flex items-center justify-center justify-between pr-6`}>
      <div className={`mx-6 flex items-center`}>
        <div className="text-2xl capitalize font-bold dark:text-white text-white flex items-center gap-1 mt-2 hover:text-green-500">
          <img
              src={YopexLogo}
              alt="Yopex Logo"
              className="h-12 w-12 object-fill px-2 py-2"
              />
              YOPEXHUB
          </div>      
        </div>
        <span
          className="top-4 right-4 block cursor-pointer xl:hidden"
          onClick={onClose}
        >
          <HiX />
        </span>
      </div>
      <div className="relative px-6 focus:ring-offset-2 focus:ring-offset-zinc-800 w-full my-6">
        <Dropdown
          button={<SwitchCardWorkspace organization={currentOrganization}/>}
          children={
            <div>
              <WorkSpaceMenu
                currentLayout="UserLayout"
                currentWorkspace={currentWorkspace}
                organizations={organizations}
                onSwitch={handleSwitch}
              />  
            </div>
          }
          classNames={"relative inline-block text-left"}
        />
      </div>
      <ul className="mb-auto pt-1 flex flex-col justify-center">
        <OrganizationSidebarLinks
          routes={organizationRoutes}
          isRouteWithSpecificWidth={isRouteWithSpecificWidth}
          onPostChallengeClick={onPostChallengeClick}
          onPostJobClick={onPostJobClick}
        />
      </ul>
      <div className="flex justify-center mt-4">
        <SidebarCard
          isRouteWithSpecificWidth={isRouteWithSpecificWidth}
          handleCreateClick={handleCreateClick}
          closeCreateMenuModal={closeCreateMenuModal}
        />
      </div>
    </div>
  );
};

export default OrganizationSidebar;
