import React from "react";
import DashboardIcon from "../../../Components/icons/DashboardIcon";
import { Link, useLocation } from "react-router-dom";

export function AdminSideBarLinks(props) {
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes?.children?.map((route, index) => {
      return (
        <Link key={index} to={route.path}>
          <ul className="relative mb-5 flex items-center hover:cursor-pointer">
            <li
              className="my-[1px] flex cursor-pointer items-center px-8"
              key={index}
            >
              {!route.hideIcon && (
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-green-500 dark:text-white"
                      : "font-medium text-gray-400"
                  }`}
                >
                  {route.icon ? route.icon : <DashboardIcon />}
                </span>
              )}
              {/* Conditionally render the name based on the route and path */}
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute(route.path) === true
                    ? " font-medium dark:text-white text-green-500"
                    : "font-medium text-gray-400"
                }`}
              >
                {route?.name}
              </p>
            </li>
            {activeRoute(route.path) ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-green-500 dark:bg-green-500" />
            ) : null}
          </ul>
        </Link>
      );
    });
  };

  // BRAND
  return createLinks(routes);
}

export default AdminSideBarLinks;
