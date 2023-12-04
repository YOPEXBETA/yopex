import React from "react";
import Card from "./index";

const UserInfoCard = ({ userProfile, extra }) => {
  return (
    <Card extra={`p-6 ${extra}`}>
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <hr className="border w-full" />
      </div>

      <p>{userProfile?.userDescription || "No description"}</p>

      {userProfile?.experiences && userProfile?.experiences.length > 0 && (
        <>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
            </div>
            <hr className="border w-full" />
          </div>

          {userProfile?.experiences?.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <p className="text-green-500">{experience?.company}</p>
                  <p className="mb-2">
                    {new Date(experience?.startdate).toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {experience.enddate === undefined
                      ? new Date(experience?.enddate).toLocaleString(
                          "default",
                          { month: "short", year: "numeric" }
                        )
                      : "Present"}
                  </p>
                </div>
                {/*
                <img
                  className="rounded-lg h-16 w-16 object-cover bg-zinc-200 mt-2"
                  src={""}
                  alt={`Experience`}
                />
                      */}
              </div>
              <p>{experience?.description}</p>
              <div className="flex flex-wrap gap-2 my-4">
                {experience?.skills?.map((skill, index) => (
                  <span
                    className="px-2 py-1 bg-white  dark:text-black border rounded-full"
                    key={index}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      <div>
        {userProfile?.educations && userProfile?.educations.length > 0 && (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
              </div>
              <hr className="border w-full" />
            </div>
            {userProfile?.educations?.map((education, index) => (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {education?.Degree}
                    </h3>
                    <p className="text-green-500">{education?.School}</p>
                    <p>
                      Graduated in {new Date(education?.Enddate).getFullYear()}
                    </p>
                    {index < userProfile.educations.length - 1 && (
                      <hr className="border-t border-gray-300 my-4" />
                    )}
                  </div>
                  {/*
                  <img
                    className="rounded-lg h-16 w-16 object-cover bg-zinc-200"
                    src={""}
                    alt={`Experience`}
                  />
                    */}
                </div>
                <div className="flex flex-wrap gap-2 my-4">
                  {education?.skills?.map((skill, index) => (
                    <span
                      className="px-2 py-1 bg-white dark:text-black border rounded-full"
                      key={index}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Card>
  );
};

export default UserInfoCard;
