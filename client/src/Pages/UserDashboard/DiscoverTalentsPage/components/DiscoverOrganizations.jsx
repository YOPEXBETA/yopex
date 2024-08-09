import React, {useEffect, useState} from "react";
import DiscoverCompanyCard from "../../../../Components/Cards/DiscoverCompanyCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import OrganizationFiltersModal from "../../../../Components/Modals/OrganizationFiltersModal";
import FilterIcon from "../../../../Components/icons/FilterIcon";
import SearchIcon from "../../../../Components/icons/SearchIcon";
import useDebounce from "../../../../hooks/useDebounce";

const DiscoverOrganizations = ({
                                   suggestedOrganizations,
                                   isLoading,
                                   companyQuery,
                                   setCompanyQuery,
                                   user,
                                   handleChangePage,
                                   organizationTotalPages,
                                   displayedOrganizationPages,
                                   page,
                                   selectedOrganizationType,
                                   setSelectedOrganizationType,
                                   isVerified,
                                   setIsVerified,
                                   selectedCountry,
                                   setSelectedCountry,
                               }) => {
    const [openFiltersModal, setOpenFiltersModal] = useState(false);
    const toggleFiltersModal = () => setOpenFiltersModal((prev) => !prev);


    return (
        <div>
            <div className="flex space-x-4 mb-5">
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        id="organization-search"
                        value={companyQuery}
                        onChange={(e) => setCompanyQuery(e.currentTarget.value)}
                        className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
                        placeholder="Search for Organizations"
                    />
                </div>
                <button
                    onClick={toggleFiltersModal}
                    type="button"
                    className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-black rounded-full border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                >
                    <FilterIcon />
                    Filters
                </button>
            </div>

            <OrganizationFiltersModal
                open={openFiltersModal}
                handleClose={toggleFiltersModal}
                selectedOrganizationTypes={selectedOrganizationType}  // Ensure this matches the prop name in OrganizationFiltersModal
                setSelectedOrganizationTypes={setSelectedOrganizationType}  // Ensure this matches the prop name in OrganizationFiltersModal
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />


            <h5 className="my-5 text-xl text-left dark:text-white">
                Organizations ({suggestedOrganizations?.organizationCount})
            </h5>
            <hr />
            {isLoading ? (
                <div className="text-center mt-4">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-2">
                    {suggestedOrganizations?.organizations?.length > 0 ? (
                        suggestedOrganizations.organizations.map((option, index) => (
                            <DiscoverCompanyCard
                                key={index}
                                option={option}
                                companyQuery={companyQuery}
                                user={user}
                            />
                        ))
                    ) : (
                        <div className="mt-2">
                            <p className="dark:text-white">No company found.</p>
                        </div>
                    )}
                </div>
            )}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => handleChangePage(page - 1)}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={page === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:-scale-x-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>
                    <span>Previous</span>
                </button>

                <div className="items-center hidden md:flex gap-x-3">
                    {Array.from(
                        { length: displayedOrganizationPages },
                        (_, index) => page + index
                    )
                        .filter((pageNumber) => pageNumber <= organizationTotalPages)
                        .map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handleChangePage(pageNumber)}
                                className={`px-2 py-1 text-sm rounded-md ${
                                    pageNumber === page
                                        ? "text-green-500 bg-green-100"
                                        : "text-gray-500 dark:hover:bg-zinc-800 dark:text-gray-100 hover:bg-gray-100"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                </div>

                <button
                    onClick={() => handleChangePage(page + 1)}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={page === organizationTotalPages}
                >
                    <span>Next</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:-scale-x-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DiscoverOrganizations;
