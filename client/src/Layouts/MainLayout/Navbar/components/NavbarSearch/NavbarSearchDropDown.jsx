import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSearchUsers, useSetquery, useSuggestedUsers } from "../../../../../hooks/react-query/useUsers";

// const searchUser = async (query) => {
//   const { data } = await axios.get(
//     `http://localhost:8000/users?search=${query}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return data;
// };

export default function NavbarSearchDropDown() {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const [suggestedUsers,setsuggestedUsers] = useState([]);
  const {mutate} = useSetquery();

  const { data: Users } = useSearchUsers();
  console.log("suggestedUsers",suggestedUsers);
  // const { mutate } = useMutation({
  //   mutationFn: searchUser,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("searchUsers");
  //   },
  // });
  useEffect(()=>{
    if (Users) setsuggestedUsers(Users);
  },[Users])

  const navigate = useNavigate();

  const handleSearchUsers = async (event) => {
    setQuery(event.target.value);
    await mutate(query);
    
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query) {
      const selectedResult = suggestedUsers.find((result) => {
        if (result.firstname && result.lastname) {
          return `${result.firstname} ${result.lastname}` === query;
        } else {
          return result.companyName === query;
        }
      });

      if (selectedResult) {
        if (selectedResult.firstname && selectedResult.lastname) {
          navigate(`/profile/${selectedResult._id}`);
        } else {
          navigate(`/company/${selectedResult._id}`);
        }
      }
    }
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearchUsers}
        onKeyDown={handleKeyDown}
        placeholder="Search for users"
        className=" w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
      />
      {(
        <ul className="absolute z-10 mt-2 w-72 bg-white border rounded-md shadow-lg">
          {suggestedUsers?.map((option, index) => {
            return (
              <li
                key={option._id || index}
                className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  console.log("Clicked option:", option); // Log clicked option for debugging
                  if (option.firstname && option.lastname) {
                    console.log("Navigating to user profile:", option);
                    navigate(`/profile/${option._id}`);
                  } else {
                    console.log("Navigating to company profile:", option);
                    navigate(`/company/${option._id}`);
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
