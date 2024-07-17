import React, {useState} from "react";
import { HiX } from "react-icons/hi";
import routes from "../../routes/MainRoutes";
import YopexLogo from "../../assets/images/LogoYopex.png";
import SidebarLinks from "./components/Links";
import SidebarCard from "./components/SidebarCard";
import WorkspaceSwitch from "./components/WorkspaceSwitch";
import {useSelector} from "react-redux";

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
          className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:bg-zinc-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 border-r-[1px] border-gray-100 dark:border-zinc-700  ${
              open ? "translate-x-0" : "-translate-x-96"
          } ${isRouteWithSpecificWidth ? "w-[6.2rem]" : ""}`}
      >
      <span
          className="absolute top-4 right-4 block cursor-pointer xl:hidden"
          onClick={onClose}
      >
        <HiX/>
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
                <div className="mt-1 ml-1  font-poppins text-[26px] font-bold uppercase text-zinc-700 dark:text-white">
                  YOPEX <span className="font-medium">HUB</span>
                </div>
            )}
          </div>
        </div>
        <div className="px-4">
          <WorkspaceSwitch
              currentLayout="UserLayout"
              currentWorkspace={currentWorkspace}
              organizations={organizations}
              onSwitch={handleSwitch}
          />
        </div>
        <div className="mt-6 mb-7 h-[1px] bg-gray-100 dark:bg-zinc-700"/>
        {/* Nav item */}

        <ul className="mb-auto pt-1 flex flex-col justify-center">
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
