import React, { useState } from "react";
import {
  useSearchUsers,
  useSetquery,
} from "../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import SearchIcon from "../../../../Components/icons/SearchIcon";
import CompanyIcon from "../../../../Components/icons/CompanyIcon";
import UsersIcon from "../../../../Components/icons/UsersIcon";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import DiscoverUserCard from "../../../../Components/Cards/DiscoverUserCard";

const SearchTalents = ({ extra }) => {
  const [query, setQuery] = useState("");
  const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);

  const { data: suggestedUsers, isLoading } = useSearchUsers();
  const [open, setOpen] = useState(true);
  const [showTalents, setShowTalents] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);

  const handleSearchUsers = (event) => {
    setOpen(true);
    setQuery(event.target.value);
    mutate(event.target.value);
  };

  const handleToggleTalents = () => {
    setShowTalents(true);
    setShowCompanies(false);
  };

  const handleToggleCompanies = () => {
    setShowTalents(false);
    setShowCompanies(true);
  };
  const filteredUsers = suggestedUsers?.filter((user) =>
    showCompanies ? !user.firstname : user.firstname
  );

  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row sm:items-center rounded-full text-zinc-700 dark:bg-zinc-900 dark:text-white">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <div className="pointer-events-none">
              <SearchIcon />
            </div>
          </div>
          <input
            type="text"
            className="bg-lightPrimary border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
            placeholder="Search for..."
            value={query}
            onChange={handleSearchUsers}
          />
          <div className="flex absolute inset-y-0 right-0 items-center pr-0  bg-zinc-200 rounded-full">
            <button
              className={`flex items-center rounded-full dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                showTalents ? "bg-white shadow" : ""
              }`}
              onClick={handleToggleTalents}
            >
              <div className="flex gap-2">
                <UsersIcon />
                <span className="hidden sm:inline">Talents</span>
              </div>
            </button>
            <button
              className={`flex items-center rounded-full dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                showCompanies ? "bg-white shadow" : ""
              }`}
              onClick={handleToggleCompanies}
            >
              <div className="flex gap-2">
                <CompanyIcon />
                <span className="hidden sm:inline">Companies</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-2">
          {filteredUsers?.map((option, index) => (
            <DiscoverUserCard option={option} user={user} />
          ))}
        </div>
      )}

      {!isLoading && filteredUsers && filteredUsers.length === 0 && (
        <div className="mt-2">
          <p className=" dark:text-white">
            {showTalents ? "No talents found." : "No companies found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchTalents;
