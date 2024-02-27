import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsers,
  useSetquery,
} from "../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import SearchIcon from "../../../../Components/icons/SearchIcon";
import CompanyIcon from "../../../../Components/icons/CompanyIcon";
import UsersIcon from "../../../../Components/icons/UsersIcon";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";

import Card from "../../../../Components/Cards";
import StarReviewIcon from "../../../../Components/icons/StarReviewIcon";

const SearchTalents = ({ extra }) => {
  const [query, setQuery] = useState("");
  const { mutate, isSuccess } = useSetquery();
  const { user } = useSelector((state) => state.auth);
  const { mutate: contact } = useCreateConversation(user._id);

  const { data: suggestedUsers, isLoading } = useSearchUsers();
  const navigate = useNavigate();
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
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-2">
          {filteredUsers?.map((option, index) => (
            <Card
              extra={`p-4 ${extra}`}
              key={option._id || index}
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
              <div className="flex flex-col">
                <div className="flex-none sm:flex">
                  <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                    <img
                      src={
                        option?.picturePath ||
                        option?.companyLogo ||
                        AvatarProfile
                      }
                      alt={
                        option.firstname
                          ? `${option.firstname} ${option.lastname}`
                          : option.companyName
                      }
                      className="w-32 h-32 object-cover rounded-2xl border"
                    />
                  </div>
                  <div className="flex-auto sm:ml-5 justify-evenly">
                    <div className="flex items-center justify-between sm:mt-2">
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <div className="w-full flex-none text-lg dark:text-gray-200 font-bold leading-none">
                            {option.firstname
                              ? `${option.firstname} ${option.lastname}`
                              : option.companyName}{" "}
                          </div>
                          <div className="flex-auto text-gray-400 my-1">
                            <span className="mr-3 ">
                              {option.occupation || "unknown"}
                            </span>
                            <span className="mr-3 border-r border-gray-600  max-h-0"></span>
                            <span>{option.country || "unknown"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <div class="flex">
                        <StarReviewIcon />
                        <StarReviewIcon />
                        <StarReviewIcon />
                        <StarReviewIcon />
                        <StarReviewIcon />
                      </div>
                    </div>
                    <div className="flex pt-2  text-sm text-gray-500">
                      <div className="flex-1 inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <p className="">
                          {option?.followers?.length || 0} Followers
                        </p>
                      </div>
                      <div className="flex-1 inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <p className="">14 Challenges</p>
                      </div>
                      <button
                        onClick={() =>
                          contact({
                            senderId: user._id,
                            receiverId: option._id,
                          })
                        }
                        className="flex-no-shrink bg-gradient-to-r from-green-400 via-green-500 to-green-600  px-5 ml-4 py-2 shadow-sm hover:shadow-lgborder-2 border-green-300 hover:border-green-500 text-white rounded-lg transition ease-in duration-300"
                      >
                        Contact me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredUsers && filteredUsers.length === 0 && (
        <div className="mt-4">
          <p className=" dark:text-white">
            {showTalents ? "No talents found." : "No companies found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchTalents;
