import React from "react";
import DiscoverCompanyCard from "../../../../Components/Cards/DiscoverCompanyCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const DiscoverCompanies = ({
  suggestedCompanies,
  isLoading,
  companyQuery,
  setCompanyQuery,
  user,
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-2">
          {suggestedCompanies.companies.length > 0 ? (
            suggestedCompanies?.companies?.map((option, index) => (
              <DiscoverCompanyCard
                key={index}
                option={option}
                companyQuery={companyQuery}
                user={user}
              />
            ))
          ) : (
            <div className="mt-2">
              <p className="dark:text-white">No company found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscoverCompanies;
