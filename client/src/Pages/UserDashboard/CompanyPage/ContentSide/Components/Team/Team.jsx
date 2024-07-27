import React from "react";
import CompanyTeamCard from "../../../../../../Components/Cards/CompanyTeamCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useOrganizationById } from "../../../../../../hooks/react-query/useCompany";
const Team = () => {
  const { companyId } = useParams();
  const { data: company, isLoading, isError } = useOrganizationById(companyId);
  return (
    <div>
      <CompanyTeamCard company={company} />
    </div>
  );
};

export default Team;
