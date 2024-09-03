import React from "react";
import NewChallengeCard from "../../../../Components/Cards/NewChallengeCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useFindChallenges } from "../../../../hooks/react-query/useChallenges";

const RecentChallenges = () => {
  const { data: challenges, isLoading } = useFindChallenges();

  const sortedChallenges = challenges
    ? challenges
        .slice(0, 6)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div
      id="challenges"
      className="pb-8 pt-20 lg:pb-[70px] mx-auto container py-10 px-4 lg:px-24 md:px-11"
    >
      <div className="mb-12 space-y-2 text-center">
        <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <span class="mb-2 block text-xl font-semibold text-amber-500">
            Challenges
          </span>
          <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Recent Challenges
          </h2>
          <p class="text-base text-body-color dark:text-white">
            Explore Yopex's Latest Challenge Opportunities!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : sortedChallenges.length > 0 ? (
          sortedChallenges?.map((item) => (
            <div key={item._id}>
              <NewChallengeCard challenge={item} />
            </div>
          ))
        ) : (
          <p className="dark:text-white">No Challenges found</p>
        )}
      </div>
    </div>
  );
};

export default RecentChallenges;
