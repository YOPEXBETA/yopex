import React from "react";

const SwitchCardWorkspace = ({ user, isRouteWithSpecificWidth }) => {
  return (
    <div>
      <button
        type="button"
        className="inline-flex justify-center gap-x-1.5 rounded-md border-[1px] border-gray-200 px-3 py-4 text-sm hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <div className="flex items-center justify-between">
          <img
            className="w-8 h-8 rounded-full mr-4 object-cover"
            src={user?.picturePath}
            alt="Profile Image"
          />
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-start">
              {!isRouteWithSpecificWidth && (
                <>
                  <p className="dark:text-white font-medium">Current WorkSpace</p>
                  <h2 className="text-xs font-xs text-gray-400">
                    {`${user?.firstname} ${user?.lastname}`}
                  </h2>
                </>
              )}
            </div>
            {!isRouteWithSpecificWidth && (
              <svg
                className="w-5 h-5 ml-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default SwitchCardWorkspace;
