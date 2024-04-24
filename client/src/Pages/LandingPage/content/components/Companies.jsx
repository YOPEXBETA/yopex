import React, { useState } from "react";
import { useCompanies } from "../../../../hooks/react-query/useCompany";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const Companies = () => {
  const { data: suggestedCompanies, isLoading: companiesLoading } =
    useCompanies();

  if (companiesLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-green-50 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px]">
      <div className="mb-12 space-y-2 text-center">
        <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
          <span class="mb-2 block text-xl font-semibold text-indigo-600">
            Companies
          </span>
          <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Recent Companies
          </h2>
          <p class="text-base text-body-color dark:text-white">
            Discover our Newly Registered Companies
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {suggestedCompanies?.companies?.length > 0 ? (
          suggestedCompanies?.companies.map((company) => (
            <div key={company?.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div>
                <div className="flex gap-3 items-center mb-4 flex-col">
                  <img
                    src={company?.companyLogo}
                    alt="Icon"
                    className="w-20 h-20 rounded-lg object-contain"
                  />
                  <div>
                    <h2 className="text-2xl font-medium dark:text-gray-200">
                      {company?.companyName}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-white">No companies available.</p>
        )}
      </div>
    </div>
  );
};

export default Companies;
