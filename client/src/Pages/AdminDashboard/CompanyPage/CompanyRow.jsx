import React, { useState } from "react";
import { Link } from "react-router-dom";
import CompanyTableMenuItem from "./CompanyTableMenuItem";

const CompanyRow = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <tr
      key={company._id}
      className="hover:bg-gray-50 bg-white"
      onClick={(event) => {
        if (
          !(
            event.target.closest("td") === event.currentTarget.cells[0] ||
            event.target.closest("td") === event.currentTarget.cells[1] ||
            event.target.closest("td") === event.currentTarget.cells[2]
          )
        ) {
          return; // exit the function if the click is not on the first three cells
        }
        toggleOpen();
      }}
    >
      <td className="py-4 px-4">
        <Link to={`/company/${company._id}`} className="flex items-center">
          <div className="lg:w-1/6">
            <img
              src={company.companyLogo}
              className="w-10 h-10 rounded-lg bg-green-500"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold"> {company.companyName}</span>
          </div>
        </Link>
      </td>

      <td className="text-sm text-left"> {company.jobs.length}</td>

      <td className="text-sm text-left"> {company.challenges.length}</td>

      <td
        className={`font-bold text-white text-xs mt-5 py-2 px-3 rounded-full inline-block ${
          company.verified === true
            ? "bg-green-500"
            : company.verified === false
            ? "bg-red-500"
            : ""
        }`}
      >
        {company.verified ? "Verified" : "Not Verified"}
      </td>

      <td className="py-4 px-4 text-right">
        <CompanyTableMenuItem companyId={company._id} company={company} />
      </td>
    </tr>
  );
};

export default CompanyRow;
