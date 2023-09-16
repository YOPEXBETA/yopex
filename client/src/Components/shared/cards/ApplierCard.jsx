import { formatDistance } from "date-fns";
import React, { useState } from "react";
import { useJobById, useJobs } from "../../../hooks/react-query/useJobs";




const ApplierCard = ({ Applier,jobId }) => {
console.log(jobId);

console.log(Applier);
  return (
    <div>
      <div
        className="shadow-md border-green-500 border-b-2 rounded-lg bg-white hover:scale-102 duration-500 hover:shadow-green-500"
      >
        <div className="flex flex-col">
          <div className="bg- rounded-md p-4 h-full">
            <div className="flex justify-between flex-row-reverse mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <img
                  src={Applier.picturePath}
                  alt="Icon"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="text-gray-500 mt-2 text-left">
                   {Applier.lastname} {Applier.firstname}
                </p>
                <p className="text-gray-500 text-left">
                  Applier for the job : {jobId.title}
                </p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplierCard;
