import React, { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useApproveCompany } from "../../../hooks/react-query/useCompany";

const CompanyTableMenuItem = ({ companyId }) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useApproveCompany();

  const handleClick = (event) => setOpen(!open);

  const handleApprove = () => {
    mutate(companyId);
  };

  return (
    <div className="relative">
      <button onClick={handleClick} className="focus:outline-none">
        <BsThreeDotsVertical className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            onClick={handleApprove}
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:outline-none w-full"
          >
            <FaCheck className="h-5 w-5 mr-2 text-primary text-green-500" />
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyTableMenuItem;
