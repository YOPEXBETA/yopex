import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { NavLink, useLocation } from 'react-router-dom';
import routes from "../../routes/MainRoutes";
import YopexLogo from "../../assets/images/LogoYopex.png";
import SidebarLinks from "./components/Links";
import SidebarCard from "./components/SidebarCard";
import WorkspaceSwitch from "./components/WorkspaceSwitch";
import { useSelector } from "react-redux";
import Dropdown from "../dropdown";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import WorkSpaceMenu from "../WorkspaceMenu/WorkSpaceMenu";
import SwitchCardWorkspace from "../Cards/SwitchCardWorkspace";

const Sidebar = ({
  open,
  onClose,
  isRouteWithSpecificWidth,
  handleCreateClick,
  closeCreateMenuModal,
}) => {
  const { user, error } = useSelector((state) => state.auth);

  const organizations = user?.organizations || [];
  const [currentWorkspace, setCurrentWorkspace] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    picturePath: user?.picturePath,
  });

  const handleSwitch = (workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div
      className={`sm:none duration-175 linear fixed  flex min-h-full flex-col bg-gradient-to-l from-zinc-800 to-black pb-10 border-r-[1px] border-gray-100 shadow-2xl shadow-white/5 transition-all dark:bg-zinc-800 dark:text-white z-30  dark:border-zinc-700  ${
        open ? "translate-x-0" : "-translate-x-96"
      } ${isRouteWithSpecificWidth ? "w-[6.2rem]" : ""}`}
    >
     

      <div className={`py-[0.6rem] flex items-center justify-center justify-between pr-6`}>
      <NavLink to="/overview">
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
        </NavLink>
        <span
          className="top-4 right-4 block cursor-pointer xl:hidden text-white"
          onClick={onClose}
        >
          <HiX />
        </span>
      </div>
      <div className="relative px-6 focus:ring-offset-2 focus:ring-offset-zinc-800 w-full my-6">
        <Dropdown
          button={<SwitchCardWorkspace user={user}  
          isRouteWithSpecificWidth={isRouteWithSpecificWidth}/>}
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

      <ul className="mb-auto flex flex-col justify-center">
        <SidebarLinks
          routes={routes}
          isRouteWithSpecificWidth={isRouteWithSpecificWidth}
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

export default Sidebar;
