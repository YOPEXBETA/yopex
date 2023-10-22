import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsers,
  useSetquery,
} from "../../../../../hooks/react-query/useUsers";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";

export default function NavbarSearchDropDown() {
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
    <div className="relative xl:w-72 w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearchUsers}
        placeholder="Search for users"
        className=" w-full p-3 border rounded-full focus:outline-none dark:placeholder-gray-100  dark:bg-zinc-700 dark:border-zinc-800 dark:text-gray-100 dark:focus:border-green-600 focus:border-green-300 text-[#000000] bg-gray-100"
      />

      {query && isSuccess && open && (
        <ul className="absolute z-10 mt-2 xl:w-72 w-full bg-white dark:bg-zinc-700 border dark:border-green-600  rounded-md shadow-lg">
          {displayedUsers.map((option, index) => {
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
}
