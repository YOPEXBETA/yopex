import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useApproveCompany } from "../../hooks/react-query/useCompany";

const AdminCompanyTableMenuItem = ({ companyId, company }) => {
  const { mutate } = useApproveCompany();
  const handleApprove = () => {
    mutate(companyId);
  };

  return (
    <div>
      <ul className="absolute right-0 z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white dark:bg-zinc-700 p-2 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
        <li
          onClick={handleApprove}
          className="block w-full hover:bg-gray-300 cursor-pointer select-none rounded-md px-3 pt-2 pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="flex items-center gap-2">
            <FaCheck className="h-5 w-5 mr-2 text-primary text-green-500" />
            <p className="font-medium">Approve</p>
          </div>
        </li>

        <li className="block w-full cursor-pointer hover:bg-gray-300 select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
          <a href={company.companyDocument ? company.companyDocument : "#"}>
            <div className="flex items-center gap-2">
              <FaCheck className="h-5 w-5 mr-2 text-primary text-green-500" />
              <p className="font-medium"> See Document</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminCompanyTableMenuItem;
