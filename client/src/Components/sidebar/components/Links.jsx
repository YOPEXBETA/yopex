/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import DashIcon from "../../icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes, isRouteWithSpecificWidth } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes?.children?.map((route, index) => {
      if (!route.hideInSidebar) {
        return (
          <Link key={index} to={route.path}>
            <ul className="relative mb-3 flex items-center hover:cursor-pointer">
              <li
                className="my-[6px] flex cursor-pointer items-center px-8"
                key={index}
              >
                {!route.hideIcon && (
                  <span
                    className={`${
                      activeRoute(route.path) === true
                        ? "font-bold text-green-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                )}
                {/* Conditionally render the name based on the route and path */}
                {!isRouteWithSpecificWidth && (
                  <p
                    className={`leading-1 ml-4 flex ${
                      activeRoute(route.path) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route?.name}
                  </p>
                )}
              </li>
              {activeRoute(route.path) ? (
                <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-green-500 dark:bg-brand-400" />
              ) : null}
            </ul>
          </Link>
        );
      }
    });
  };

  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
