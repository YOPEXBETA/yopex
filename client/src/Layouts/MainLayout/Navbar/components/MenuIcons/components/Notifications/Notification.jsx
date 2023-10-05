import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import {
  useSeeNotification,
  useUserNotifications,
} from "../../../../../../../hooks/react-query/useUsers";
import { timeSince } from "../../../../../../../utils";
import { io } from "socket.io-client";
import { NotificationsModal } from "../../../../../../../Components/shared/Modals/NotificationsModal";

const NotificationBell = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: notification } = useUserNotifications(user?._id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const menuRef = useRef(null);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Use a ref to detect clicks outside of the menu
  const outsideClickRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div className="relative" ref={outsideClickRef}>
        <div className="absolute top-0 right-0">
          <button
            onClick={() => {
              handleClick();
              mutate();
              console.log("click");
            }}
            className="flex items-center justify-center rounded-full  w-8 h-8 text-gray-600"
          >
            <NotificationsIcon />
          </button>
        </div>
        <div className="w-8 h-8">
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 text-white text-[10px] flex items-center justify-center">
            {nbrNotifications ? nbrNotifications : 0}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`absolute z-10 right-28 mt-2 bg-white shadow-lg rounded-lg min-w-[380px] max-w-[380px] overflow-visible filter drop-shadow(0px 2px 8px rgba(0,0,0,0.32)) `}
        >
          <ul>
            <li>
              <div className="p-4">
                <h4 className="text-xl font-bold">Notifications</h4>
              </div>
              <hr className="border-t border-gray-200" />
            </li>
            {notifications?.slice(0, 4).map((notification) => (
              <div key={notification?._id}>
                <li>
                  <button
                    className="flex items-center p-4 space-x-4 hover:bg-gray-100 w-full text-left"
                    onClick={() => mutate(notification?._id)}
                  >
                    <img
                      src={
                        notification?.user
                          ? notification?.user?.picturePath
                          : notification?.job
                          ? notification?.job.company?.picturePath
                          : user?.picturePath
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <h5 className="text-md font-bold">
                        {notification?.user
                          ? notification?.user?.firstname +
                            " " +
                            notification?.user?.lastname
                          : notification?.job
                          ? notification?.job.company?.companyName
                          : user.firstname}
                      </h5>
                      <p className="text-sm text-gray-500">
                        {notification?.message}
                        <span className="font-bold">
                          {notification?.job ? notification?.job?.title : ""}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        sent {timeSince(notification?.createdAt)} ago
                      </p>
                    </div>
                  </button>
                </li>
                <hr className="border-t border-gray-200" />
              </div>
            ))}
            <li>
              <button
                onClick={toggleOpen}
                className="block p-4 text-center hover:bg-gray-100 w-full"
              >
                <p className="text-green-500">View all notifications</p>
              </button>
            </li>
          </ul>
        </div>
      )}

      <NotificationsModal open={isOpen} handleClose={toggleOpen} />
    </div>
  );
};

export default NotificationBell;
