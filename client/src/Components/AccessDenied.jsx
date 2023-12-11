import React from "react";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-center dark:text-white">
          Access Denied
        </h2>
        <p className="text-zinc-500">
          Sorry, you don't have permission to access this page. Please contact
          the administrator for assistance.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
