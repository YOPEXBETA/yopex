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
                    className="w-4 h-4 me-2 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
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
                    className="w-4 h-4 me-2 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
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
                      <label
                        key={category}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          value={category}
                          checked={selectedCategory.includes(category)}
                          onChange={() =>
                            handleCheckboxChangeCategory(category)
                          }
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </>
              )}
              {selectedTab === 1 && (
                <>
                  <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-5 gap-4 bg-gray-50 p-6 rounded-lg">
                    {itSkills.map((skillName) => (
                      <label
                        key={skillName}
                        className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          value={skillName}
                          checked={selectedSkill.includes(skillName)}
                          onChange={() => handleCheckboxChange(skillName)}
                          className="mr-2"
                        />
                        {skillName}
                      </label>
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
