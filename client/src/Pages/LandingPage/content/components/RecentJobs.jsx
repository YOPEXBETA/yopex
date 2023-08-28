import React, { useState } from "react";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import JobCard from "../../../../Components/shared/cards/JobCard";

const RecentJobs = () => {
  const { data: jobs } = useJobs();
  const jobsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = currentPage * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = jobs?.slice(startIndex, endIndex);

  return (
    <div
      className="mx-auto py-10 lg:px-24 md:px-11 bg-white border-b-[1px] border-gray-500"
      id="about"
    >
      <div className="pb-8">
        <p className="text-4xl font-bold text-center text-black">Recent Jobs</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 sm:px-0 pb-16">
        {jobsToShow?.map((job) => (
          <div
            key={job._id}
            className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center overflow-x-auto">
        {Array?.from(
          { length: Math.ceil(jobs?.length / jobsPerPage) },
          (_, i) => (
            <div
              key={i}
              onClick={() => handlePageChange(i)}
              className={`${
                i === currentPage
                  ? "bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-400"
              } w-3 h-3 rounded-full mx-2 cursor-pointer`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
