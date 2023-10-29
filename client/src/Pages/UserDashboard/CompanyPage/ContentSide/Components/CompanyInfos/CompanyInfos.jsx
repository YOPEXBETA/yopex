import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useCompanyById } from "../../../../../../hooks/react-query/useCompany";

const CompanyInfos = () => {
  const { companyId } = useParams();
  const { data: company, isLoading, isError } = useCompanyById(companyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="my-4 divide-gray-100 dark:divide-gray-700 overflow-hidden  p-4 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"></div>
  );
};

export default CompanyInfos;
