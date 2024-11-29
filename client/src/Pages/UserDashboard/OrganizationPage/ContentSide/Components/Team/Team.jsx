import React from "react";
import CompanyTeamCard from "../../../../../../Components/Cards/CompanyTeamCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useOrganizationById } from "../../../../../../hooks/react-query/useCompany";
const Team = () => {
  const { organizationId } = useParams();
  const { data: organization, isLoading, isError } = useOrganizationById(organizationId);
  return (
    <div>
      <CompanyTeamCard organization={organization} />
    </div>
  );
};

export default Team;
