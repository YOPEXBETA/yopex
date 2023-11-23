import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white font-sans border rounded-lg">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-col gap-4 mb-4">
            <h2 className="text-xl font-semibold">Summary</h2>
            <hr className="border w-full" />
          </div>

          <p className="text-gray-700">
            {userProfile?.userDescription || "No description"}
          </p>
          {/*<h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <MdEmail className="inline h-5 w-5" />{" "}
              <span>{userProfile?.email}</span>
            </li>
            <li>
              <MdPhone className="inline h-5 w-5" />{" "}
              <span>
                <a
                  href={`tel:${userProfile?.phoneNumber}`}
                  className="dark:text-green-500 hover:underline"
                >
                  {userProfile?.phoneNumber}
                </a>
              </span>
            </li>
            <li>
              <MdWeb className="inline h-5 w-5" />{" "}
              <span>
                <a
                  href={userProfile?.websiteURL}
                  className="dark:text-green-500 hover:underline"
                >
                  {userProfile?.websiteURL || "N/A"}
                </a>
              </span>
            </li>
  </ul>*/}

          {userProfile && (
            <>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mt-4 mb-2">
                    Experience
                  </h2>
                </div>
                <hr className="border w-full" />
              </div>

              {userProfile.experiences.map((experience, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {experience.title}
                      </h3>
                      <p className="text-green-500">{experience?.company}</p>
                      <p className="text-gray-600 mb-2">
                        {new Date(experience?.startdate).toLocaleString(
                          "default",
                          { month: "short", year: "numeric" }
                        )}{" "}
                        -{" "}
                        {experience.enddate === undefined
                          ? new Date(experience?.enddate).toLocaleString(
                              "default",
                              { month: "short", year: "numeric" }
                            )
                          : "Present"}
                      </p>
                    </div>
                    <img
                      className="rounded-lg h-16 w-16 object-cover bg-gray-50 mt-2"
                      src={
                        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={`Experience ${index}`}
                    />
                  </div>
                  <p className="text-gray-700">{experience?.description}</p>
                </div>
              ))}
            </>
          )}

          <div>
            {userProfile && (
              <>
                <div className="flex flex-col gap-4 mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mt-4 mb-2">
                      Education
                    </h2>
                  </div>
                  <hr className="border w-full" />
                </div>
                {userProfile.educations.map((education, index) => (
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {education?.Degree}
                      </h3>
                      <p className="text-green-500">{education?.School}</p>
                      <p className="text-gray-600">
                        Graduated in{" "}
                        {new Date(education?.Enddate).getFullYear()}
                      </p>
                      {index < userProfile.educations.length - 1 && (
                        <hr className="border-t border-gray-300 my-4" />
                      )}
                    </div>
                    <img
                      className="rounded-lg h-16 w-16 object-cover bg-gray-50"
                      src={
                        "https://images.unsplash.com/photo-1576049519901-ef17971aedc4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={`Experience ${index}`}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInformations;
