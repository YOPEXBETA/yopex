import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import AddReviewModal from "./addreviewmodal";
import { useSelector } from "react-redux";
import { useUserReviews } from "../../../../../../hooks/react-query/useReviews";
import FeedbacksCard from "../../../../../../Components/shared/cards/FeedbacksCard";

const FeedbacksPage = () => {
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  console.log(reviews);
  return (
    <div className="grid grid-cols-2 gap-4">
      {userId !== user._id &&
        user.role === "company" &&
        userProfile.role !== "company" && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={toggleOpen}
          >
            Add Review
          </button>
        )}
      {reviews?.map((review) => (
        <div key={review._id} className="h-72">
          <FeedbacksCard review={review} />
        </div>
      ))}
      <AddReviewModal open={isOpen} onClose={toggleOpen} />
    </div>
  );
};

export default FeedbacksPage;
