import React from "react";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import yopexPointIcon from "../../../assets/icons/yopexPointIcon.png";

const MoneyBalance = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);

  return (
    <div>
      <div className="p-4 py-6 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <div className="flex justify-between">
          <h4 className="text-xl font-medium">Balance</h4>
          <div className="flex items-center gap-1">
            <h4 className="text-lg text-primary font-bold text-green-500">
              {userProfile?.balance || 0}
            </h4>
            <img src={yopexPointIcon} className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyBalance;
