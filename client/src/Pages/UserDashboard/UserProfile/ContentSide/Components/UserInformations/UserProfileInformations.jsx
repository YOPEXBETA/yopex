import React from "react";
import { useParams } from "react-router-dom";

import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useEducation } from "../../../../../../hooks/react-query/useEducation";

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
  const staticExperienceData = [
    {
      logo: "",
      title: "Web Developer, ABC Company",
      description:
        "Developed and maintained company website, implementing responsive design and optimizing performance. Collaborated with the design team to create visually appealing web pages.",
      startDate: "January 2020",
      endDate: "Present",
    },
    {
      logo: "",
      title: "Frontend Developer, XYZ Agency",
      description:
        "Worked on various client projects, translating design mockups into interactive web pages. Utilized modern web technologies to ensure cross-browser compatibility.",
      startDate: "June 2018",
      endDate: "December 2019",
    },
  ];

  return (
    <div>
      <div className="bg-white font-sans rounded-lg">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">
            {userProfile.userDescription || "No description"}
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
          {userProfile?.skills?.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {userProfile.skills.map((skill, index) => (
                <li key={index} className="mb-2">
                  {skill?.value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base dark:text-white">No skill selected</p>
          )}
          {userProfile && (
            <>
              <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
              {userProfile.experiences.map((experience, index) => (
                <div key={index} className="flex gap-4 items-start mb-8">
                  <img
                    className="rounded-lg h-16 w-16 object-cover bg-gray-50"
                    src={
                      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={`Experience ${index}`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {experience.title}
                    </h3>
                    <p className="text-gray-700">{experience.company}</p>
                    <p className="text-gray-600 mb-2">
                      {(new Date(experience.startdate)).toLocaleString('default', { month: 'short',year:"numeric" })} - {experience.enddate===undefined ? (new Date(experience.enddate)).toLocaleString('default', { month: 'short',year:"numeric" }):"Present"}
                    </p>
                    <p className="text-gray-700">{experience.description}</p>
                  </div>
                  <hr className="border-b-2  border-gray-700 my-4" />
                </div>
              ))}
            </>
          )}

          <div>
            {userProfile && (
              <>
                <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
                {userProfile.educations.map((education, index) => (
                  <div key={index} className="flex gap-4 items-start mb-8">
                    <img
                      className="rounded-lg h-16 w-16 object-cover bg-gray-50"
                      src={
                        "https://images.unsplash.com/photo-1576049519901-ef17971aedc4?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={`Experience ${index}`}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {education.Degree}
                      </h3>
                      <p className="text-gray-700">{education.School}</p>
                      <p className="text-gray-600">
                        Graduated in {new Date(education.Enddate).getFullYear()}
                      </p>
                      {index < userProfile.educations.length - 1 && (
                        <hr className="border-t border-gray-300 my-4" />
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>email: {userProfile?.email}</li>
            <li>
              Phone:{" "}
              <a
                href={`tel:${userProfile?.phoneNumber}`}
                className="text-green-500 hover:underline"
              >
                {userProfile?.phoneNumber}
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://www.johndoe.com"
                className="text-green-500 hover:underline"
              >
                {userProfile?.websiteURL || "N/A"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInformations;
