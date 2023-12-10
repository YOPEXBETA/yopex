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
      <div class="mb-12 space-y-2 text-center">
        <h2 class="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Recent Job Opportunities
        </h2>
        <p class="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          Embark on Your Next Adventure: Explore Yopex's Latest Job
          Opportunities!
        </p>
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
