import React from "react";
import Card from "./index";
import Tag from "../tags/Index";

const AdditionalUserInfoCard = ({ userProfile, extra, isLoading }) => {
    return (
    <Card extra={`w-full h-full p-6 ${extra}`}>
        <div className="space-y-4">
        {/* Conditionally render Email */}
        {userProfile?.email && (
            <div>
                <h3 className="text-md font-semibold mb-2">Email</h3>
                <a href={`mailto:${userProfile.email}`} className="text-sm leading-relaxed hover:text-green-500">{userProfile.email}</a>
            </div>
            )}
        {/* Conditionally render Phone Number */}
        {userProfile?.phoneNumber && (
            <div>
                <h3 className="text-md font-semibold mb-2">Phone Number</h3>
                <a href={`tel:${userProfile.phoneNumber}`} className="text-sm leading-relaxed hover:text-green-500">
                {userProfile.phoneNumber}
                </a>
            </div>
            )}

        {/* Conditionally render Website URL */}
        {userProfile?.websiteURL && (
            <div>
            <h3 className="text-md font-semibold mb-2">Website URL</h3>
            <a href={userProfile.websiteURL} className="text-sm leading-relaxed hover:text-green-500">
                {userProfile.websiteURL}            
            </a>
            </div>
        )}

        {/* Conditionally render Location */}
        {userProfile?.country && (
            <div>
            <h3 className="text-md font-semibold mb-2">Country</h3>
            <p className="text-sm leading-relaxed">{userProfile.country}</p>
            </div>
        )}

        {/* Conditionally render Skills */}
        {userProfile?.skills && userProfile.skills.length > 0 ? (
            <div>
            <h3 className="text-md font-semibold mb-2 dark:text-white">Skills</h3>
            <div className="w-full flex flex-col">
                <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, index) => (
                    <Tag key={index}>{skill?.name}</Tag>
                ))}
                </div>
            </div>
            </div>
        ) : (
            userProfile?.skills && (
            <div>
                <h3 className="text-md font-semibold mb-2 dark:text-white">Skills</h3>
                <p className="text-sm leading-relaxed dark:text-white">No Skills Found.</p>
            </div>
            )
        )}
      </div>
    </Card>
  );
};

export default AdditionalUserInfoCard;
