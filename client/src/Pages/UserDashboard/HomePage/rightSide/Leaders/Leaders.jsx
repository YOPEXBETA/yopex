import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const getAllUsers = async () => {
  const { data } = await axios.get("http://localhost:8000/allusers", {
    withCredentials: true,
  });
  return data;
};

const Leaders = () => {
  const { data: leaders } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (leaders)
    return (
      <div className="p-4 bg-white border-green-500 border-b-2 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-medium">Leaders</h4>
          <a
            href="/leaderboard"
            className="text-sm text-gray-500 hover:underline"
          >
            view all
          </a>
        </div>

        {leaders
          .sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
          .slice(0, 3)
          .map((leader) => (
            <div
              key={leader._id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={leader.picturePath}
                  alt={`${leader.firstname}'s Avatar`}
                  className="w-11 h-11 border-2 border-primary-light rounded-full object-cover bg-green-500"
                />
                <div className="ml-3">
                  <h6 className="text-md font-medium">{leader.firstname}</h6>
                  <p className="text-sm text-gray-500">{leader.country}</p>
                </div>
              </div>
              <p className="font-bold text-primary text-green-500 text-[1rem]">
                {leader.score} XP
              </p>
            </div>
          ))}
      </div>
    );
};
export default Leaders;
