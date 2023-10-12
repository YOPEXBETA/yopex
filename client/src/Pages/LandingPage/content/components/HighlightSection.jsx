import React from "react";
import { useUsers } from "../../../../hooks/react-query/useUsers";
import { useAdminCompanies } from "../../../../hooks/react-query/useCompany";
import { useJobs } from "../../../../hooks/react-query/useJobs";
import { useFindChallenges } from "../../../../hooks/react-query/useChallenges";

const HighlightSection = () => {
  const { data: users } = useUsers();
  const { data: jobs } = useJobs();
  const { data: companies } = useAdminCompanies();
  const { data: challenges } = useFindChallenges();

  return (
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between flex-wrap">
        <div class="text-left w-full sm:w-1/2 md:w-1/4">
          <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
            {users?.length}
          </h6>
          <p class="mt-2 text-gray-500">Registered users</p>
        </div>
        <div class="text-left w-full sm:w-1/2 md:w-1/4">
          <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
            {companies?.length}
          </h6>
          <p class="mt-2 text-gray-500">Registered companies</p>
        </div>
        <div class="text-left w-full sm:w-1/2 md:w-1/4">
          <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
            {jobs?.length}
          </h6>
          <p class="mt-2 text-gray-500">Posted Jobs</p>
        </div>
        <div class="text-left w-full sm:w-1/2 md:w-1/4">
          <h6 class="text-2xl font-semibold text-gray-700 dark:text-white">
            {challenges?.length}
          </h6>
          <p class="mt-2 text-gray-500">Posted Challenges</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
