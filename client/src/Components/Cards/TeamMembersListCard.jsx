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
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                      alt="Neil"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                  <p className="text-md font-semibold truncate dark:text-white">
                  Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold dark:text-white">
                    Admin
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                  <p className="text-md font-semibold truncate dark:text-white">
                  Bonnie Green
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold dark:text-white">
                    Member
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                  <p className="text-md font-semibold truncate dark:text-white">
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold dark:text-white">
                    Member
                  </div>
                </div>
              </li>
            </ul>
          </div>
          </div>
    </Card>
  );
};

export default TeamMembersListCard;
