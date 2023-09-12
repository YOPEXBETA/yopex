import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMoney } from "react-icons/fa";
import { useSkills } from "../../../../../hooks/react-query/useSkills";
import { useCategories } from "../../../../../hooks/react-query/useCategories";

const ContestsFilters = ({ setMinAmount, setMaxAmount,setSkillQuery,selectedCategory , selectedSkill,setCategoryQuery }) => {
  const { register, watch } = useForm();

  const minAmount = watch("minAmount");
  const maxAmount = watch("maxAmount");
  const { data:Skills } = useSkills();
  const {data:categorys} = useCategories();
  const itCategory = categorys?.map((category) => category.name);
  const itSkills = Skills?.map((skill) => skill.name);

  const handleCheckboxChange = (skillName) => {
    const updatedSkill = selectedSkill.includes(skillName)
      ? selectedSkill.filter((selected) => selected !== skillName)
      : [...selectedSkill, skillName];

    setSkillQuery(updatedSkill);
  };
  const handleCheckboxChangeCategory = (CategoryName) => {
    const updatedCategory = selectedCategory.includes(CategoryName)
      ? selectedCategory.filter((selected) => selected !== CategoryName)
      : [...selectedCategory, CategoryName];

    setCategoryQuery(updatedCategory);
   
  };
 
 

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCat, setIsOpenCat] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownCategories = () => {
    setIsOpenCat(!isOpenCat);
  };

  useEffect(() => {
    setMinAmount(minAmount);
  }, [minAmount, setMinAmount]);

  useEffect(() => {
    setMaxAmount(maxAmount);
  }, [maxAmount, setMaxAmount]);

  return (
    <div className="bg-white md:rounded-lg border-b-2 p-4 md:border-green-500 border-zinc-200 md:shadow-md">
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="min-amount" className="font-bold text-lg mb-4">
            Filters
          </label>

          <div className="flex flex-col space-y-2">
            <input
              id="min-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Min Price Amount"
              {...register("minAmount")}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <input
              id="max-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Max Price Amount"
              {...register("maxAmount")}
            />
          </div>
        </div>
      </form>
      <div className="relative inline-block text-left w-full pt-2">
        <div>
          <button
            onClick={toggleDropdown}
            className="py-2 px-4 outline-none rounded border-[1px] border-gray-200 bg-white w-full"
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
      <div className="relative inline-block text-left mt-3">
        <div>
          <button
            onClick={toggleDropdownCategories}
            className="py-2 px-4 outline-none rounded border border-white text-white bg-black hover:border-green-500"
          >
            Categories
          </button>
        </div>
        {isOpenCat && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {itCategory.map((CategoryName) => (
                <label
                  key={CategoryName}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <input
                    type="checkbox"
                    value={CategoryName}
                    checked={selectedCategory?.includes(CategoryName)}
                    onChange={() => handleCheckboxChangeCategory(CategoryName)}
                    className="mr-2"
                  />
                  {CategoryName}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ContestsFilters;
