import React from "react";

const SearchbarFilter = ({ setQuery }) => {
  return (
    <div>
      <div>
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
              placeholder="Search for users"
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchbarFilter;
