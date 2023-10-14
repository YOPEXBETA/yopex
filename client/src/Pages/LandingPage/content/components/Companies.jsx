import React, { useState, useEffect } from "react";
import { useCompanies } from "../../../../hooks/react-query/useCompany";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const Companies = () => {
  const { data: companies, isLoading } = useCompanies();

  const itemsPerPage = 3;

  const sortedCompanies = companies?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Get the first 6 most recent companies
  const recentCompanies = sortedCompanies.slice(0, itemsPerPage);
  console.log("Sorted Companies:", sortedCompanies);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Recent Companies
        </h2>
        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          Welcome to the Hub of Fresh Talent: Discover our Newly Registered
          Companies
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {recentCompanies.length > 0 ? (
          recentCompanies.map((company) => (
            <div key={company.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div>
                <div className="flex gap-3 items-center mb-4 flex-col">
                  <img
                    src={company.companyLogo}
                    alt="Icon"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-medium">
                      {company.companyName}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </div>
  );
};

export default Companies;
