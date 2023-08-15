import React from "react";

const SearchbarFilter = ({ setQuery }) => {
  return (
    <input
      className="w-full p-3 border focus:outline-none resize-none  rounded-lg"
      placeholder="Search"
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
};

export default SearchbarFilter;
