import React from "react";
import { useParams } from "react-router-dom";
import { useCompanyById } from "../../../../../../hooks/react-query/useCompany";

const CompanyInfos = () => {
  const { companyId } = useParams();
  const { data: company, isLoading, isError } = useCompanyById(companyId);

  return (
    <div className="my-4 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 p-4 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <h2 className="mb-4 font-bold text-xl dark:text-white">About</h2>
      <p className="dark:text-white w-full xl:w-[50rem] ">
        {company?.companyDescription}
      </p>
    </div>
  );
};

export default CompanyInfos;
