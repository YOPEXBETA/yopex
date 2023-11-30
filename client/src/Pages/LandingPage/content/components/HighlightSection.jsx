import React from "react";
import { useStat } from "../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const HighlightSection = () => {
  const { data, isLoading } = useStat();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="dark:bg-zinc-800">
      <div class=" max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pt-16 ">
        <div class="py-8    border-y border-gray-100 dark:border-transparent sm:flex justify-between flex-wrap">
          <div class="text-left w-full sm:w-1/2 md:w-1/4">
            <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
              {data?.countusers}
            </h6>
            <p class="mt-2 text-gray-500 dark:text-white">Registered users</p>
          </div>
          <div class="text-left w-full sm:w-1/2 md:w-1/4">
            <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
              {data?.countcompanies}
            </h6>
            <p class="mt-2 text-gray-500 dark:text-white">
              Registered companies
            </p>
          </div>
          <div class="text-left w-full sm:w-1/2 md:w-1/4">
            <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
              {data?.countjobs}
            </h6>
            <p class="mt-2 text-gray-500 dark:text-white">Posted Jobs</p>
          </div>
          <div class="text-left w-full sm:w-1/2 md:w-1/4">
            <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
              {data?.countchallenges}
            </h6>
            <p class="mt-2 text-gray-500 dark:text-white">Posted Challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
