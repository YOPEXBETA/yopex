import React from "react";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { useUsers } from "../../../hooks/react-query/useUsers";
import { Link } from "react-router-dom";

const Leaders = () => {
  const { data: leaders } = useUsers();

  if (leaders)
    return (
      <div>
        <div className="p-4 divide-gray-100 bg-white shadow-md dark:divide-gray-700 overflow-hidden rounded-lg dark:bg-zinc-700 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold dark:text-gray-200">Leaders</h4>
          </div>

          {leaders
            .sort((a, b) =>
              a.score > b.score ? -1 : a.score < b.score ? 1 : 0
            )
            .slice(0, 3)
            .map((leader) => (
              <div
                key={leader._id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  {leader.picturePath ? (
                    <img
                      alt="picture"
                      src={leader.picturePath}
                      className="w-11 h-11  border-primary-light rounded-full object-cover border-2"
                    />
                  ) : (
                    <img
                      alt="default"
                      src={AvatarProfile}
                      className="w-11 h-11  border-primary-light rounded-full object-cover border-2"
                    />
                  )}
                  <div className="ml-3">
                    <h6 className="text-md dark:text-gray-200 font-bold">
                      {leader?.firstname}
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {leader?.country || "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg text-primary font-bold text-green-500">
                    {leader.score}
                  </h4>
                  <p className="text-lg text-green-500 italic font-bold">XP</p>
                </div>
              </div>
            ))}
          <div>
            <button className="border w-full rounded-md px-4 py-2 hover:bg-gray-200 dark:text-white">
              <Link to="/leaderboard">View All</Link>
            </button>
          </div>
        </div>
      </div>
    );
};

export default Leaders;
