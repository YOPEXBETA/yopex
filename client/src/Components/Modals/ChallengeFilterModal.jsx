import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCategories } from "../../hooks/react-query/useCategories";
import CloseIcon from "../icons/CloseIcon";

const ChallengeFilterModal = ({
  open,
  handleClose,
  setMinAmount,
  setMaxAmount,
  setSkillQuery,
  setCategoryQuery,
  selectedCategory,
  selectedSkill,
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
    <div
      className={`fixed z-50 top-0 right-0 h-full flex items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 h-full flex items-center">
        <div className="bg-white dark:bg-zinc-800 md:w-[40rem] w-full h-full px-8 py-4  shadow-md overflow-auto">
          <div className="">
            <div className="flex justify-between items-center">
              <h5 className="text-xl dark:text-white font-semibold">
                Filter Challenges
              </h5>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-xs md:text-sm  inline-flex justify-center items-center  dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <hr className="border-zinc-100 border w-full mt-4" />
          <form className="mt-4">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="fName"
                    className="mb-3 block text-base font-medium dark:text-white"
                  >
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
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="lName"
                    className="mb-3 block text-base font-medium dark:text-white"
                  >
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
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium dark:text-white"
              >
                Challenge Required Skills
              </label>
              <div className="py-2 max-h-52 overflow-y-auto scroll-smooth px-2 scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700   rounded-lg  pb-4 text-left overflow-hidden transform transition-all">
                {itSkills?.map((skillName, index) => (
                  <label
                    key={skillName}
                    className="block text-sm  hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="flex items-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        type="checkbox"
                        value={skillName}
                        checked={selectedSkill.includes(skillName)}
                        onChange={() => handleCheckboxChange(skillName)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="w-full ml-2 text-sm font-medium  rounded dark:text-gray-300">
                        {skillName}
                      </label>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium dark:text-white"
              >
                Challenge Categories
              </label>
              <div className="py-2 max-h-52 overflow-y-auto scroll-smooth px-2 scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700   rounded-lg  pb-4 text-left overflow-hidden transform transition-all">
                {itCategory?.map((CategoryName) => (
                  <label
                    key={CategoryName}
                    className="block text-sm hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="flex items-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        type="checkbox"
                        value={CategoryName}
                        checked={selectedCategory?.includes(CategoryName)}
                        onChange={() =>
                          handleCheckboxChangeCategory(CategoryName)
                        }
                        className="w-4 h-4 text-green-600  rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="w-full ml-2 text-sm font-medium  rounded dark:text-gray-300">
                        {CategoryName}
                      </label>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilterModal;
