import React from "react";
import Card from "./index";

const TeamMembersListCard = ({ extra, currentOrganization }) => {
  return (
      <Card extra={`p-4 ${extra}`}>
        <div className="break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl p-4 mb-4 dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none dark:text-white">
              {currentOrganization?.organizationName} Team
            </h3>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentOrganization?.organizationMembers?.map((member) => (
                  <li key={member.userId._id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={member.userId.picturePath || "https://flowbite.com/docs/images/people/profile-picture-1.jpg"} // Fallback image
                            alt={`${member.userId.firstName} ${member.userId.lastName}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-md font-semibold truncate dark:text-white">
                          {member.userId.firstname} {member.userId.lastname}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {member.roleName || "Role"} {/* Fallback role */}
                      </div>
                    </div>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
  );
};

export default TeamMembersListCard;
