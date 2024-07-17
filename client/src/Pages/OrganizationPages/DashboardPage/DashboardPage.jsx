import React from "react";
import {useSelector} from "react-redux";

const DashboardPage = ({ }) => {
    const { currentOrganization } = useSelector(state => state.organization);
    console.log('currtorg', currentOrganization)
    return (
        <div>
                <div className="max-w-lg mx-auto bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden">
                    <img
                        className="w-full h-32 object-cover"
                        src={currentOrganization?.organizationLogo}
                        alt={currentOrganization?.organizationName}
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {currentOrganization?.organizationName}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {currentOrganization?.description}
                        </p>
                    </div>
                </div>
        </div>
    );
};

export default DashboardPage;
