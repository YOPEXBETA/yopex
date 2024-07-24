import React, { useState } from "react";
import DiscoverTalents from "./components/DiscoverTalents";
import { useSetquery, useUsersData } from "../../../hooks/react-query/useUsers";
import { useOrganizations } from "../../../hooks/react-query/useCompany";

import { useSelector } from "react-redux";
import DiscoverTab from "./DiscoverTab";
import DiscoverCompanies from "./components/DiscoverCompanies";

const Index = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [organizationQuery, setOrganizationQuery] = useState("");
  const [organizationpage, setOrganizationpage] = useState(1);
  const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);

  //const { data: suggestedUsers, isLoading } = useSearchUsers();
  const { data: suggestedUsers, isLoading: usersLoading } = useUsersData(
    page,
    query
  );
  const { data: suggestedOrganizations, isLoading: organizationsLoading } =
      useOrganizations(organizationpage, organizationQuery);

  const handleChangePage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
    }
  };

  const handleChangeOrganizationPage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setOrganizationpage(newPage);
    }
  };

  const totalPages = Math?.ceil(suggestedUsers?.userCount / 6);
  const displayedPages = Math?.min(10, totalPages);

  const organizationtotalPages = Math?.ceil(suggestedOrganizations?.organizationCount / 6);
  const displayedOrganizationPages = Math?.min(10, organizationtotalPages);

  const handleSearchUsers = (event) => {
    setQuery(event.target.value);
    mutate(event.target.value);
  };
  const handleSearchCompanies = (event) => {
    setOrganizationQuery(event.target.value);
    mutate(event.target.value);
  };

  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 lg:gap-2 gap-0">
        <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
          <DiscoverTab
            query={query}
            companyQuery={organizationQuery}
            handleSearchUsers={handleSearchUsers}
            handleSearchCompanies={handleSearchCompanies}
            changeValue={changeValue}
            value={value}
          />
        </div>
        {value === 0 && (
          <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
            <DiscoverTalents
              suggestedUsers={suggestedUsers}
              isLoading={usersLoading}
              query={query}
              handleChangePage={handleChangePage}
              totalPages={totalPages}
              displayedPages={displayedPages}
              page={page}
              user={user}
            />
          </div>
        )}
        {value === 1 && (
          <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
            <DiscoverCompanies
              user={user}
              organizationQuery={organizationQuery}
              suggestedOrganizations={suggestedOrganizations}
              isLoading={organizationsLoading}
              handleChangePage={handleChangeOrganizationPage}
              organizationtotalPages={organizationtotalPages}
              displayedOrganizationPages={displayedOrganizationPages}
              page={organizationpage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
