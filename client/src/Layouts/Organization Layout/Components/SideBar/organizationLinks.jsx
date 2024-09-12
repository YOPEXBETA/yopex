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
            <Link key={index} to={route.path}>

            <ul className="relative mb-2 flex items-center hover:cursor-pointer">

            <li
                key={index}
                className="my-[6px] flex cursor-pointer items-center px-6"
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
              
                {activeRoute(route.path) ? (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-green-500 dark:bg-green-500"/>
                ) : null}
            </li>
        </ul>
    </Link>
        );
      }
    });
  };

    // BRAND
    return createLinks(routes);
}

export default OrganizationSidebarLinks;
