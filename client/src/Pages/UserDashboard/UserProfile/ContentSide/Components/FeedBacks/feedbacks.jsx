import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import { useUserReviews } from "../../../../../../hooks/react-query/useReviews";
import FeedbacksCard from "../../../../../../Components/shared/cards/FeedbacksCard";
import AddReviewModal from "../../../../../../Components/shared/Modals/addreviewmodal";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const FeedbacksPage = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading: userLoading } = useUserById(userId);
  const { data: reviews, isLoading: reviewsLoading } = useUserReviews(userId);
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  if (userLoading || reviewsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
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
      {reviews && reviews?.length > 0 ? (
        reviews?.map((review) => (
          <div key={review._id} className="h-72">
            <FeedbacksCard review={review} />
          </div>
        ))
      ) : (
        <div className="dark:text-gray-200">No Reviews Found.</div>
      )}
      <AddReviewModal open={isOpen} onClose={toggleOpen} />
    </div>
  );
};

export default FeedbacksPage;
