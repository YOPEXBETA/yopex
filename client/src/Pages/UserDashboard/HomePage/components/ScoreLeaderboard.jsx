import React from "react";
import { useSelector } from "react-redux";
import { useUsers } from "../../../../hooks/react-query/useUsers";
import { Link } from "react-router-dom";
import LevelLoading from "../../../../Components/Progress/LevelLoading";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import Card from "../../../../Components/Cards";

const ScoreLeaderboard = ({ extra }) => {
  const { user } = useSelector((state) => state.auth);
  const { data: leaders, isLoading } = useUsers();

  // Sort leaders array by score
  const sortedLeaders = leaders?.users;

  return (
    <div className="w-full sticky top-24">
      <Card extra={`px-6 py-2 ${extra}`}>
        <div className="flex flex-col  justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-2 xl:space-x-0">
          <div className="flex flex-col justify-start items-start flex-shrink-0">
            <div className="flex justify-center w-full md:justify-start items-center space-x-4 pt-4  border-gray-200">
              {user?.picturePath ? (
                <img
                  alt="picture"
                  src={user?.picturePath}
                  className="rounded-full border h-12 w-12 object-cover"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="rounded-full h-12 border w-12 object-contain"
                />
              )}
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                  {`${user?.firstname} ${user?.lastname}`}
                </p>
                <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                  {user?.occupation || "N/A"}
                </p>
              </div>
            </div>
            <LevelLoading />
          </div>
          <div className="mx-auto">
            <div className="rounded-lg py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className=" text-zinc-900 dark:text-white font-bold">
                  Leaders
                </h3>

                <Link to="/leaderboard">
                  <a className="text-sm text-zinc-500 hover:underline dark:text-green-500">
                    View all
                  </a>
                </Link>
              </div>
              <hr />
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {isLoading ? (
                    <div>
                      <LoadingSpinner />
                    </div>
                  ) : (
                    sortedLeaders?.slice(0, 4)?.map((leader, index) => (
                      <li
                        key={index}
                        className={`py-3 ${
                          index === sortedLeaders?.length - 1
                            ? "pb-0"
                            : "sm:py-4"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {leader?.picturePath ? (
                              <img
                                alt="picture"
                                src={leader?.picturePath}
                                className="w-9 h-9 border-primary-light rounded-full object-cover border-2"
                              />
                            ) : (
                              <img
                                alt="default"
                                src={AvatarProfile}
                                className="w-9 h-9 border-primary-light rounded-full object-cover border-2"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              {leader?.firstname}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {leader?.score}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScoreLeaderboard;
