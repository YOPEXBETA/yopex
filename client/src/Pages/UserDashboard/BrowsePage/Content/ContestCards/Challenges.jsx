import { Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useFindChallenges } from "../../../../../hooks/react-query/useChallenges";
import ChallengeCard from "../../../../../Components/shared/cards/ChallengeCard";

const Challenges = ({ minAmount, maxAmount, searchQuery }) => {
  // Data fetching | react-query
  const { data: challenges, isLoading } = useFindChallenges(
    minAmount,
    maxAmount,
    searchQuery
  );
  console.log("challenges", challenges);

  // Pagination logic
  const [page, setPage] = useState(1);
  const cardsPerPage = 3;
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;
  const totalPages = Math.ceil((challenges?.length || 0) / cardsPerPage);
  const handleChangePage = (_, value) => setPage(value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 lg:grid-cols-1">
      {!isLoading ? (
        challenges?.length > 0 &&
        challenges
          .slice(startIndex, endIndex)
          .map((item) => <ChallengeCard key={item._id} challenge={item} />)
      ) : (
        <p>Loading....</p>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
      />
    </div>
  );
};

export default Challenges;
