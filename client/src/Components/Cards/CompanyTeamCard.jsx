import React from "react";
import Card from ".";
import { useUsersData } from "../../hooks/react-query/useUsers";
import {useNavigate} from "react-router-dom";

const CompanyTeamCard = ({ company, extra }) => {
    const navigate = useNavigate();
  return (
      <div>
        <Card extra={`p-3 ${extra}`}>
          <div className="flex flex-col items-center w-full">
            <div className="mt-2 mb-8 w-full">
              <p className="px-2 text-lg font-bold dark:text-white">
                {company?.organizationName} Team ({company.organizationMembers.length})
              </p>
            </div>
            {company.organizationMembers.length === 0 ? (
                <span className="text-gray-600">
              You haven't added any team members to your organization yet.
            </span>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {company.organizationMembers.map((member) => (
                      <div key={member.userId._id}
                           className="bg-white p-4 rounded-lg shadow-md flex items-center"
                           onClick={() => {
                               navigate(`/profile/${member.userId._id}`);
                           }}>
                          <img
                              src={member.userId.picturePath}
                              alt={`${member.userId.firstname} ${member.userId.lastname}`}
                              className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                              <p className="font-semibold">{member.userId.firstname} {member.userId.lastname}</p>
                              <p className="text-gray-600">{member.roleName}</p>
                          </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </Card>
      </div>
  );
};

export default CompanyTeamCard;
