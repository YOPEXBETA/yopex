import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "../../../../Components/icons/DashIcon";
import { AiOutlinePlus } from "react-icons/ai";

export function OrganizationSidebarLinks(props) {
  let location = useLocation();

  const { routes, isRouteWithSpecificWidth, onPostChallengeClick, onPostJobClick  } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes?.children?.map((route, index) => {
      if (!route.hideInSidebar) {
        return (
            <li
                key={index}
                className="relative flex items-center my-[6px] mb-3 px-6 cursor-pointer group"
            >
                <Link to={route.path} className="flex items-center w-full">
                    {!route.hideIcon && (
                        <span
                            className={`${
                                activeRoute(route.path) === true
                                    ? "font-bold text-green-500 dark:text-white"
                                    : "font-medium text-gray-400"
                            }`}
                        >
                  {route.icon ? route.icon : <DashIcon/>}{" "}
                </span>
                    )}
                    {!isRouteWithSpecificWidth && (
                        <p
                            className={`leading-1 ml-4 flex ${
                                activeRoute(route.path) === true
                                    ? "font-medium dark:text-white text-green-500"
                                    : "font-medium text-gray-400"
                            }`}
                        >
                            {route?.name}
                        </p>
                    )}
                </Link>
                {(route.name === "Challenges" || route.name === "Jobs") && (
                    <div className="relative ml-auto flex items-center">
                <span
                    className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-500 bg-white text-green-500 shadow-lg transition-transform duration-300 transform group-hover:scale-110 group-hover:shadow-xl"
                    onClick={route.name === "Challenges" ? onPostChallengeClick : onPostJobClick}>
                  <AiOutlinePlus size={24}/>
                  <div
                      className="absolute left-full bottom-1/2 transform -translate-y-1/2 hidden group-hover:block bg-gray-700 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap z-20">
                    {route.name === "Challenges" ? "Post Challenge" : "Post Job"}
                  </div>
                </span>
                    </div>
                )}
                {activeRoute(route.path) ? (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-green-500 dark:bg-green-500"/>
                ) : null}
            </li>
        );
      }
    });
  };

    // BRAND
    return createLinks(routes);
}

export default OrganizationSidebarLinks;
