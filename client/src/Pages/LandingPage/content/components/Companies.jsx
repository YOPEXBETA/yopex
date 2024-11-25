import React, { useState } from "react";
import { useRecentCompanies } from "../../../../hooks/react-query/useCompany";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { Link } from "react-router-dom";

const Companies = () => {
  const { data: Recentorganizations, isLoading: organizationsLoading } =
    useRecentCompanies();

  if (organizationsLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div id="organizations" className="pb-8 pt-20 lg:pb-[70px]">
      <div className="mb-12 space-y-2 text-center">
        <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <h2 class="mb-3 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] dark:text-white">
            Recent Organizations
          </h2>
          <p class="text-base text-body-color dark:text-white">
            Discover our Newly Registered Organizations
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {Recentorganizations?.length > 0 ? (
          Recentorganizations?.map((organization) => (
            <div key={organization?.id} className="p-4">
              <Link to={`/organization/${organization?._id}`}>
                <div className="flex gap-3 items-center mb-4 flex-col">
                  <img
                    src={organization?.organizationLogo}
                    alt="Icon"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-medium hover:text-amber-500">
                      {organization?.organizationName}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center dark:text-white">No organization available.</p>
        )}
      </div>
    </div>
  );
};

export default Companies;
