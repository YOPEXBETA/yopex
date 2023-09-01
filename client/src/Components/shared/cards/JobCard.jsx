import { formatDistance } from "date-fns";
import React, { useState } from "react";
//import Appliers from "./Appliers";

import { useSelector } from "react-redux";
import JobOfferModal from "../Modals/JobOfferModal";

const JobCard = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user } = useSelector((state) => state.auth);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <div
        onClick={toggleOpen}
        className="shadow-md border-green-500 border-b-2 rounded-lg bg-white hover:scale-102 duration-500 hover:shadow-green-500"
      >
        <div className="flex flex-col">
          <div className="bg- rounded-md p-4 h-full">
            <div className="flex justify-between flex-row-reverse mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <img
                  src={job.company.companyLogo}
                  alt="Icon"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-left">{job.title}</p>
                <p className="text-gray-500 mt-2 text-left">
                  By {job.company.companyName}
                </p>
              </div>
            </div>
            <div>
              <p className="text-md font-normal text-left mb-6 truncate w-80">
                {job.description.length > 100
                  ? `${job.description.substring(0, 150)} ....`
                  : job.description}
              </p>
            </div>
            <div>
              {/* <p className="text-lg  text-left font-bold">Published</p> */}
              <p className="text-md  text-left font-normal text-green-500">
                {formatDistance(new Date(job.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Additional static content for other cards can be added similarly */}
      <JobOfferModal open={isOpen} handleClose={handleClose} job={job} />
    </div>
  );
};

export default JobCard;
