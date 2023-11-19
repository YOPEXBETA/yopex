import React, { useState } from "react";
import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";
import { FaList, FaTools } from "react-icons/fa";

const JobFilterModal = ({
  open,
  handleClose,
  setCategoryQuery,
  setSkillQuery,
  selectedCategory,
  selectedSkill,
}) => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Categories, 1 for Skills

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const { data: categories } = useCategories();
  const { data: skills } = useSkills();
  const itCategories = categories?.map((category) => category.name);
  const itSkills = skills?.map((skill) => skill.name);

  const handleCheckboxChange = (skillName) => {
    const updatedSkill = selectedSkill.includes(skillName)
      ? selectedSkill.filter((selected) => selected !== skillName)
      : [...selectedSkill, skillName];

    setSkillQuery(updatedSkill);
  };
  const handleCheckboxChangeCategory = (category) => {
    const updatedCategory = selectedCategory.includes(category)
      ? selectedCategory.filter((selected) => selected !== category)
      : [...selectedCategory, category];

    setCategoryQuery(updatedCategory);
  };
  const tabStyles = "hover:text-green-500 dark:border-zinc-600";
  const activeTabStyles = "bg-green-500 rounded-lg";
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white px-8 py-4 shadow-md overflow-auto md:w-[60rem] md:h-[40rem] w-full h-full">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-[1.15rem]">Filter by</h5>
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
                  selectedTab === 0 ? activeTabStyles : ""
                }`}
                onClick={() => handleTabClick(0)}
              >
                <a
                  href="#"
                  className={`inline-flex items-center px-4 py-3 rounded-lg  ${
                    selectedTab === 0
                      ? "bg-green-500 text-white"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
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
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v4h-2z" />
                    </g>
                  </svg>
                  Categories
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
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
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
            </ul>
            <div className="md:px-6 py-2  text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
              {selectedTab === 0 && (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 bg-gray-50 p-6 rounded-lg">
                    {itCategories.map((category) => (
                      <div
                        key={category}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          id="green-checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          type="checkbox"
                          value={category}
                          checked={selectedCategory.includes(category)}
                          onChange={() =>
                            handleCheckboxChangeCategory(category)
                          }
                        />
                        <label
                          for="green-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {selectedTab === 1 && (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 bg-gray-50 p-6 rounded-lg">
                    {itSkills.map((skillName) => (
                      <div
                        key={skillName}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          value={skillName}
                          checked={selectedSkill.includes(skillName)}
                          onChange={() => handleCheckboxChange(skillName)}
                        />
                        <label
                          for="green-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {skillName}
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
