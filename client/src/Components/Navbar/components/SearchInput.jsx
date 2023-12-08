import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsers,
  useSetquery,
} from "../../../hooks/react-query/useUsers";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const { mutate, isSuccess } = useSetquery();
  const { data: suggestedUsers } = useSearchUsers();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleSearchUsers = (event) => {
    setOpen(true);
    setQuery(event.target.value);
    mutate(event.target.value);
  };

  const displayedUsers = suggestedUsers?.slice(0, 5);
  return (
    <div>
      <div className="flex h-full items-center rounded-full  text-zinc-700 dark:bg-zinc-900 dark:text-white xl:w-[225px]">
        <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p>
        <input
          type="text"
          placeholder="Search..."
          className="block h-full w-full  rounded-full text-sm font-medium text-zinc-700 outline-none placeholder:!text-gray-400 dark:bg-zinc-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          value={query}
          onChange={handleSearchUsers}
        />
      </div>

      {query && isSuccess && open && (
        <ul className="absolute z-10 mt-2 xl:w-72 w-full bg-white  dark:bg-zinc-700 border dark:border-green-600  rounded-md shadow-lg">
          {displayedUsers?.map((option, index) => {
            return (
              <li
                key={option._id || index}
                className="p-2 flex items-center space-x-2 cursor-pointer dark:hover:bg-green-600 hover:bg-gray-100"
                onClick={() => {
                  if (option.firstname && option.lastname) {
                    navigate(`/profile/${option._id}`);
                    setOpen(false);
                  } else {
                    navigate(`/company/${option._id}`);
                    setOpen(false);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  {option.picturePath ? (
                    <img
                      src={option.picturePath}
                      alt={`${option.firstname} ${option.lastname}`}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : option.picturePath === null ? null : (
                    <img
                      src={option.companyLogo}
                      alt={option.companyName}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <span className="text-[#000000] dark:text-gray-100">
                    {option.firstname
                      ? `${option.firstname} ${option.lastname}`
                      : option.companyName}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
