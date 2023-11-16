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

  const { data: categorys } = useCategories();
  const { data: Skills } = useSkills();
  const itCategory = categorys?.map((category) => category.name);
  const itSkills = Skills?.map((skill) => skill.name);

  const handleCheckboxChange = (skillName) => {
    const updatedSkill = selectedSkill.includes(skillName)
      ? selectedSkill.filter((selected) => selected !== skillName)
      : [...selectedSkill, skillName];

    setSkillQuery(updatedSkill);
  };
  const handleCheckboxChangeCategorie = (Category) => {
    const updatedCategory = selectedCategory.includes(Category)
      ? selectedCategory.filter((selected) => selected !== Category)
      : [...selectedCategory, Category];

    setCategoryQuery(updatedCategory);
  };
  const tabStyles = "text-gray-500 dark:text-green-500 dark:border-zinc-600";
  const activeTabStyles = "text-green-500";

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white grid grid-cols-12 px-8 py-4 shadow-md overflow-auto w-[60rem] h-[40rem]">
          <div className="col-span-12">
            <div className="flex justify-between items-center">
              <h5 className="font-medium text-lg">Filter by</h5>
              <div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-xs md:text-sm inline-flex justify-center items-center dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
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
            <hr className="border-zinc-100 border w-full mt-4" />
          </div>

          {/* Left side for tabs */}
          <div className="col-span-3">
            <div className="mt-4">
              <ul className="flex flex-col space-y-4">
                <li
                  className={`flex items-center ${tabStyles} ${
                    selectedTab === 0 ? activeTabStyles : ""
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  <div className="flex items-center gap-2">
                    <FaList />
                    <span className="mr-2">Categories</span>
                  </div>
                </li>
                <div className="border-r border-gray-300 h-full" />{" "}
                {/* Vertical Divider */}
                <li
                  className={`flex items-center ${tabStyles} ${
                    selectedTab === 1 ? activeTabStyles : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <div className="flex items-center gap-2">
                    <FaTools />
                    <span className="mr-2">Skills</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border-l h-full"></div>
          </div>
          {/* Right side for content */}
          <div className="col-span-8">
            {/* Content based on the selected tab */}
            <div className="mt-4">
              {selectedTab === 0 && (
                <div className="grid grid-cols-2 grid-rows-5 gap-4">
                  {itCategory.map((Category) => (
                    <label
                      key={Category}
                      className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        value={Category}
                        checked={selectedCategory.includes(Category)}
                        onChange={() => handleCheckboxChangeCategorie(Category)}
                        className="mr-2"
                      />
                      {Category}
                    </label>
                  ))}
                </div>
              )}
              {selectedTab === 1 && (
                <div className="grid grid-cols-2 grid-rows-5 gap-4">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterModal;
