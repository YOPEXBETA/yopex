import React from "react";

const NotificationBellIcon = ({ notificationNumber, onClick  }) => {
  return (
    <button
      type="button"
      className="relative rounded-full border-gray-200 py-3 text-gray-400 dark:text-white"
      onClick={onClick}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
      <span className="absolute inset-0 object-right-top -mr-6">
        <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-green-500 text-white">
          {notificationNumber}
        </div>
      </span>
    </button>
  );
};

export default NotificationBellIcon;
