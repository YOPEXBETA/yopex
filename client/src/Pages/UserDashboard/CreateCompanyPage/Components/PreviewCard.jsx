import React from 'react';
import OrganizationTypeCard from "../../../../Components/Cards/OrganizationTypeCard";
import {FaGlobe, FaMapMarkerAlt, FaPhone} from "react-icons/fa";
import Card from "../../../../Components/Cards";

const PreviewCard = ({formData, organizationTypeS}) => {


    return (
        <Card className="h-full p-4">
            {organizationTypeS && (
                <h3 className="text-xl font-bold text-center mb-4">Your {organizationTypeS}</h3>
            )}
            {!organizationTypeS && (
                <h3 className="text-xl font-bold text-center mb-4">Your Organization</h3>
            )}
            <div className="flex items-start  mb-4">
                {formData.organizationLogo && formData.organizationLogo.length > 0 ? (
                    <img
                        src={URL.createObjectURL(formData.organizationLogo[0])}
                        alt="Organization Logo"
                        className="w-24 h-24 mr-4 rounded-full"
                    />
                ) : (
                    <div role="status" className="animate-pulse">
                        <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                 viewBox="0 0 20 18">
                                <path
                                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                        </div>
                    </div>
                )}
                <div className="flex flex-col">
                    {formData.name ? (
                        <h3 className="text-lg font-bold mb-2">{formData.name}</h3>
                    ) : (
                        <div role="status" className="animate-pulse">
                            <div
                                className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-start mb-2 pl-12">
                <div className="flex items-center">
                    <FaGlobe className="mr-2 text-gray-400 dark:text-gray-600"/>
                    {formData.websiteURL ? (
                        <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
                            {formData.websiteURL}
                        </p>
                    ) : (
                        <div role="status" className="animate-pulse">
                            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-start mb-2 pl-12">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400 dark:text-gray-600"/>
                    {formData.address && formData.country ? (
                        <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
                            {formData.country}, {formData.address}
                        </p>
                    ) : (
                        <div role="status" className="animate-pulse">
                            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-start mb-2 pl-12">
                <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-400 dark:text-gray-600"/>
                    {formData.phoneNumber ? (
                        <p className="text-gray-700 overflow-hidden overflow-ellipsis text-center">
                            {formData.phoneNumber}
                        </p>
                    ) : (
                        <div role="status" className="animate-pulse">
                            <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
                        </div>
                    )}
                </div>
            </div>
            {formData.description ? (
                <p className="text-sm h-24 break-words overflow-ellipsis overflow-hidden">
                    {formData.description}
                </p>
            ) : (
                <div role="status" className="animate-pulse">
                    <div className="h-24 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
                </div>
            )}

        </Card>
    );
};

export default PreviewCard;
