import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import YopexLogo from "../../../../assets/icons/yopexPointIcon.png";
import organizationRoutes from "../../../../routes/OrganizationRoutes";
import OrganizationSidebarLinks from "./organizationLinks";
import WorkspaceSwitch from "../../../../Components/sidebar/components/WorkspaceSwitch";
import { useSelector } from "react-redux";
import Dropdown from "../../../../Components/dropdown";
import ProfileMenu from "../../../../Components/ProfileMenu/ProfileMenu";
import WorkSpaceMenu from "../../../../Components/WorkspaceMenu/WorkSpaceMenu";
import SwitchCardWorkspace from "../../../../Components/Cards/SwitchCardWorkspace";

const OrganizationSidebar = ({
  open,
  onClose,
  isRouteWithSpecificWidth,
  handleCreateClick,
  closeCreateMenuModal,
}) => {
  const { currentOrganization } = useSelector((state) => state.organization);
  const { user, error } = useSelector((state) => state.auth);
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
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:bg-zinc-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 border-r-[1px] border-gray-100 dark:border-zinc-700  ${
        open ? "translate-x-0" : "-translate-x-96"
      } ${isRouteWithSpecificWidth ? "w-[6.2rem]" : ""}`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-20 mt-[40px] flex items-center`}>
        <div className="flex items-center justify-center ">
          {isRouteWithSpecificWidth ? (
            <div className="absolute left-8 top-4 ">
              <img
                src={YopexLogo}
                alt="Yopex Logo"
                className="h-8 w-8 object-fill"
              />
            </div>
          ) : (
            <div className="mt-1 ml-1  font-poppins text-[26px] font-bold uppercase text-gray-700 dark:text-white">
              YOPEX <span className="font-medium">HUB</span>
            </div>
          )}
        </div>
      </div>
      <div className="relative ml-6 focus:ring-offset-2 focus:ring-offset-zinc-800 mt-4">
        <Dropdown
          button={<SwitchCardWorkspace user={user} />}
          children={
            <div>
              <WorkSpaceMenu
                currentWorkspace={currentWorkspace}
                organizations={organizations}
                onSwitch={handleSwitch}
              />
            </div>
          }
          classNames={"py-2 top-10 -right-[120px] w-max"}
        />
      </div>
      {/*<div className="px-4">
        <WorkspaceSwitch
          currentWorkspace={currentWorkspace}
          organizations={organizations}
          onSwitch={handleSwitch}
        />
      </div>*/}

      <div className="mt-6 mb-7 h-[1px] bg-gray-100 dark:bg-zinc-700" />
      {/* Nav item */}

      <ul className="mb-auto pt-1 flex flex-col justify-center">
        <OrganizationSidebarLinks
          routes={organizationRoutes}
          isRouteWithSpecificWidth={isRouteWithSpecificWidth}
        />
      </ul>
    </div>
  );
};

export default OrganizationSidebar;
