import React, { useState } from "react";
import DiscoverTalents from "./components/DiscoverTalents";
import {
  useSearchUsers,
  useSetquery,
  useUsersData,
} from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import SearchIcon from "../../../Components/icons/SearchIcon";
import CompanyIcon from "../../../Components/icons/CompanyIcon";
import UsersIcon from "../../../Components/icons/UsersIcon";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import DiscoverUserCard from "../../../Components/Cards/DiscoverUserCard";
import DiscoverTab from "./DiscoverTab";
import DiscoverCompanies from "./components/DiscoverCompanies";

const Index = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);

  //const { data: suggestedUsers, isLoading } = useSearchUsers();
  const { data: suggestedUsers, isLoading } = useUsersData(page, query);

  const handleChangePage = (newPage) => {
    if (newPage <= totalPages && newPage > 0) {
      setPage(newPage);
    }
  };

  const totalPages = Math?.ceil(suggestedUsers?.userCount / 6);
  const displayedPages = Math?.min(10, totalPages);

  const handleSearchUsers = (event) => {
    setQuery(event.target.value);
    mutate(event.target.value);
  };

  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 lg:gap-2 gap-0">
        <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
          <DiscoverTab
            query={query}
            handleSearchUsers={handleSearchUsers}
            changeValue={changeValue}
            value={value}
          />
        </div>
        {value === 0 && (
          <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
            <DiscoverTalents
              suggestedUsers={suggestedUsers}
              isLoading={isLoading}
              query={query}
              setQuery={setQuery}
              handleChangePage={handleChangePage}
              totalPages={totalPages}
              displayedPages={displayedPages}
              page={page}
            />
          </div>
        )}
        {value === 1 && (
          <div className="col-span-12 lg:col-span-12 md:col-span-12 mt-4 md:mt-0">
            <DiscoverCompanies />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
