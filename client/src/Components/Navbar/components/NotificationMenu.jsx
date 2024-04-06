import React from "react";
import { timeSince } from "../../../utils";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const NotificationMenu = ({ notifications, user, mutate }) => {
  return (
    <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-zinc-700 dark:text-white dark:shadow-none sm:w-[460px]">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-zinc-700 dark:text-white">
          Notifications
        </p>
      </div>

      <ul>
        {notifications?.notification?.slice(0, 6).map((notification) => (
          <div
            key={notification?._id}
            onClick={() => mutate(notification?._id)}
          >
            <li>
              <button className="flex items-center p-4 space-x-4  hover:bg-gray-100 dark:hover:bg-zinc-800 w-full text-left">
                {notification?.user?.picturePath ||
                (notification?.job
                  ? notification?.job?.company?.picturePath
                  : user?.picturePath) ? (
                  <img
                    src={
                      notification?.user
                        ? notification?.user?.picturePath
                        : notification?.job
                        ? notification?.job.company?.picturePath
                        : user?.picturePath
                    }
                    className="w-10 h-10 rounded-full border"
                  />
                ) : (
                  <img
                    alt="default"
                    src={AvatarProfile}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex-grow">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-200 truncate w-60">
                      {notification?.message}
                      <span className="font-bold">
                        {notification?.job ? notification?.job?.title : ""}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs dark:text-gray-200 text-gray-500">
                    sent {timeSince(notification?.createdAt)} ago
                  </p>
                </div>
              </button>
            </li>
            <hr className="border-t border-gray-200" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMenu;
