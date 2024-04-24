import React from "react";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import WorkCard from "../../../../Components/Cards/WorkCard";

const RecentJobs = () => {
  const { data: jobs, isLoading } = useJobs();

  const sortedJobs = jobs
    ? jobs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto container py-10 px-4 lg:px-24 md:px-11 dark:bg-zinc-800 bg-white  border-gray-500">
      <div className="mb-12 space-y-2 text-center">
        <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <span class="mb-2 block text-xl font-semibold text-indigo-600">
            Job Offers
          </span>
          <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Recent Job Opportunities
          </h2>
          <p class="text-base text-body-color dark:text-white">
            Explore Yopex's Latest Job Opportunities!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {sortedJobs?.slice(0, 6)?.map((job) => (
          <div key={job._id}>
            <WorkCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
