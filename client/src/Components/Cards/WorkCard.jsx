import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./index";
import JobOfferModal from "../shared/Modals/JobOfferModal";
import PostMenuIcon from "../../Pages/UserDashboard/CompanyPage/ContentSide/Components/MyJobs/Components/JobMenuIcon";

const WorkCard = ({ job, extra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user } = useSelector((state) => state.auth);
  const handleClose = () => setIsOpen(false);

  console.log(job);
  return (
    <Card>
      <div
        onClick={toggleOpen}
        className=" flex flex-col sm:flex-row gap-3 sm:items-end justify-between px-5 py-4 rounded-md"
      >
        <div className="flex gap-4">
          <img
            src={job?.company?.companyLogo}
            alt="Icon"
            className="w-16 h-16 rounded-lg object-contain hidden md:block lg:block"
          />
          <div>
            <h3 className="font-bold mt-px">{job?.title}</h3>

            <div className="flex items-center gap-3 mt-2">
              <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                {job?.jobType}
              </span>
              <span className="text-slate-600 text-sm flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job?.offerType}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button className="font-medium p-2 rounded-md flex">
            {user?.companies?.includes(job?.company._id) ? (
              <div onClick={(e) => e.stopPropagation()}>
                <PostMenuIcon post={job} />
              </div>
            ) : (
              <p></p>
            )}
          </button>
        </div>
      </div>
      <JobOfferModal open={isOpen} handleClose={handleClose} job={job} />
    </Card>
  );
};

export default WorkCard;
