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
    <div className="bg-zinc-800">
       <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-zinc-800">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-white/5 p-8">
                  <dt className=" text-md font-medium leading-6 text-gray-300">
                    Users
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                    {data?.countusers}
                  </dd>
                </div>
                <div className="flex flex-col bg-white/5 p-8">
                  <dt className=" text-md font-medium leading-6 text-gray-300">
                    Organizations
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                    {data?.countcompanies}
                  </dd>
                </div>
                <div className="flex flex-col bg-white/5 p-8">
                  <dt className=" text-md font-medium leading-6 text-gray-300">
                    Job Offers
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                    {data?.countjobs}
                  </dd>
                </div>
                <div className="flex flex-col bg-white/5 p-8">
                  <dt className=" text-md font-medium leading-6 text-gray-300">
                    Challenges
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                    {data?.countchallenges}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
    </div>
  );
};

export default HighlightSection;
