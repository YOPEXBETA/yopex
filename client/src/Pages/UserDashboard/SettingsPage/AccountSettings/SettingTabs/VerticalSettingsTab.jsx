import React from "react";
import PersonalInfoIcon from "../../../../../Components/icons/PersonalInfoIcon";
import SecurityIcon from "../../../../../Components/icons/SecurityIcon";
import LinkIcon from "../../../../../Components/icons/LinkIcon";

const VerticalSettingsTab = ({ changeValue, value }) => {
  return (
    <div className="flex md:flex-col">
      <button
        className={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-green-50 ${
          value === 0
            ? "bg-green-300  border border-green-500 rounded-lg"
            : " dark:text-green-500"
        }`}
        onClick={() => changeValue(0)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0">
            <PersonalInfoIcon />
          </div>
          <p className="flex-auto hidden md:block">Personal Information</p>
        </div>
      </button>

      <button
        className={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-green-50 ${
          value === 1
            ? "bg-green-300  border border-green-500 rounded-lg"
            : " dark:text-green-500"
        }`}
        onClick={() => changeValue(1)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0">
            <LinkIcon />
          </div>
          <p className="flex-auto hidden md:block">Social Links</p>
        </div>
      </button>

      <button
        className={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-green-50 ${
          value === 2
            ? "bg-green-300  border border-green-500 rounded-lg"
            : " dark:text-green-500"
        }`}
        onClick={() => changeValue(2)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0">
            <SecurityIcon />
          </div>
          <p className="flex-auto hidden md:block">Security</p>
        </div>
      </button>

      {/* <button
        className={`w-52 text-left py-3 px-4 focus:outline-none ${
          value === 3
            ? "bg-green-200 text-green-500 border border-green-500 rounded-lg"
            : "text-gray-500 dark:text-green-500  dark:border-zinc-600"
        }`}
        onClick={() => changeValue(3)} // Pass 3 to changeValue for the third tab
      >
        Experience & Education
      </button>
   */}
    </div>
  );
};

export default VerticalSettingsTab;
