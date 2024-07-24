import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useOrganizationById } from "../../../../../../hooks/react-query/useCompany";
import GeneralCompanyInfo from "../../../../../../Components/Cards/GeneralCompanyInfo";

const CompanyInfos = () => {
  const { companyId } = useParams();
  const { data: company, isLoading, isError } = useOrganizationById(companyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dark:divide-gray-700 overflow-hidden  dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <GeneralCompanyInfo company={company} />
    </div>
  );
};

export default CompanyInfos;
