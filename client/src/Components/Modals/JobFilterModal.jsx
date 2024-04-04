import React, { useState } from "react";
import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useJobTypes, useOfferTypes } from "../../hooks/react-query/useJobs";
import SearchIcon from "../icons/SearchIcon";
import LoadingSpinner from "../LoadingSpinner";
import CloseIcon from "../icons/CloseIcon";

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
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isOfferTypeOpen, setIsOfferTypeOpen] = useState(false);
  const { data: skills, isLoading } = useSkills(skillSearchQuery);

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

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full flex items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 h-full flex items-center">
        <div className="bg-white dark:bg-zinc-800 md:w-[40rem] w-screen h-full px-8 py-4  shadow-md overflow-auto">
          <div className="">
            <div className="flex justify-between items-center">
              <h5 className="text-xl dark:text-white font-semibold">
                Filter Jobs
              </h5>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-xs md:text-sm  inline-flex justify-center items-center  dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <CloseIcon width={4} height={4} />
              </button>
            </div>
          </div>
          <hr className="border-zinc-100 border w-full mt-4" />
          <div>
            <>
              <h2 id="accordion-flush-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                  onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                  aria-expanded={isSkillsOpen ? "true" : "false"}
                  aria-controls="accordion-flush-body-1"
                >
                  <span>Skills</span>
                  <svg
                    data-accordion-icon
                    class="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              {isSkillsOpen && (
                <div className="mt-6">
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      onChange={(e) =>
                        setSkillSearchQuery(e.currentTarget.value)
                      }
                      className="border rounded-lg border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                      placeholder="Search for skills"
                    />
                  </div>
                  <div className="mt-3 max-h-96 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700   rounded-lg  pb-4 text-left overflow-hidden transform transition-all">
                    {skills?.map((skill) => (
                      <div
                        key={skill._id}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm  hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          value={skill?.name}
                          checked={selectedSkill.includes(skill.name)}
                          onChange={() => handleCheckboxChange(skill.name)}
                        />
                        <label
                          htmlFor="green-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {skill?.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>

            <h2 id="accordion-flush-heading-2">
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
                aria-expanded={isJobTypeOpen ? "true" : "false"}
                aria-controls="accordion-flush-body-1"
              >
                <span>Job Types</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>

            {isJobTypeOpen && (
              <div className="mt-6">
                {[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Freelance",
                  "Internship",
                  "Volunteering",
                  "Scholarship",
                ]?.map((jobTypeName) => (
                  <div key={jobTypeName} className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value={jobTypeName}
                      checked={selectedJobType.includes(jobTypeName)}
                      onChange={() => handleJobTypeCheckboxChange(jobTypeName)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-black dark:text-gray-500">
                      {jobTypeName}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <>
              <h2 id="accordion-flush-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                  onClick={() => setIsOfferTypeOpen(!isOfferTypeOpen)}
                  aria-expanded={isOfferTypeOpen ? "true" : "false"}
                  aria-controls="accordion-flush-body-1"
                >
                  <span>Offer Types</span>
                  <svg
                    data-accordion-icon
                    class="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              {isOfferTypeOpen && (
                <div className="mt-6">
                  {["On-site", "Hybrid", "Remote"].map((offerTypeName) => (
                    <div key={offerTypeName} className="flex items-center mb-4">
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
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterModal;
