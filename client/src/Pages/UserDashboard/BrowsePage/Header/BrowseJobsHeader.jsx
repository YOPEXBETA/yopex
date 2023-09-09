import React from "react";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { useSkills } from "../../../../hooks/react-query/useSkills";

const BrowseJobsHeader = ({ changeValue, value, setJobQuery ,setCategoryQuery}) => {
  const {data:categorys} = useCategories();
  const { data:Skills } = useSkills();
  const itCategory = categorys?.map((category) => category.name);
  const itSkills = Skills?.map((skill) => skill.name);

  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>
      <div className="flex">
          <input
            type="text"
            placeholder="Search for Jobs"
            className="w-full py-2 px-3 outline-none rounded border border-white text-white bg-black hover:border-green-500"
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
       <select
        className="py-2 px-2 outline-none rounded border border-white text-white bg-black hover:border-green-500"
        >
        <option value="">All Skills</option>
          {itSkills.map((skillName) => (
            <option key={skillName} value={skillName}>
              {skillName}
            </option>
          ))} 
       </select>
    </div>
        <BrowseNavigationTab value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default BrowseJobsHeader;
