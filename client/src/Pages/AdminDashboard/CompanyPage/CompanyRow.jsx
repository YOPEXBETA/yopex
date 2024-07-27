import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../Components/dropdown";
import HorizontalDotsIcon from "../../../Components/icons/HorizontalDotsIcon";
import AdminCompanyTableMenuItem from "../../../Components/MenuIcons/AdminCompanyTableMenuItem";

const CompanyRow = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <tr
      key={company._id}
      className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
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
        <Link to={`/organization/${company._id}`} className="flex items-center">
          <div className="lg:w-1/6">
            <img
              src={company.companyLogo}
              className="w-10 h-10 rounded-lg bg-green-500"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm dark:text-gray-200">
              {company.companyName}
            </span>
          </div>
        </Link>
      </td>

      <td className="text-sm dark:text-gray-200"> {company.jobs.length}</td>

      <td className="text-sm dark:text-gray-200">
        {company.challenges.length}
      </td>

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

      <td className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
        <Dropdown
          button={
            <div className="absolute right-0 top-0 bottom-0">
              <HorizontalDotsIcon className="cursor-pointer text-center" />
            </div>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <AdminCompanyTableMenuItem
              companyId={company._id}
              company={company}
            />
          }
          classNames={"py-2 top-4 right-0"}
        />
      </td>
    </tr>
  );
};

export default CompanyRow;
