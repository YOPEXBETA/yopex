import React, { useState } from "react";
import SearchbarFilter from "./SearchbarFilter";
import Leaderboard from "./Leaderboard";

const ContentSide = ({ data, onSelect, isLoading }) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="space-y-2">
        <SearchbarFilter setQuery={setQuery} />
        <Leaderboard
          data={data}
          query={query}
          onSelect={onSelect}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ContentSide;
