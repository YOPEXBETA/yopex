import React from 'react';

const InvitationModal = ({ organization, isOpen, onClose, onAccept, onRefuse }) => {
    if (!isOpen || !organization) return null;

    const {
        organizationName,
        organizationLogo,
        organizationType,
        country,
        address,
        PhoneNumber,
        websiteURL,
        organizationDescription
    } = organization;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold mb-2">Invited to Join {organizationName}</h1>
                    <p className="text-gray-500">You have been invited to join {organizationName}. Would you like to accept?</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <img src={organizationLogo} alt={organizationName} className="w-20 h-20 object-contain rounded-full" />
                    <div className="ml-4">
                        <h2 className="text-xl font-bold">{organizationName}</h2>
                        <p className="text-gray-500 text-sm">{organizationType}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <p><span className="font-bold">Country:</span> {country}</p>
                    <p><span className="font-bold">Address:</span> {address}</p>
                    <p><span className="font-bold">Phone:</span> {PhoneNumber}</p>
                    <p><span className="font-bold">Website:</span> <a href={websiteURL} className="text-blue-500 hover:underline">{websiteURL}</a></p>
                </div>
                <div className="flex justify-end">
                    <button onClick={onRefuse} className="px-4 py-2 bg-red-500 text-white rounded mr-4 hover:bg-red-600">Refuse</button>
                    <button onClick={onAccept} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default InvitationModal;
