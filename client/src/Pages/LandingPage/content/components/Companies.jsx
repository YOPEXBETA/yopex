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
        <h2 className="text-3xl font-bold md:text-4xl dark:text-white">
          Recent Companies
        </h2>
        <p className="lg:mx-auto lg:w-6/12 dark:text-gray-300">
          Welcome to the Hub of Fresh Talent: Discover our Newly Registered
          Companies
        </p>
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
