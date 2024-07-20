import React from "react";

const SwitchCardWorkspace = ({ user }) => {
  return (
    <div className="flex items-center justify-between">
      <img
        className="w-12 h-12 rounded-full mr-4"
        src={user?.picturePath}
        alt="Profile Image"
      />
      <div className="flex items-center gap-8">
      <div>
        <h2 className="text-md font-medium">
          {`${user?.firstname} ${user?.lastname}`}
        </h2>
        <p className="text-gray-600">Current Workspace</p>
      </div>
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
      </div>
    </div>
  );
};

export default SwitchCardWorkspace;
