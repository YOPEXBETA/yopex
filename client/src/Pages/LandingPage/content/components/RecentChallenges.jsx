import React from "react";
import NewChallengeCard from "../../../../Components/Cards/NewChallengeCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useFindChallenges } from "../../../../hooks/react-query/useChallenges";
import NoContentAvailable from "../../../../assets/images/NoContent.png";

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
      className="bg-gray-100 pt-20 dark:bg-zinc-800  md:px-24 px-4 overflow-hidden lg:pb-[90px] pb-8" 
    >
      <div className="mb-12 space-y-2 text-center">
        <div className="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <h2 className="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Recent Challenges
          </h2>
          <p className="text-base text-body-color dark:text-white">
            Explore Yopex's Latest Challenge Opportunities.
          </p>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : sortedChallenges.length > 0 ? (
          sortedChallenges.map((item) => (
            <div key={item._id} className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
              <NewChallengeCard challenge={item} />
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

export default RecentChallenges;
