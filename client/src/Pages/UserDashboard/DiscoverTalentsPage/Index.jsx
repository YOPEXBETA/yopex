import React, { useState } from "react";
import DiscoverTalents from "./components/DiscoverTalents";
import { useSetquery, useUsersData } from "../../../hooks/react-query/useUsers";
import { useCompanies } from "../../../hooks/react-query/useCompany";

import { useSelector } from "react-redux";
import DiscoverTab from "./DiscoverTab";
import DiscoverOrganizations from "./components/DiscoverOrganizations";

const Index = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [companypage, setCompanypage] = useState(1);
  const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);

  //const { data: suggestedUsers, isLoading } = useSearchUsers();
  const { data: suggestedUsers, isLoading: usersLoading } = useUsersData(
    page,
    query
  );
  const { data: suggestedOrganizations, isLoading: OrganizationsLoading } =
    useCompanies(companypage, companyQuery);

  const handleChangePage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
    }
  };

  const handleChangeCompanyPage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setCompanypage(newPage);
    }
  };

  const totalPages = Math?.ceil(suggestedUsers?.userCount / 6);
  const displayedPages = Math?.min(10, totalPages);

  const companytotalPages = Math?.ceil(suggestedOrganizations?.companyCount / 6);
  const displayedCompanyPages = Math?.min(10, companytotalPages);

  const handleSearchUsers = (event) => {
    setQuery(event.target.value);
    mutate(event.target.value);
  };
  const handleSearchCompanies = (event) => {
    setCompanyQuery(event.target.value);
    mutate(event.target.value);
  };

  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 lg:gap-2 gap-0">
        <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
          <DiscoverTab
            query={query}
            companyQuery={companyQuery}
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
            <DiscoverOrganizations
              user={user}
              companyQuery={companyQuery}
              suggestedOrganizations={suggestedOrganizations}
              isLoading={OrganizationsLoading}
              handleChangePage={handleChangeCompanyPage}
              companytotalPages={companytotalPages}
              displayedCompanyPages={displayedCompanyPages}
              page={companypage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
