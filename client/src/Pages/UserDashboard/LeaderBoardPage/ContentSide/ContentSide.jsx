import React, { useState } from "react";
import LeaderBoardTable from "./LeaderBoardTable/LeaderBoardTable";
import SearchbarFilter from "./SearchBarFilter/SearchbarFilter";
import { useUsers } from "../../../../hooks/react-query/useUsers";

const ContentSide = () => {
  const [query, setQuery] = useState("");
  const { data } = useUsers();

  React.useEffect(() => {
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
