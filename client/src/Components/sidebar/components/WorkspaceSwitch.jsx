import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useFetchOrganizations } from "../../../hooks/react-query/useCompany";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkspaceSwitch = ({
  currentLayout,
  currentWorkspace,
  organizations,
  onSwitch,
}) => {
  const { data: fetchedOrganizations } = useFetchOrganizations(organizations);
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  console.log("orgs", fetchedOrganizations);
  const [orgCategories, setOrgCategories] = useState({
    Company: [],
    University: [],
    Club: [],
    NGO: [],
  });
  console.log("pic", currentWorkspace.picturePath);
  console.log("user", user);

  // Fetch organizations based on IDs
  useEffect(() => {
    // Categorize organizations when fetchedOrganizations changes
    if (fetchedOrganizations) {
      const categorizedOrgs = {
        Company: [],
        University: [],
        Club: [],
        NGO: [],
      };

      fetchedOrganizations.forEach((org) => {
        switch (org?.organizationType) {
          case "Company":
            categorizedOrgs.Company.push(org);
            break;
          case "University":
            categorizedOrgs.University.push(org);
            break;
          case "Club":
            categorizedOrgs.Club.push(org);
            break;
          case "Non-Governmental Organization":
            categorizedOrgs.NGO.push(org);
            break;
          default:
            break;
        }
      });

      setOrgCategories(categorizedOrgs);
    }
  }, [fetchedOrganizations]);

  const handleOrganizationSwitch = async (organization) => {
    navigate(`/organization/${organization._id}/dashboard`);
    onSwitch({
      organizationName: organization.organizationName,
      organizationLogo: organization.organizationLogo,
    });
  };
  const handleUserWorkspaceSwitch = () => {
    navigate("/feed");
  };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-64 rounded-md border
                border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {currentLayout === "UserLayout"
                        ? `${user.firstname} ${user.lastname}`
                        : currentWorkspace.organizationName}<ChevronDownIcon className="ml-2 h-5 w-5" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    anchor="bottom start"
                    className="absolute right-0 mt-2 w-64 origin-top-right bg-white divide-y divide-gray-100
                    rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    style={{ top: "-10px" }}
                >
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={`${
                                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                    } block px-4 py-2 text-sm cursor-pointer`}
                                >
                                    <p>You are now in the workspace of:</p>
                                    <div className="flex items-center">
                                        <img
                                            src={currentLayout === "UserLayout" ? user.picturePath : currentWorkspace.organizationLogo}
                                            alt={currentLayout === "UserLayout" ? `${user.firstname} ${user.lastname}` : currentWorkspace.organizationName}
                                            className="h-8 w-8 rounded-full mr-2"
                                        />
                                        <div>
                                            {currentLayout === "UserLayout"
                                                ? `${user.firstname} ${user.lastname}`
                                                : currentWorkspace.organizationName}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Items
                            anchor="bottom start"
                            className="absolute right-0 mt-2 w-56 origin-top-right
                            bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black
                            ring-opacity-5 focus:outline-none z-50"
                            style={{ top: "-10px" }}
                        >
                        </Menu.Items>


                        {["Company", "University", "Club", "NGO"].map((category) => (
                            <Menu.Section key={category}>
                                <Menu.Heading className="text-sm ml-2">
                                    Switch to a {category}
                                </Menu.Heading>
                                {orgCategories[category].map((organization) => (
                                    <Menu.Item key={organization.id}>
                                        <div
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                handleOrganizationSwitch(organization)
                                            }
                                        >
                                            <img
                                                src={organization.organizationLogo}
                                                alt={organization.organizationName}
                                                className="h-5 w-5 mr-2"
                                            />
                                            <span>{organization.organizationName}</span>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.Section>
                        ))}
                        {currentLayout !== "UserLayout" && (
                            <Menu.Section>
                                <Menu.Heading className="text-sm  ml-2">Switch to individual workspace:</Menu.Heading>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={`${
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                        } block px-4 py-2 text-sm cursor-pointer`}
                                        onClick={handleUserWorkspaceSwitch}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={user.picturePath}
                                                alt={`${user.firstname} ${user.lastname}`}
                                                className="h-8 w-8 rounded-full mr-2"
                                            />
                                            <div>
                                                {user.firstname} {user.lastname}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Menu.Item>
                            </Menu.Section>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default WorkspaceSwitch;
