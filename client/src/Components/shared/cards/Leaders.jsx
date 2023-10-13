import React from "react";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { useUsers } from "../../../hooks/react-query/useUsers";

const Leaders = () => {
  const { data: leaders } = useUsers();

  if (leaders)
    return (
      <div className="p-4 bg-white border-green-500 dark:bg-zinc-800 dark:shadow-green-600 dark:shadow-sm   border-b-2 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-medium dark:text-gray-200">Leaders</h4>
          <a
            href="/leaderboard"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
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
                  <h6 className="text-md font-medium dark:text-gray-200">{leader.firstname}</h6>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{leader.country}</p>
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
      </div>
    );
};

export default Leaders;
