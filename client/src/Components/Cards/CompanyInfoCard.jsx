import React from "react";
import { useCompanyById } from "../../hooks/react-query/useCompany";
import LoadingSpinner from "../LoadingSpinner";

const CompanyInfoCard = ({ selectedOption }) => {
  const { data: companyData, isLoading } = useCompanyById(selectedOption);
  console.log(companyData);
  if (!selectedOption || isLoading) {
    // Return loading state or no company selected message
    return (
      <div className="bg-white border rounded-lg">
        <p className="px-4 py-6 text-center text-gray-700">
          {isLoading ? <LoadingSpinner /> : "No company selected."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg">
      <div className="flex items-center px-4 py-6">
        <img
          className="w-12 h-12 rounded-lg object-cover mr-4 shadow"
          src={companyData?.companyLogo}
          alt="avatar"
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {companyData?.companyName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
