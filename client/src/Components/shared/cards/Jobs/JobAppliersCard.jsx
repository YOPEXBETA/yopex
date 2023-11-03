import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApplierMenuIcon from "../../../../Pages/UserDashboard/CompanyPage/ContentSide/Components/MyAppliers/ApplierMenuIcon";
import JobAppliersModal from "./JobAppliersModal";

const JobAppliersCard = ({ job, onCardClick }) => {
  return (
    <div>
      <div
        className="flex w-full items-center justify-between rounded-lg bg-white  shadow-md shadow-shadow-500 dark:bg-zinc-700 hover:shadow-xl dark:shadow-none"
        onClick={() => onCardClick(job)}
      >
        <div className="flex items-center">
          <div className="">
            <img
              className="h-[83px] w-[83px] rounded-lg object-cover"
              src={job?.company?.companyLogo}
              alt="job"
            />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {job?.title}
            </p>
            <div className="flex felx-col gap-1">
              <p className="mt-2 text-sm text-gray-600 dark:text-green-500">
                {job?.appliers?.length}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-green-500">
                Appliers
              </p>
            </div>
          </div>
        </div>
        {/*<div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                  <div onClick={(e) => e.preventDefault()}>
                    <ApplierMenuIcon Applier={Applier} job={jobId} />
                  </div>
              </div>*/}
      </div>
    </div>
  );
};

export default JobAppliersCard;
