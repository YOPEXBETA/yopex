import React, { useState } from "react";
import { useCreateLevel , useGetLevels , useDeleteLevel } from "../../../hooks/react-query/useLevels";
import RangeSlider from "./RangerSlider";
import PostMenuIcon from "../../../Components/shared/MenuIcons/PostMenuIcon";

import { AiFillDelete } from 'react-icons/ai';

const LevelPage = () => {

  const { mutate : createLevelMutate } =useCreateLevel();
  const { mutate : deleteLevelMutate } =useDeleteLevel();
  const {data } = useGetLevels();
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const lastLevel  = data && data[data.length-1];

  const handleAddLevel = () => {
 
    if (lastLevel) {
      const newLevelNumber = parseInt(lastLevel.name.replace('Level ', '')) + 1;
      const message = `A new Level ${newLevelNumber} will be created. Do you want to continue?`;

      setConfirmationMessage(message);

      setShowAlert(true);
    }
  };

  const handleAlertOK = () => {

    createLevelMutate();

    setShowAlert(false);
  
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };




  return (
    <div>
  <button  onClick={handleAddLevel} className="bg-zinc-800 rounded-full mb-2 text-white px-4 py-2 w-1/6" type="submit">
    Add a new Level
  </button>
  {showAlert && (
        <div
        id="alert-additional-content-5"
        className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
          role="alert"
        >
          <div className="flex items-center">
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Are you sure ?</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            {confirmationMessage}
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800"
              onClick={handleAlertOK}
            >
              OK
            </button>
            <button
              type="button"
              className="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={handleAlertCancel}
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
<div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
        {data
          ?.map(
            (badgeData) =>
              badgeData && (
                <div
                  key={badgeData._id}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border-2 border-green-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    
                    <div className="flex items-center flex-col">
                      <img className="w-20 h-20 opacity-40 mb-2" src="https://w7.pngwing.com/pngs/134/138/png-transparent-star-golden-stars-angle-3d-computer-graphics-symmetry-thumbnail.png"></img>
                      <h5 className="text-green-500 text-lg font-semibold truncate">
                        {badgeData.name}
                      </h5>
                      <p className="text-gray-500 text-sm mt-4">
                      <RangeSlider min={badgeData.minScore} max={badgeData.maxScore} value1={badgeData.minScore}  onChange={(values) => console.log(values)} />
                      </p>
                    </div>
                  </div>

                  <button
                  onClick={() => deleteLevelMutate(badgeData._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition duration-300"
                  >
                    <AiFillDelete/>
                  </button>
                </div>
              )
          )}
      </div>
</div>
 
  )
};

export default LevelPage;
