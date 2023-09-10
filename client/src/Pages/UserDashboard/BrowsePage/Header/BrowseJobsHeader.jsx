import React, { useState } from "react";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { useSkills } from "../../../../hooks/react-query/useSkills";
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip, MenuItem, Select } from "@mui/material";

const BrowseJobsHeader = ({ changeValue, value, setJobQuery ,setCategoryQuery ,setSkillQuery , selectedSkill}) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const {data:categorys} = useCategories();
  const { data:Skills } = useSkills();
  const itCategory = categorys?.map((category) => category.name);
  const itSkills = Skills?.map((skill) => skill.name);

  const handleCheckboxChange = (skillName) => {
    const updatedSkill = selectedSkill.includes(skillName)
      ? selectedSkill.filter((selected) => selected !== skillName)
      : [...selectedSkill, skillName];

    setSkillQuery(updatedSkill);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end  bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>
      <div className="flex space-x-2 ">
          <input
            type="text"
            placeholder="Search for Jobs"
            className=" w-full py-2 px-3 outline-none rounded border border-white text-white bg-black hover:border-green-500"
            onChange={(e) => setJobQuery(e.target.value)}
          />
      <select
        className="py-2 px-2 outline-none rounded border border-white text-white bg-black hover:border-green-500"
        onChange={(e) => setCategoryQuery(e.target.value)}
        >
        <option value="">All Categories</option>
          {itCategory.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))} 
       </select>
       <div className="relative inline-block text-left">
            <div>
              <button
                onClick={toggleDropdown}
                className="py-2 px-4 outline-none rounded border border-white text-white bg-black hover:border-green-500"
              >
                Skills
              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {itSkills.map((skillName) => (
                    <label
                      key={skillName}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
