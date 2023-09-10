import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMoney } from "react-icons/fa";
import { useSkills } from "../../../../../hooks/react-query/useSkills";

const ContestsFilters = ({ setMinAmount, setMaxAmount,setSkillQuery , selectedSkill }) => {
  const { register, watch } = useForm();

  const minAmount = watch("minAmount");
  const maxAmount = watch("maxAmount");
  const { data:Skills } = useSkills();
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


  useEffect(() => {
    setMinAmount(minAmount);
  }, [minAmount, setMinAmount]);

  useEffect(() => {
    setMaxAmount(maxAmount);
  }, [maxAmount, setMaxAmount]);

  return (
    <div>
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
      
    </div>
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
    
  );
};

export default ContestsFilters;
