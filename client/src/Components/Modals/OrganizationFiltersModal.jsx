import React, { useState, useEffect } from "react";
import CloseIcon from "../icons/CloseIcon";
import countries from "../../countries.json";

const OrganizationFiltersModal = ({
                                      open,
                                      handleClose,
                                      selectedOrganizationTypes,
                                      setSelectedOrganizationTypes,
                                      isVerified,
                                      setIsVerified,
                                      selectedCountry,
                                      setSelectedCountry,
                                  }) => {
    const [isOrganizationTypeOpen, setIsOrganizationTypeOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const countryList = countries?.map((country) => country.name.common);

    const handleOrganizationTypeChange = (event) => {
        const { value, checked } = event.target;
        setSelectedOrganizationTypes((prev) =>
            checked
                ? [...prev, value]
                : prev.filter((type) => type !== value)
        );
    };



    const handleVerifiedChange = (event) => {
        setIsVerified(event.target.checked);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
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
                                Filter Organizations
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
                                onClick={() => setIsOrganizationTypeOpen(!isOrganizationTypeOpen)}
                                aria-expanded={isOrganizationTypeOpen ? "true" : "false"}
                                aria-controls="accordion-flush-body-1"
                            >
                                <span>Organization Type</span>
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
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {isOrganizationTypeOpen && (
                            <div className="mt-6">
                                <div className="flex flex-col space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Company"
                                            checked={selectedOrganizationTypes?.includes("Company")}
                                            onChange={handleOrganizationTypeChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-zinc-700 dark:border-gray-600"
                                        />
                                        <span className="ms-2 text-sm font-medium text-black dark:text-gray-500">Company</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="University"
                                            checked={selectedOrganizationTypes?.includes("University")}
                                            onChange={handleOrganizationTypeChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-zinc-700 dark:border-gray-600"
                                        />
                                        <span className="ms-2 text-sm font-medium text-black dark:text-gray-500">University</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Club"
                                            checked={selectedOrganizationTypes?.includes("Club")}
                                            onChange={handleOrganizationTypeChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-zinc-700 dark:border-gray-600"
                                        />
                                        <span className="ms-2 text-sm font-medium text-black dark:text-gray-500">Club</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Non-Governmental Organization"
                                            checked={selectedOrganizationTypes?.includes("Non-Governmental Organization")}
                                            onChange={handleOrganizationTypeChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-zinc-700 dark:border-gray-600"
                                        />
                                        <span className="ms-2 text-sm font-medium text-black dark:text-gray-500">Non-Governmental Organization</span>
                                    </label>
                                </div>
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
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {isCountryOpen && (
                            <div className="mt-6">
                                <select
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    className="block w-full border rounded-lg border-gray-300 dark:bg-zinc-800 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">Select Country</option>
                                    {countryList?.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="flex items-center mt-6">
                            <input
                                type="checkbox"
                                checked={isVerified}
                                onChange={handleVerifiedChange}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:bg-zinc-700 dark:border-gray-600"
                            />
                            <label className="ms-2 text-sm font-medium text-black dark:text-gray-500">
                                Verified Only
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationFiltersModal;
