import React, { useState } from "react";
import { useAddReviews } from "../../../hooks/react-query/useReviews";
import { useParams } from "react-router-dom";
import Slider from "../../slider/Slider";
import { FaStar } from "react-icons/fa";

export const ReviewModel = ({ open, participant, handleClose, companyId }) => {
  const [description, setDescription] = useState("");
  const { id: challengeId } = useParams();
  const [rating, setRating] = useState(1);
  const { mutate,isLoading } = useAddReviews(participant._id);
  

  const handleStarClick = (e) => {
    console.log(e);
    setRating(e.target.value);
  };

  return (
    <div
      id="defaultModal"
      className={`absolute top-0 left-0 right-0 z-50 ${
        open ? "" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      onClick={(e)=>{e.stopPropagation()}}
    >
      
      <div className="relative m-auto mt-[10%] min-h-screen max-w-3xl z-50">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              REVIEW
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form>
              <label className="block text-gray-600">Add Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              />
              <label className="block text-gray-600">Rating</label>
              {/* <div className="flex items-center space-x-2">
                {[...Array(10)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-2xl cursor-pointer ${
                      index < rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => handleStarClick(index)}
                  >
                    ★
                  </span>
                ))}
                <p>{rating}</p>
              </div> */}
              
              <Slider onChange={handleStarClick} rating={rating} />
              <p className="py-1">{rating/10} <FaStar className="text-yellow-400 mb-1 inline-block  dark:text-yellow-300 w-[1.125rem] h-[1.125rem]" /></p>
            </form>
            <div className="flex items-center pt-3 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={() => {
                  mutate({
                    description,
                    star: rating/10,
                    companyId,
                    userId: participant._id,
                    challengeId,
                  });
                }}
                className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                disabled={isLoading}
              >
                send review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black opacity-30 ${open ? "" : "hidden"}`}
      />
    </div>
  );
};

export default ReviewModel;
