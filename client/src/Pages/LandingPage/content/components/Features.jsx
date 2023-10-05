import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaBriefcase />,
      title: "Apply To Jobs",
      description: "Apply to job postings and advance your career",
    },
    {
      id: 2,
      icon: <RiLightbulbLine />,
      title: "Challenge yourself",
      description:
        "Participate in freelance challenges to showcase your skill and get experience points",
    },
    {
      id: 3,
      icon: <AiOutlineFileText />,

      title: "Automatic Resume Build",
      description:
        "The platform build your resume, showcasing your achievements and experiences seamlessly",
    },
    {
      id: 4,
      icon: <FiUsers />,
      title: "Connect With Freelancers",
      description: "connect with other freelancers in your industry",
    },
  ];

  return (
    <div
      name="about"
      className="w-full bg-white lg:px-24 md:px-11 py-10 border-b-[1px] border-gray-500"
    >
      <div className="pb-11">
        <p className="text-4xl font-extrabold text-center text-black">
          Features
        </p>
      </div>

      {/* Add padding to create space at the bottom of the card container */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 px-12 sm:px-0 pb-16 lg:grid-cols-4">
        {features.map(({ id, icon, title, description }) => (
          <div
            key={id}
            className={`relative bg-green-500 border-solid border-gray-300 border rounded-md shadow-md hover:scale-105 duration-500 hover:shadow-green-500`}
          >
            <div className="bg-white rounded-t-md p-4 h-72 flex flex-col items-center gap-5">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <div className="text-4xl text-white">{icon}</div>
              </div>
              <div>
                <p className="text-xl text-black font-semibold text-center">
                  {title}
                </p>
                <p className="text-gray-600 mt-2 text-center">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
