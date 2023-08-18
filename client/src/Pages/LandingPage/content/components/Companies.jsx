import React, { useState, useEffect } from "react";
import razer from "../../../../assets/razer.png";
import paypal from "../../../../assets/paypal.png";
import netlfix from "../../../../assets/netflix.png";

const Guests = [
  {
    id: 1,
    author: "Razer",
    image: razer,
  },
  {
    id: 2,
    author: "Paypal",
    image: paypal,
  },
  {
    id: 3,
    author: "Netflix",
    image: netlfix,
  },
];

const Companies = () => {
  const [currPage, setCurrPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(Guests.length / itemsPerPage);

  // Function to go to the next page automatically every 2 seconds
  const goToNextPage = () => {
    setCurrPage((prevPage) => (prevPage + 1) % totalPages);
  };

  useEffect(() => {
    // Set the interval to call goToNextPage every 2 seconds
    const interval = setInterval(goToNextPage, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div
      className="mx-auto py-10 lg:px-24 md:px-11 bg-black text-white border-b-[1px] border-gray-500"
      id="about"
    >
      <div className="pb-8">
        <p className="text-4xl font-bold text-center">Companies</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {Guests.slice(
          currPage * itemsPerPage,
          (currPage + 1) * itemsPerPage
        ).map((Guest) => (
          <div key={Guest.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div>
              <div className="flex gap-3 items-center mb-4 flex-col">
                <img
                  src={Guest.image}
                  alt={Guest.author}
                  className="w-32 h-32 rounded-xl object-contain mr-4"
                />
                <div>
                  <h2 className="text-2xl font-medium">{Guest.author}</h2>
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

export default Companies;
