import React, { useState } from "react";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { useSkills } from "../../../../hooks/react-query/useSkills";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";

const BrowseJobsHeader = ({
  changeValue,
  value,
  setJobQuery,
  setCategoryQuery,
  setSkillQuery,
  selectedCategory,
  selectedSkill,
}) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCat, setIsOpenCat] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownCatgory = () => {
    setIsOpenCat(!isOpenCat);
  };

  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end dark:bg-zinc-900 border-b  bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>
        <div className="flex space-x-2 ">
          <input
            type="text"
            placeholder="Search for Jobs"
            className=" w-full py-2 px-3 outline-none rounded border dark:bg-zinc-700 border-white text-white bg-black hover:border-green-500"
            onChange={(e) => setJobQuery(e.target.value)}
          />
          <div>
            <div>
              <button
                onClick={toggleDropdownCatgory}
                className="py-2 px-4 outline-none rounded border border-white text-white dark:bg-zinc-700 bg-black hover:border-green-500"
              >
                Categories
              </button>
            </div>
            {isOpenCat && (
              <div className="origin-top-right absolute right-32 lg:right-50 xl:right-60 mt-2 w-48 rounded-md max-h-60 overflow-y-auto dark:bg-zinc-800 border shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
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
              </div>
            )}
          </div>
          <div>
            <div>
              <button
                onClick={toggleDropdown}
                className="py-2 px-4 outline-none rounded border border-white dark:bg-zinc-700 text-white bg-black hover:border-green-500"
              >
                Skills
              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-[2rem] lg:right-[2rem] md:right-[2rem] max-h-60 overflow-y-auto dark:bg-zinc-800 border  xl:right-[10rem]  mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {itSkills.map((skillName) => (
                    <label
                      key={skillName}
                      className="block px-4 dark:text-white py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
              </div>
            )}
          </div>
        </div>

        <BrowseNavigationTab value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default BrowseJobsHeader;
