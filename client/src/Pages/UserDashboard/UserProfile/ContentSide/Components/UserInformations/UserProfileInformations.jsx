import React from "react";
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

          <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Web Developer, ABC Company
            </h3>
            <p className="text-gray-700">
              Developed and maintained company website, implementing responsive
              design and optimizing performance. Collaborated with the design
              team to create visually appealing web pages.
            </p>
            <p className="text-gray-600">January 2020 - Present</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Frontend Developer, XYZ Agency
            </h3>
            <p className="text-gray-700">
              Worked on various client projects, translating design mockups into
              interactive web pages. Utilized modern web technologies to ensure
              cross-browser compatibility.
            </p>
            <p className="text-gray-600">June 2018 - December 2019</p>
          </div>

          <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Bachelor of Science in Computer Science
            </h3>
            <p className="text-gray-700">University of Example</p>
            <p className="text-gray-600">Graduated in May 2018</p>
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
