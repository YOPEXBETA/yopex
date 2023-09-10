import React from "react";
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

  const handleSkillsChange = (selectedSkills) => {
    setSkillQuery(selectedSkills);
  };

 

  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end  bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>
      <div className="flex space-x-3">
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
       <Autocomplete
       className=" border-white  "
          multiple
          id="skills-autocomplete"
          options={itSkills}
          value={selectedSkill}
          onChange={(_, newValue) => handleSkillsChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={selectedSkill.length ===0 ? "Skills" : selectedSkill}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <div style={{ display: 'none' }}>
                    {selectedSkill  .map((option) => (
                      <Chip key={option} label={option} onDelete={() => {}} />
                    ))}
                  </div>
                ),
                style: { color: 'white' },
              }}
            />
          )}
        />
       
         
    </div>
        <BrowseNavigationTab value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default BrowseJobsHeader;
