import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaExternalLinkAlt } from 'react-icons/fa'; // Import icons

const InvitationModal = ({ organization, isOpen, onClose, onAccept, onRefuse }) => {
    if (!isOpen || !organization) return null;

    const {
        organizationName,
        organizationLogo,
        organizationBanner,
        organizationType,
        country,
        address,
        PhoneNumber,
        websiteURL,
        organizationDescription,
    } = organization;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full relative ">
                {/* Organization Banner */}
                {organizationBanner && (
                    <div className="relative">
                        <img
                            src={organizationBanner}
                            alt={`${organizationName} Banner`}
                            className="w-full h-32 object-cover border-b-4 border-gray-100"
                        />

                        {/* Organization Logo */}
                        <div className="absolute inset-x-0 flex justify-center" style={{ top: '100%' }}>
                            <img
                                src={organizationLogo}
                                alt={organizationName}
                                className="w-24 h-24 object-contain rounded-full border-4 border-gray-100 -mt-12" // Negative margin to pull the logo down
                            />
                        </div>
                    </div>
                )}

                {/* Organization Details */}
                <div className="p-6 mt-6"> {/* Increased margin-top to create space for the logo */}
                    <div className="text-center mb-4">
                        <h1 className="text-2xl font-bold mb-1">
                            Invitation to Join {organizationName}
                        </h1>
                        <p className="text-gray-600">
                            You have been invited to join {organizationName} as a member.
                        </p>
                    </div>

                    {/* Organization Type as a Tag */}
                    <div className="flex justify-center mb-6">
                        <span
                            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {organizationType}
                        </span>
                    </div>

                    {/* Additional Information */}
                    <div className="grid grid-cols-1 gap-4 text-left mb-6">
                        <div className="flex items-center text-gray-800">
                            <FaMapMarkerAlt className="mr-2 text-gray-500"/>
                            <span className="font-semibold mr-1">Location:</span>
                            <span>{`${country}, ${address}`}</span>
                        </div>
                        <div className="flex items-center text-gray-800">
                            <FaPhoneAlt className="mr-2 text-gray-500"/>
                            <span className="font-semibold mr-1">Phone:</span>
                            <span>{PhoneNumber}</span>
                        </div>
                        <div className="flex items-center text-gray-800">
                            <FaExternalLinkAlt className="mr-2 text-gray-500"/>
                            <span className="font-semibold mr-1">Website:</span>
                            <a
                                href={websiteURL}
                                className="text-blue-500 hover:underline ml-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {organizationName}
                            </a>
                        </div>
                    </div>

                    {/* Organization Description */}
                    {organizationDescription && (
                        <div className="flex-grow overflow-y-auto max-h-32 mb-4">
                            <h2 className="text-lg font-semibold mb-2">About {organizationName}</h2>
                            <p className="text-gray-600 break-words">{organizationDescription}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onRefuse}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Refuse
                        </button>
                        <button
                            onClick={onAccept}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitationModal;
