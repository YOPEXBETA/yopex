import React from "react";
import Card from "./index";

const JobAppliersCard = ({ job, onCardClick, extra }) => {
  return (
    <Card extra={`${extra}`}>
      <div
        className="flex w-full items-center justify-between"
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
    </Card>
  );
};

export default JobAppliersCard;
