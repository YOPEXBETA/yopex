import React, { useState, useEffect } from "react";

import { useCompanies } from "../../../../hooks/react-query/useCompany";

const Companies = () => {
  const [currPage, setCurrPage] = useState(0);
  const { data: companies } = useCompanies();

  const itemsPerPage = 3;

  const totalPages = Math.ceil(3 / itemsPerPage);

  const goToNextPage = () => {
    setCurrPage((prevPage) => (prevPage + 1) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(goToNextPage, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="mb-12 space-y-2 text-center">
        <h2 class="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Recent Companies
        </h2>
        <p class="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          Welcome to the Hub of Fresh Talent: Discover our Newly Registered
          Companies
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {companies && Array.isArray(companies) ? (
          companies
            .slice(currPage * itemsPerPage, (currPage + 1) * itemsPerPage)
            .map((company) => (
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
