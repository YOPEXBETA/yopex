import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useSeeNotification,
  useUserNotifications,
} from "../../../hooks/react-query/useUsers";
import { timeSince } from "../../../utils";
import { io } from "socket.io-client";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";

const NotificationMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: notification } = useUserNotifications(user?._id);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const { mutate } = useSeeNotification(user?._id);
  const [nbrNotifications, setNbrNotifications] = useState(0);
  const url = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    const newSocket = io(`${url}`);
    setSocket(newSocket);
    newSocket.emit("joinRoom", { roomid: user?._id });
    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (!notification) return;
    setNotifications(notification.notification);
    setNbrNotifications(notification.nbr);
  }, [notification]);

  useEffect(() => {
    if (!socket) return;
    socket.on("notification", (notification) => {
      
      setNotifications((prev) => [notification, ...prev]);
      setNbrNotifications((prev) => prev + 1);
    });
    return () => socket.off("notification");
  }, [socket]);
  return (
    <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-zinc-700 dark:text-white dark:shadow-none sm:w-[460px]">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-zinc-700 dark:text-white">
          Notifications
        </p>
      </div>

      <ul>
        {notifications?.slice(0, 4).map((notification) => (
          <div key={notification?._id} onClick={() => mutate(notification?._id)}>
            <li>
              <button
                className="flex items-center p-4 space-x-4  hover:bg-gray-100 dark:hover:bg-zinc-800 w-full text-left"
                
              >
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
