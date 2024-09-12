import React from "react";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";

const SwitchCardWorkspace = ({ user, organization, isRouteWithSpecificWidth }) => {
    const displayName = user ? `${user.firstname} ${user.lastname}` : organization?.organizationName;
    const picturePath = user ? user.picturePath : organization?.organizationLogo;

    return (
        <div>
            <button
                type="button"
                className="inline-flex justify-center gap-x-1.5 rounded-md border-[1px] border-gray-500 px-3 py-4 text-sm hover:bg-green-800 dark:hover:bg-green-800"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
            >
                <div className="flex items-center gap-2 justify-between">
                    <img
                        alt="avatar"
                        src={picturePath || AvatarProfile}
                        className="rounded-full object-cover w-9 h-9 border-gray-200 border"
                    />
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-start">
                            {!isRouteWithSpecificWidth && (
                                <>
                                    <p className="dark:text-white text-white font-medium">
                                        {user ? "Current Workspace" : "Current Organization"}
                                    </p>
                                    <h2 className="text-xs font-xs text-gray-400">
                                        {displayName}
                                    </h2>
                                </>
                            )}
                        </div>
                        {!isRouteWithSpecificWidth && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-400 shrink-0"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M8 9l4 -4l4 4"></path>
                                <path d="M16 15l-4 4l-4 -4"></path>
                            </svg>
                        )}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default SwitchCardWorkspace;
