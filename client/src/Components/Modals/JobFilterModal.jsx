import React, { useState } from "react";
import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useJobTypes, useOfferTypes } from "../../hooks/react-query/useJobs";
import SearchIcon from "../icons/SearchIcon";
import LoadingSpinner from "../LoadingSpinner";

const JobFilterModal = ({
  open,
  handleClose,
  selectedSkill,
  setSkillQuery,
  selectedJobType,
  setSelectedJobType,
  selectedOfferType,
  setSelectedOfferType,
  selectedTab,
  handleTabClick,
}) => {
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const { data: skills, isLoading } = useSkills(skillSearchQuery);
  const { data: JobTypes } = useJobTypes();
  const { data: OfferTypes } = useOfferTypes();

  const JobTypeEnum = JobTypes?.map((JobType) => JobType?.name);
  const OfferTypeEnum = OfferTypes?.map((OfferType) => OfferType?.name);

  const handleCheckboxChange = (skillName) => {
    const updatedSkill = selectedSkill.includes(skillName)
      ? selectedSkill.filter((selected) => selected !== skillName)
      : [...selectedSkill, skillName];

    setSkillQuery(updatedSkill);
  };

  const handleJobTypeCheckboxChange = (jobTypeName) => {
    const updatedJobTypes = selectedJobType.includes(jobTypeName)
      ? selectedJobType?.filter((selected) => selected !== jobTypeName)
      : [...selectedJobType, jobTypeName];

    setSelectedJobType(updatedJobTypes);
  };

  const handleOfferTypeCheckboxChange = (offerTypeName) => {
    const updatedOfferTypes = selectedOfferType.includes(offerTypeName)
      ? selectedOfferType?.filter((selected) => offerTypeName !== offerTypeName)
      : [...selectedOfferType, offerTypeName];

    setSelectedOfferType(updatedOfferTypes);
  };

  const tabStyles = "hover:text-green-500 dark:border-zinc-600";
  const activeTabStyles = "bg-green-500 rounded-lg";
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-zinc-800 px-8 py-4 shadow-md overflow-auto md:w-[60rem] md:h-[40rem] w-full h-full">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-[1.15rem] dark:text-white">Filter by</h5>
            <div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-xs md:text-sm inline-flex justify-center items-center dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3 me-2 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
              <li
                className={`flex items-center ${tabStyles} ${
                  selectedTab === 0 ? activeTabStyles : "text-zinc-400"
                }`}
                onClick={() => handleTabClick(0)}
              >
                <a
                  href="#"
                  className={`inline-flex items-center px-4 py-3 rounded-lg  ${
                    selectedTab === 0
                      ? "bg-green-500 text-white"
                      : "bg-gray-50 hover:bg-gray-100  dark:hover:bg-zinc-700 dark:hover:text-white"
                  } w-full`}
                  aria-current="page"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M18.07 2.44a1.61 1.61 0 0 0-2.28 0L3.55 15.29a1.61 1.61 0 0 0 0 2.28l1.43 1.43a1.61 1.61 0 0 0 2.28 0l12.24-12.24a3.61 3.61 0 0 0 0-5.12L18.07 2.44zM15.36 4.71l-1.42 1.42 2.85 2.85 1.42-1.42-2.85-2.85zM14.64 5.43L5 15.07 6.41 16.5l9.64-9.64-1.41-1.43zM8.05 13.56l-2.85-2.85-1.42 1.42 2.85 2.85 1.42-1.42zM17.37 4.22l-1.42-1.42a3.61 3.61 0 0 0-5.12 0l-1.41 1.42 2.85 2.85 1.41-1.42 2.85 2.85 1.42-1.42a3.61 3.61 0 0 0 0-5.12z" />
                    </g>
                  </svg>
                  Skills
                </a>
              </li>

              <li
                className={`flex items-center ${tabStyles} ${
                  selectedTab === 1 ? activeTabStyles : "text-zinc-400"
                }`}
                onClick={() => handleTabClick(1)}
              >
                <a
                  className={`inline-flex items-center px-4 py-3 rounded-lg  ${
                    selectedTab === 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-50 hover:bg-gray-100  dark:hover:bg-zinc-700 dark:hover:text-white"
                  } w-full`}
                  aria-current="page"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M18.07 2.44a1.61 1.61 0 0 0-2.28 0L3.55 15.29a1.61 1.61 0 0 0 0 2.28l1.43 1.43a1.61 1.61 0 0 0 2.28 0l12.24-12.24a3.61 3.61 0 0 0 0-5.12L18.07 2.44zM15.36 4.71l-1.42 1.42 2.85 2.85 1.42-1.42-2.85-2.85zM14.64 5.43L5 15.07 6.41 16.5l9.64-9.64-1.41-1.43zM8.05 13.56l-2.85-2.85-1.42 1.42 2.85 2.85 1.42-1.42zM17.37 4.22l-1.42-1.42a3.61 3.61 0 0 0-5.12 0l-1.41 1.42 2.85 2.85 1.41-1.42 2.85 2.85 1.42-1.42a3.61 3.61 0 0 0 0-5.12z" />
                    </g>
                  </svg>
                  job_type
                </a>
              </li>
              <li
                className={`flex items-center ${tabStyles} ${
                  selectedTab === 2 ? activeTabStyles : "text-zinc-400"
                }`}
                onClick={() => handleTabClick(2)}
              >
                <a
                  className={`inline-flex items-center px-4 py-3 rounded-lg  ${
                    selectedTab === 2
                      ? "bg-green-500 text-white"
                      : "bg-gray-50 hover:bg-gray-100  dark:hover:bg-zinc-700 dark:hover:text-white"
                  } w-full`}
                  aria-current="page"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M18.07 2.44a1.61 1.61 0 0 0-2.28 0L3.55 15.29a1.61 1.61 0 0 0 0 2.28l1.43 1.43a1.61 1.61 0 0 0 2.28 0l12.24-12.24a3.61 3.61 0 0 0 0-5.12L18.07 2.44zM15.36 4.71l-1.42 1.42 2.85 2.85 1.42-1.42-2.85-2.85zM14.64 5.43L5 15.07 6.41 16.5l9.64-9.64-1.41-1.43zM8.05 13.56l-2.85-2.85-1.42 1.42 2.85 2.85 1.42-1.42zM17.37 4.22l-1.42-1.42a3.61 3.61 0 0 0-5.12 0l-1.41 1.42 2.85 2.85 1.41-1.42 2.85 2.85 1.42-1.42a3.61 3.61 0 0 0 0-5.12z" />
                    </g>
                  </svg>
                  offer_type
                </a>
              </li>
            </ul>
            <div className="md:px-6 py-2  text-medium text-gray-500 dark:text-gray-400  rounded-lg w-full">
              {selectedTab === 0 && (
                <>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSkillSearchQuery(e.currentTarget.value)
                      }
                      className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                      placeholder="Search for Job opportunities"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 dark:bg-zinc-800 py-6 rounded-lg">
                    {skills?.map((skill) => (
                      <div
                        key={skill._id}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm  hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          value={skill.name}
                          checked={selectedSkill.includes(skill.name)}
                          onChange={() => handleCheckboxChange(skill.name)}
                        />
                        <label
                          htmlFor="green-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {skill.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {selectedTab === 1 && (
                <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 dark:bg-zinc-800 bg-gray-50 p-6 rounded-lg">
                  {JobTypeEnum?.map((jobTypeName) => (
                    <div key={jobTypeName} className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        value={jobTypeName}
                        checked={selectedJobType.includes(jobTypeName)}
                        onChange={() =>
                          handleJobTypeCheckboxChange(jobTypeName)
                        }
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                      />
                      <label className="ms-2 text-sm font-medium text-black dark:text-gray-500">
                        {jobTypeName}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 2 && (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 dark:bg-zinc-800 bg-gray-50 p-6 rounded-lg">
                    {OfferTypeEnum?.map((offerTypeName) => (
                      <div
                        key={offerTypeName}
                        className="flex items-center mb-4"
                      >
                        <input
                          type="checkbox"
                          value={offerTypeName}
                          checked={selectedOfferType.includes(offerTypeName)}
                          onChange={() =>
                            handleOfferTypeCheckboxChange(offerTypeName)
                          }
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                        />
                        <label className="ms-2 text-sm font-medium text-black dark:text-gray-500">
                          {offerTypeName}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterModal;
