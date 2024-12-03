import React from "react";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import WorkCard from "../../../../Components/Cards/WorkCard";
import NoContentAvailable from "../../../../assets/images/NoContent.png";

const RecentJobs = () => {
  const { data: jobs, isLoading } = useJobs();

  const sortedJobs = jobs
    ? jobs
        .slice(0, 6)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      id="jobs"
      className="bg-gray-100 dark:bg-zinc-600 pb-8 pt-20 lg:pb-[70px] py-10 px-4 lg:px-24 md:px-11"
    >
      <div className="mb-12 space-y-2 text-center">
        <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Recent Jobs
          </h2>
          <p className="text-lg dark:text-white">
            Explore Yopex's Latest Job Opportunities!
          </p>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : sortedJobs?.length > 0 ? (
          sortedJobs?.map((job) => (
            <div key={job._id} className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
              <WorkCard job={job} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
          <img src={NoContentAvailable} className="h-60 w-60"/>
        </div>
        )}
      </div>
    </div>

    
  );
};

export default RecentJobs;
