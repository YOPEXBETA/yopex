import React, { useState } from "react";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import JobCard from "../../../../Components/Cards/JobCard";

const RecentJobs = () => {
  const jobsPerPage = 6;
  const { data: jobs, isLoading } = useJobs();
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = currentPage * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = jobs
    ?.slice(startIndex, endIndex)
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto container py-10 px-4 lg:px-24 md:px-11 dark:bg-zinc-800 bg-white  border-gray-500">
      <div class="mb-12 space-y-2 text-center">
        <h2 class="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Recent Job Opportunities
        </h2>
        <p class="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          Embark on Your Next Adventure: Explore Yopex's Latest Job
          Opportunities!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
