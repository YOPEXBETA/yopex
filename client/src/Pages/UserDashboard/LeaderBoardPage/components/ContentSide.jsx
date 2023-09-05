import React, { useEffect, useState } from "react";
import LeaderBoardTable from "./LeaderBoardTable/LeaderBoardTable";
import { useUsers } from "../../../../hooks/react-query/useUsers";
import SearchbarFilter from "./SearchbarFilter";

const ContentSide = () => {
  const [query, setQuery] = useState("");
  const { data } = useUsers();

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <div className=" space-y-2">
        <SearchbarFilter setQuery={setQuery} />
        <LeaderBoardTable data={data} query={query} />
      </div>
    </div>
  );
};

export default ContentSide;
