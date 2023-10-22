import React from "react";
import { useSelector } from "react-redux";
import { useUserNotifications } from "../../../hooks/react-query/useUsers";
import { timeSince } from "../../../utils";

export const NotificationsModal = ({ open, handleClose }) => {
  const { user } = useSelector((state) => state?.auth);
  const { data: notifications } = useUserNotifications(user?._id);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto ${open ? "" : "hidden"}`}
      onClick={handleClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white p-4">
            <div className="flex flex-row items-center justify-between mb-2">
              <h5 className="text-xl font-semibold">Notifications</h5>
            </div>
            <hr className="border-gray-300" />
            <div className="mt-4 space-y-4">
              {notifications?.notification?.map((notification, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-10 h-10">
                    <img
                      src={
                        notification?.user
                          ? notification?.user?.picturePath
                          : notification?.job
                          ? notification?.job?.company?.picturePath
                          : user?.picturePath
                      }
                      alt="Avatar"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-md font-bold">
                      {notification?.user
                        ? notification?.user?.firstname +
                          " " +
                          notification?.user?.lastname
                        : notification?.job
                        ? notification?.job?.company?.companyName
                        : user?.firstname}
                    </div>
                    <div className="text-sm">
                      {notification?.message}
                      <span className="font-bold">
                        {notification?.job ? notification?.job?.title : ""}
                      </span>
                    </div>
                    <div className="text-gray-500">{`sent ${timeSince(
                      notification?.createdAt
                    )} ago`}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
