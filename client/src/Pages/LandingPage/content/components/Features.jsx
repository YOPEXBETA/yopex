import React from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Apply To Jobs",
      description: "Apply to job postings and advance your career",
    },
    {
      id: 2,
      title: "Challenge yourself",
      description:
        "Participate in freelance challenges to showcase your skill and get experience points",
    },
    {
      id: 3,
      title: "Automatic Resume Build",
      description:
        "The platform build your resume, showcasing your achievements and experiences seamlessly",
    },
    {
      id: 4,
      title: "Connect With Freelancers",
      description: "connect with other freelancers in your industry",
    },
  ];

  return (
    <div
      name="Events"
      className="bg-black w-full text-white lg:px-24 md:px-11 py-10 border-b-[1px] border-gray-500"
    >
      <div className="pb-11">
        <p className="text-4xl font-bold text-center">Features</p>
      </div>

      {/* Add padding to create space at the bottom of the card container */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 px-12 sm:px-0 pb-16 lg:grid-cols-4">
        {features.map(({ id, title, description }) => (
          <div
            key={id}
            className={`relative border-solid border-green-500 border rounded-md shadow-md hover:scale-105 duration-500 hover:shadow-green-500`}
          >
            <div className="bg- rounded-md p-4 h-72 flex flex-col items-center gap-5">
              <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                {/*<img
                  alt="Icon"
                  className="w-20 h-20 object-cover rounded-full"
           />*/}
              </div>
              <div>
                <p className="text-xl font-bold text-center">{title}</p>
                <p className="text-gray-500 mt-2 text-center">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
