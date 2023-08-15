import React, { useState } from "react";

const Guests = [
  {
    id: 1,
    title: "create an interface",
    author: "Netflix",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    title: "create a video",
    author: "Tesla",
    image:
      "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

const RecentChallenges = () => {
  const [currPage, setCurrPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(Guests.length / itemsPerPage);

  return (
    <div
      className="mx-auto py-10 lg:px-24 md:px-11 bg-black text-white border-b-[1px] border-gray-500"
      id="about"
    >
      <div className="pb-8">
        <p className="text-4xl font-bold text-center">Recent Challenges</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 px-12 sm:px-0 pb-16 lg:grid-cols-3">
        {Guests.slice(
          currPage * itemsPerPage,
          (currPage + 1) * itemsPerPage
        ).map(({ id, title, description, author, image }) => (
          <div
            key={id}
            className="border-solid border-green-500 border rounded-md shadow-md hover:scale-105 duration-500 hover:shadow-green-500"
          >
            <div className="flex flex-col">
              <div className="bg- rounded-md p-4 h-72">
                <div className="flex justify-between flex-row-reverse mb-4">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                    <img
                      src={image}
                      alt="Icon"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-left">{title}</p>
                    <p className="text-gray-500 mt-2 text-left">By {author}</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-normal text-left mb-6">
                    {description}
                  </p>
                </div>
                <div>
                  {/*<p className="text-lg  text-left font-bold">Published</p>*/}
                  <p className="text-lg  text-left font-normal text-green-500">
                    21 Juin 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center overflow-x-auto">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            onClick={() => setCurrPage(i)}
            className={`${
              i === currPage ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
            } w-3 h-3 rounded-full mx-2 cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentChallenges;
