import React from "react";
import { useSelector } from "react-redux";
import { useUserNotifications } from "../../hooks/react-query/useUsers";
import { timeSince } from "../../utils";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";

const MobileNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: notifications } = useUserNotifications(user?._id);

  return (
    <div className="fixed inset-0 flex items-center justify-center pt-20 mb-8">
      <div className="bg-white w-full h-full overflow-y-auto shadow-xl">
        <div className="p-4">
          <div className="flex flex-row items-center justify-between mb-2">
            <h5 className="text-xl font-semibold">Notifications</h5>
          </div>
          <hr className="border-gray-300" />
          <div className="mt-4 space-y-4">
            {notifications?.notification?.map((notification) => (
              <div
                key={notification?._id}
                className="flex items-start space-x-2"
              >
                <div className="w-10 h-10">
                  <img
                    src={
                      notification?.user
                        ? notification?.user?.picturePath
                        : notification?.job
                        ? notification?.job?.company?.picturePath
                        : user?.picturePath || AvatarProfile
                    }
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-md font-bold">
                    {notification?.user
                      ? notification.user.firstname +
                        " " +
                        notification.user.lastname
                      : notification?.job
                      ? notification?.job?.company?.companyName
                      : user.firstname}
                  </div>
                  <div className="text-sm">
                    {notification?.message}
                    <span className="font-bold">
                      {notification?.job ? notification.job.title : ""}
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
  );
};

export default MobileNotifications;
