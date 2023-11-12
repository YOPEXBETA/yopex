import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import { useUsers } from "../../../hooks/react-query/useUsers";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

const TopLeadersCard = () => {
  const { data: leaders, isLoading } = useUsers();

  // Sort leaders array by score
  const sortedLeaders = leaders?.sort((a, b) =>
    a.score > b.score ? -1 : a.score < b.score ? 1 : 0
  );

  return (
    <div className="mx-auto">
      <div className="rounded-lg py-4  dark:bg-zinc-800 dark:border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className=" text-zinc-900 dark:text-white font-bold">Leaders</h3>

          <Link to="/leaderboard">
            <a className="text-sm font-medium text-zinc-500 hover:underline dark:text-green-500">
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
                    index === sortedLeaders?.length - 1 ? "pb-0" : "sm:py-4"
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
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {leader?.firstname}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {leader?.country || "Unknown"}
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
  );
};

export default TopLeadersCard;
