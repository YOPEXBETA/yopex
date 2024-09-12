import React, {useEffect, useState} from "react";
import { useSetquery, useUsersData } from "../../../hooks/react-query/useUsers";
import { useOrganizations } from "../../../hooks/react-query/useCompany";
import { useSelector } from "react-redux";
import DiscoverTab from "./DiscoverTab";
import DiscoverOrganizations from "./components/DiscoverOrganizations";
import DiscoverTalents from "./components/DiscoverTalents";
import useDebounce from "../../../hooks/useDebounce";

const Index = () => {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [organizationQuery, setOrganizationQuery] = useState("");
  const [organizationPage, setOrganizationPage] = useState(1);

  const [selectedOrganizationType, setSelectedOrganizationType] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedUserCountry, setSelectedUserCountry] = useState("");
  const [selectedOrganizationCountry, setSelectedOrganizationCountry] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { mutate } = useSetquery();
  const { user } = useSelector((state) => state.auth);
  const debouncedQuery = useDebounce(query, 500);
  const debouncedOccupation = useDebounce(selectedOccupation, 500);
  const debouncedUserCountry = useDebounce(selectedUserCountry, 500);
  const debouncedSkills = useDebounce(selectedSkills, 500);
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  const debouncedSearchParams = useDebounce(
      {
        query: organizationQuery,
        type: selectedOrganizationType,
        verified: isVerified,
        country: selectedOrganizationCountry,
      },
      500
  );

  useEffect(() => {
    setOrganizationQuery(debouncedSearchParams.query);
  }, [debouncedSearchParams]);

  const { data: suggestedUsers, isLoading: usersLoading } = useUsersData(
      page,
      debouncedQuery,
      debouncedOccupation,
      debouncedUserCountry,
      debouncedSkills
  );

  const { data: suggestedOrganizations, isLoading: organizationsLoading } = useOrganizations(
      organizationPage,
      debouncedSearchParams.query,
      debouncedSearchParams.type,
      debouncedSearchParams.verified,
      debouncedSearchParams.country
  );
  const handleChangePage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
    }
  };

  const handleChangeOrganizationPage = (newPage) => {
    if (newPage <= organizationTotalPages && newPage > 0) {
      setOrganizationPage(newPage);
    }
  };

  const totalPages = Math.ceil(suggestedUsers?.userCount / 6);
  const displayedPages = Math.min(10, totalPages);

  const organizationTotalPages = Math.ceil(suggestedOrganizations?.organizationCount / 6);
  const displayedOrganizationPages = Math.min(10, organizationTotalPages);



  return (
      <div className="mx-auto container">
        <div className="grid grid-cols-12 lg:gap-2 gap-0">
          <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
            <DiscoverTab
                changeValue={changeValue}
                value={value}
                organizationQuery={organizationQuery}
                setCompanyQuery={setOrganizationQuery}
                query={query}
                setQuery={setQuery}                
                />
          </div>
          {value === 0 && (
              <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
                <DiscoverTalents
                    suggestedUsers={suggestedUsers}
                    isLoading={usersLoading}
                    query={query}
                    setQuery={setQuery}
                    handleChangePage={handleChangePage}
                    totalPages={totalPages}
                    displayedPages={displayedPages}
                    page={page}
                    user={user}
                    selectedOccupation={selectedOccupation}
                    setSelectedOccupation={setSelectedOccupation}
                    selectedCountry={selectedUserCountry}
                    setSelectedCountry={setSelectedUserCountry}
                    selectedSkills={selectedSkills}
                    setSelectedSkills={setSelectedSkills}
                />
              </div>
          )}
          {value === 1 && (
              <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
                <DiscoverOrganizations
                    user={user}
                    organizationQuery={organizationQuery}
                    suggestedOrganizations={suggestedOrganizations}
                    isLoading={organizationsLoading}
                    handleChangePage={handleChangeOrganizationPage}
                    organizationTotalPages={organizationTotalPages}
                    displayedOrganizationPages={displayedOrganizationPages}
                    page={organizationPage}
                    setCompanyQuery={setOrganizationQuery}
                    selectedOrganizationType={selectedOrganizationType}
                    setSelectedOrganizationType={setSelectedOrganizationType}
                    isVerified={isVerified}
                    setIsVerified={setIsVerified}
                    selectedCountry={selectedOrganizationCountry}
                    setSelectedCountry={setSelectedOrganizationCountry}
                />
              </div>
          )}
        </div>
      </div>
  );
};

export default Index;
