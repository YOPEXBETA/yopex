import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsers,
  useSetquery,
} from "../../../../../hooks/react-query/useUsers";

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
        className=" w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
      />

      {query && isSuccess && open && (
        <ul className="absolute z-10 mt-2 xl:w-72 w-full bg-white border rounded-md shadow-lg">
          {displayedUsers.map((option, index) => {
            return (
              <li
                key={option._id || index}
                className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  if (option.firstname && option.lastname) {
                    console.log("Navigating to user profile:", option);
                    navigate(`/profile/${option._id}`);
                    setOpen(false);
                  } else {
                    console.log("Navigating to company profile:", option);
                    navigate(`/company/${option._id}`);
                    setOpen(false);
                  }
                }}
              >
                {option.picturePath ? (
                  <div className=" flex items-center gap-4">
                    <img
                      src={option.picturePath}
                      alt={`${option.firstname} ${option.lastname}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[#000000]">
                      {option.firstname} {option.lastname}
                    </span>
                  </div>
                ) : (
                  <div className=" flex items-center gap-4">
                    <img
                      src={option.companyLogo}
                      alt={option.companyName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[#000000]">{option.companyName}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
