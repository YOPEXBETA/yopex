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
        <div className="absolute top-8 left-0 right-0 bg-white dark:bg-zinc-800 border rounded-lg mt-4 p-4 shadow-md z-10">
            <div className="flex justify-between items-center">
                <h5 className="text-xl dark:text-white font-semibold">Filter Challenges</h5>
                <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-xs md:text-sm inline-flex justify-center items-center dark:hover:text-white"
                >
                    <CloseIcon width={4} height={4} />
                </button>
            </div>
            <hr className="border-zinc-100 border w-full mt-4" />

            <form className="mt-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Price Range */}
                    <div className="w-full md:w-1/3">
                        <h2 className="font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-3">
                            Price Range
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-1">
                            {/* Min and Max Price Inputs */}
                            <div className="w-full">
                                <div className="mb-5">
                                    <label htmlFor="min-amount" className="mb-3 block text-base font-medium dark:text-white">
                                        Min price amount
                                    </label>
                                    <input
                                        id="min-amount"
                                        type="number"
                                        placeholder="Min Price Amount"
                                        {...register("minAmount")}
                                        min={0}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="mb-5">
                                    <label htmlFor="max-amount" className="mb-3 block text-base font-medium dark:text-white">
                                        Max price amount
                                    </label>
                                    <input
                                        id="max-amount"
                                        type="number"
                                        placeholder="Max Price Amount"
                                        {...register("maxAmount")}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="w-full md:w-1/3">
                        <h2 className="font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-3">
                            Skills
                        </h2>
                        <div className="mt-3">
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    value={skillSearchQuery}
                                    onChange={(e) => setSkillSearchQuery(e.currentTarget.value)}
                                    className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                                    placeholder="Search skills"
                                />
                            </div>
                            {Skills?.slice(0, visibleSkillsCount).map((skill, index) => (
                                <div className="flex items-center mt-2" key={index}>
                                    <input
                                        id={`skill-checkbox-${index}`}
                                        type="checkbox"
                                        value={skill.name}
                                        checked={selectedSkill.includes(skill.name)}
                                        onChange={() => handleCheckboxChange(skill.name)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`skill-checkbox-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {skill.name}
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

                    {/* Categories */}
                    <div className="w-full md:w-1/3">
                        <h2 className="font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-3">
                            Categories
                        </h2>
                        <div className="mt-3">
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    value={categorySearchQuery}
                                    onChange={(e) => setCategorySearchQuery(e.currentTarget.value)}
                                    className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                                    placeholder="Search categories"
                                />
                            </div>
                            {Categories?.slice(0, visibleCategoriesCount).map((category, index) => (
                                <div className="flex items-center mt-2" key={index}>
                                    <input
                                        id={`category-checkbox-${index}`}
                                        type="checkbox"
                                        value={category.name}
                                        checked={selectedCategory.includes(category.name)}
                                        onChange={() => handleCheckboxChangeCategory(category.name)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`category-checkbox-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                </div>
            </form>
        </div>
    );
};

export default ChallengeFilterPanel;
