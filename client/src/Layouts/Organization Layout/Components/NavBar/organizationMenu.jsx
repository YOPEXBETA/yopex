import React from "react";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../../../redux/auth/authSlice";


// ==============================|| CODE ||============================== //

const OrganizationProfileMenu = () => {
    const navigate = useNavigate();
    const currentOrganization = useSelector((state) => state.organization.currentOrganization);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <div className="flex w-56 flex-col rounded-[20px] bg-white py-2 shadow-xl shadow-shadow-500 dark:!bg-zinc-700 dark:text-white dark:shadow-none">
            <a
                href={`/organization/${currentOrganization?._id}/organizationProfile`}
                className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                {currentOrganization?.organizationLogo ? (
                    <img
                        alt="picture"
                        src={currentOrganization?.organizationLogo}
                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border"
                    />
                ) : (
                    <img
                        alt="default"
                        src={AvatarProfile}
                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border"
                    />
                )}
                <div className="mx-1">
                    <h1 className="text-sm font-semibold text-black dark:text-gray-200">
                        {currentOrganization?.organizationName}
                    </h1>
                </div>
            </a>
            <hr className="border-gray-200 dark:border-gray-400 " />

            <a
                href="#"
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                View Profile
            </a>
            <hr className="border-gray-200 dark:border-gray-400" />
            <a
                href="/"
                onClick={handleLogout}
                className="block px-4 py-3 text-sm text-red-500 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                Sign Out
            </a>
        </div>
    );
};

export default OrganizationProfileMenu;
