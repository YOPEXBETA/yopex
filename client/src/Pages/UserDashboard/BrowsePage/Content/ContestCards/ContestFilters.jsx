import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSkills } from "../../../../../hooks/react-query/useSkills";
import { useCategories } from "../../../../../hooks/react-query/useCategories";

const ContestsFilters = ({
  setMinAmount,
  setMaxAmount,
  setSkillQuery,
  selectedCategory,
  selectedSkill,
  setCategoryQuery,
}) => {
  const { register, watch } = useForm();

  const minAmount = watch("minAmount");
  const maxAmount = watch("maxAmount");
  const { data: Skills } = useSkills();
  const { data: categorys } = useCategories();
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

  useEffect(() => {
    setMinAmount(minAmount);
  }, [minAmount, setMinAmount]);

  useEffect(() => {
    setMaxAmount(maxAmount);
  }, [maxAmount, setMaxAmount]);

  return (
    <div className="bg-white md:rounded-lg border-b-2 p-4 dark:bg-zinc-800 border  border-zinc-200">
      <form className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="min-amount"
            className="font-bold text-lg mb-4 dark:text-gray-200"
          >
            Filters
          </label>

          <div className="flex flex-col space-y-2">
            <input
              id="min-amount"
              type="number"
              className="border rounded-md dark:bg-zinc-700 p-2 w-full"
              placeholder="Min Price Amount"
              {...register("minAmount")}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <input
              id="max-amount"
              type="number"
              className="border rounded-md dark:bg-zinc-700 p-2 w-full"
              placeholder="Max Price Amount"
              {...register("maxAmount")}
            />
          </div>
        </div>
      </form>
      <div className="relative inline-block text-left w-full pt-2">
        <div>
          <label className="font-bold text-md mb-4 dark:text-gray-200">
            Skills
          </label>
          <div className="py-2 max-h-60 overflow-y-auto">
            {itSkills?.map((skillName) => (
              <label
                key={skillName}
                className="block text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <div className="flex items-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    type="checkbox"
                    value={skillName}
                    checked={selectedSkill.includes(skillName)}
                    onChange={() => handleCheckboxChange(skillName)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    {skillName}
                  </label>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="font-bold text-md mb-4 dark:text-gray-200">
          Categories
        </label>
        <div className="py-2 max-h-60 overflow-y-auto">
          {itCategory?.map((CategoryName) => (
            <label
              key={CategoryName}
              className="block text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <div className="flex items-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  value={CategoryName}
                  checked={selectedCategory?.includes(CategoryName)}
                  onChange={() => handleCheckboxChangeCategory(CategoryName)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                  {CategoryName}
                </label>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestsFilters;
