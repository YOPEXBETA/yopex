import React, { useState } from 'react'
import { useAddReviews } from '../../../hooks/react-query/useReviews';
import AlertContainer from '../../alerts';
import AlertSuccess from '../../successalert';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

export const ReviewModel = ({open,participant,handleClose,companyId}) => {
  const [description, setDescription] = useState("");
  const { id: challengeId } = useParams();
  const [rating, setRating] = useState(1);
  const {mutate,isError,isSuccess} =useAddReviews(participant.user._id);
  console.log(companyId);


  const handleStarClick = (index) => {
    setRating(index + 1);
  };



  return (
    <div id="defaultModal" className={`absolute top-0 left-0 right-0 z-50 ${open ? "" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        {isError && <AlertContainer error={isError} />}
        {isSuccess && <AlertSuccess message={""} />}
    <div className="relative m-auto mt-[10%] min-h-screen max-w-3xl z-50">
        
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                REVIEW
                </h3>
                <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <div className="p-6 space-y-6">
            <form >
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
            <div className="flex items-center space-x-2">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className={`text-2xl cursor-pointer ${
              index < rating ? 'text-yellow-500' : 'text-gray-400'
            }`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </span>
        ))}
        <p>{rating}</p>
      </div>
            
            </form>
            <div className="flex items-center pt-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button" onClick={()=>{
                  mutate({description,star:rating,companyId,userId:participant.user._id,challengeId})
                  }} className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">send review</button>
            </div>
            </div>
            
    </div>
        </div>
        
    
    <div
        className={`fixed inset-0 bg-black opacity-30 ${open ? "" : "hidden"}`}
      />
      
</div>
  )
}

export default ReviewModel;
