import React from "react";

const SearchbarFilter = ({ setQuery }) => {
  return (
    <input
      className="w-full p-3 border dark:bg-zinc-700 dark:border-1 dark:border-transparent dark:text-gray-200  dark:focus:border-green-600 focus:outline-none resize-none  rounded-lg border-gray-300"
      placeholder="Search for users"
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
};

export default SearchbarFilter;
