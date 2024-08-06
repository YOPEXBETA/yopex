import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import countries from "../../countries.json";
import { useOccupations } from "../../hooks/react-query/useOccupations";
import { useSkills } from "../../hooks/react-query/useSkills";
import Select from 'react-select';

const TalentFiltersModal = ({
                                open,
                                handleClose,
                                selectedOccupation,
                                setSelectedOccupation,
                                selectedCountry,
                                setSelectedCountry,
                                selectedSkills,
                                setSelectedSkills,
                            }) => {
    const [isOccupationOpen, setIsOccupationOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isSkillsOpen, setIsSkillsOpen] = useState(false);

    const { data: occupations } = useOccupations();
    const { data: skills } = useSkills();

    const countryList = countries?.map((country) => ({ label: country.name.common, value: country.name.common }));

    const occupationOptions = occupations?.map((occupation) => ({
        label: occupation.name,
        value: occupation._id,
    }));

    const skillOptions = skills?.map((skill) => ({
        label: skill.name,
        value: skill._id,
    }));

    const handleOccupationChange = (selectedOption) => {
        setSelectedOccupation(selectedOption ? selectedOption.value : "");
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption ? selectedOption.value : "");
    };

    const handleSkillChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    return (
        <div
            className={`fixed z-50 top-0 right-0 h-full flex items-center ${
                open ? "" : "hidden"
            }`}
        >
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="fixed top-0 right-0 h-full flex items-center">
                <div className="bg-white dark:bg-zinc-800 md:w-[40rem] w-screen h-full px-8 py-4 shadow-md overflow-auto">
                    <div className="">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl dark:text-white font-semibold">
                                Filter Talents
                            </h5>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-xs md:text-sm inline-flex justify-center items-center dark:hover:text-white"
                            >
                                <CloseIcon width={4} height={4} />
                            </button>
                        </div>
                    </div>
                    <hr className="border-zinc-100 border w-full mt-4" />
                    <div>
                        <h2 id="accordion-flush-heading-1">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                onClick={() => setIsOccupationOpen(!isOccupationOpen)}
                                aria-expanded={isOccupationOpen ? "true" : "false"}
                                aria-controls="accordion-flush-body-1"
                            >
                                <span>Occupation</span>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transition-transform ${isOccupationOpen ? "rotate-180" : ""}`}
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
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {isOccupationOpen && (
                            <div className="mt-6">
                                <Select
                                    value={occupationOptions.find(option => option.value === selectedOccupation)}
                                    onChange={handleOccupationChange}
                                    options={occupationOptions}
                                    placeholder="Select Occupation"
                                    className="basic-single"
                                    classNamePrefix="select"
                                />
                            </div>
                        )}
                        <h2 id="accordion-flush-heading-2">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                                aria-expanded={isCountryOpen ? "true" : "false"}
                                aria-controls="accordion-flush-body-2"
                            >
                                <span>Country</span>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
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
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {isCountryOpen && (
                            <div className="mt-6">
                                <Select
                                    value={countryList.find(option => option.value === selectedCountry)}
                                    onChange={handleCountryChange}
                                    options={countryList}
                                    placeholder="Select Country"
                                    className="basic-single"
                                    classNamePrefix="select"
                                />
                            </div>
                        )}
                        <h2 id="accordion-flush-heading-3">
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                                aria-expanded={isSkillsOpen ? "true" : "false"}
                                aria-controls="accordion-flush-body-3"
                            >
                                <span>Skills</span>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transition-transform ${isSkillsOpen ? "rotate-180" : ""}`}
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
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {isSkillsOpen && (
                            <div className="mt-6">
                                <Select
                                    isMulti
                                    value={skillOptions.filter(option => selectedSkills.includes(option.value))}
                                    onChange={handleSkillChange}
                                    options={skillOptions}
                                    placeholder="Select Skills"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalentFiltersModal;
