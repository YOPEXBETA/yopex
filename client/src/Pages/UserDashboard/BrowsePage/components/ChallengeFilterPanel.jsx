import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSkills } from "../../../../hooks/react-query/useSkills";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import SearchIcon from "../../../../Components/icons/SearchIcon";
import CloseIcon from "../../../../Components/icons/CloseIcon";

const ChallengeFilterPanel = ({
                                handleClose,
                                setMinAmount,
                                setMaxAmount,
                                setSkillQuery,
                                setCategoryQuery,
                                selectedCategory,
                                selectedSkill,
                              }) => {
    const { register, watch } = useForm();
    const [skillSearchQuery, setSkillSearchQuery] = useState("");
    const [categorySearchQuery, setCategorySearchQuery] = useState("");
    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);


    // State for managing visible skills and categories
    const [visibleSkillsCount, setVisibleSkillsCount] = useState(5);
    const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(5);

    const minAmount = watch("minAmount");
    const maxAmount = watch("maxAmount");
    const { data: Skills } = useSkills(skillSearchQuery);
    const { data: Categories } = useCategories(categorySearchQuery);

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
        <div className="absolute top-8 left-0 right-0 bg-white dark:bg-zinc-800 border rounded-lg mt-4 p-6 shadow-md z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h5 className="text-xl dark:text-white font-medium">Filters</h5>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-xs md:text-sm inline-flex justify-center items-center dark:hover:text-white"
          >
            <CloseIcon width={4} height={4} />
          </button>
        </div>
        <hr className="border-zinc-100 border w-full my-4" />
      
        {/* Form */}
        <form>
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Price Range */}
            <div className="w-full md:w-1/3">
              <>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
                    aria-expanded={isPriceRangeOpen ? "true" : "false"}
                    aria-controls="accordion-flush-body-1"
                  >
                    <h2 className="font-semibold rtl:text-right text-md dark:text-gray-400">Price</h2>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
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
                        d="M9 5L5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                {isPriceRangeOpen && (
                  <div className="mt-6">
                    <div className="mb-5">
                      <label htmlFor="min-amount" className="font-semibold text-md dark:text-gray-400 mb-3">From</label>
                      <input
                        id="min-amount"
                        type="number"
                        placeholder="Min Price Amount"
                        {...register("minAmount")}
                        min={0}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-3"
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="max-amount" className="font-semibold text-md dark:text-gray-400 mb-3">To</label>
                      <input
                        id="max-amount"
                        type="number"
                        placeholder="Max Price Amount"
                        {...register("maxAmount")}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-3"
                      />
                    </div>
                  </div>
                )}
              </>
            </div>
      
            {/* Skills */}
            <div className="w-full md:w-1/3">
              <>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                    aria-expanded={isSkillsOpen ? "true" : "false"}
                    aria-controls="accordion-flush-body-1"
                  >
                    <h2 className="font-semibold rtl:text-right text-md dark:text-gray-400">Skills</h2>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
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
                        d="M9 5L5 1 1 5"
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
                        value={skillSearchQuery}
                        onChange={(e) => setSkillSearchQuery(e.currentTarget.value)}
                        className="border rounded-lg border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                        placeholder="Search for skills"
                      />
                    </div>
                    <div className="mt-3 max-h-96 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700 rounded-lg pb-4 text-left overflow-hidden transform transition-all">
                      {Skills?.slice(0, visibleSkillsCount).map((skill, index) => (
                        <div
                          key={skill._id}
                          className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                        >
                          <input
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            id={`skill-checkbox-${index}`}
                            type="checkbox"
                            value={skill.name}
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
                      {Skills && Skills.length > visibleSkillsCount && (
                        <button
                          type="button"
                          onClick={() => setVisibleSkillsCount(Skills.length)}
                          className="text-blue-500 text-sm mt-2"
                        >
                          +{Skills.length - visibleSkillsCount} More Skills
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            </div>
      
            {/* Categories */}
            <div className="w-full md:w-1/3">
              <>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    aria-expanded={isCategoriesOpen ? "true" : "false"}
                    aria-controls="accordion-flush-body-1"
                  >
                    <h2 className="font-semibold rtl:text-right text-md dark:text-gray-400">Categories</h2>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
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
                        d="M9 5L5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                {isCategoriesOpen && (
                  <div className="mt-6">
                    <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <SearchIcon />
                      </div>
                      <input
                        type="text"
                        value={categorySearchQuery}
                        onChange={(e) => setCategorySearchQuery(e.currentTarget.value)}
                        className="border rounded-lg border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                        placeholder="Search categories"
                      />
                    </div>
                    <div className="mt-3 max-h-96 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700 rounded-lg pb-4 text-left overflow-hidden transform transition-all">
                      {Categories?.slice(0, visibleCategoriesCount).map((category, index) => (
                        <div
                          className="block px-4 dark:text-white whitespace-nowrap py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                          key={index}
                        >
                          <input
                            id={`category-checkbox-${index}`}
                            type="checkbox"
                            value={category.name}
                            checked={selectedCategory.includes(category.name)}
                            onChange={() => handleCheckboxChangeCategory(category.name)}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`category-checkbox-${index}`}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                      {Categories && Categories.length > visibleCategoriesCount && (
                        <button
                          type="button"
                          onClick={() => setVisibleCategoriesCount(Categories.length)}
                          className="text-blue-500 text-sm mt-2"
                        >
                          +{Categories.length - visibleCategoriesCount} More Categories
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
        </form>
      </div>      
    );
};

export default ChallengeFilterPanel;
