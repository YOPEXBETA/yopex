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
            ? "bg-green-50 rounded-lg"
            : " dark:text-green-500"
        }`}
        onClick={() => changeValue(0)}
      >
        <div className="flex items-center gap-4">
          <p className="flex-auto hidden md:block">Workspace Info</p>
        </div>
      </button>

      <button
        className={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-green-50 ${
          value === 1
          ? "bg-green-50 rounded-lg"
          : " dark:text-green-500"
        }`}
        onClick={() => changeValue(1)}
      >
        <div className="flex items-center gap-4">
          <p className="flex-auto hidden md:block">Members</p>
        </div>
      </button>

      <button
        className={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-green-50 ${
          value === 2
          ? "bg-green-50 rounded-lg"
          : " dark:text-green-500"
        }`}
        onClick={() => changeValue(2)}
      >
        <div className="flex items-center gap-4">
        <p className="flex-auto hidden md:block">Social Links</p>
        </div>
      </button>
    </div>
  );
};

export default VerticalSettingsTab;
