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
      className="mx-auto py-10 lg:px-24 md:px-11 bg-white dark:bg-zinc-800 border-b-[1px] border-gray-500"
      id="about"
    >
      <div className="pb-8">
        <p className="text-4xl font-bold text-center text-black dark:text-white">Recent Jobs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {jobsToShow?.map((job) => (
          <div key={job._id}>
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
                  ? "bg-gray-800 dark:bg-green-500"
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
