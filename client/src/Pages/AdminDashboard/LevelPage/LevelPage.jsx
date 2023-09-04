import React, { useState } from "react";
import { useCreateLevel , useGetLevels } from "../../../hooks/react-query/useLevels";


const LevelPage = () => {

  const { mutate } =useCreateLevel();
  const {data } = useGetLevels();
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const lastLevel  = data && data[data.length-1];

  const handleAddLevel = () => {
    // Check if there is a last level
    if (lastLevel) {
      const newLevelNumber = parseInt(lastLevel.name.replace('Level ', '')) + 1;
      const message = `A new Level ${newLevelNumber} will be created. Do you want to continue?`;

      // Set the confirmation message
      setConfirmationMessage(message);

      // Display the custom alert
      setShowAlert(true);
    }
  };

  const handleAlertOK = () => {
    // Perform the action you want when the user clicks OK
    mutate();

    // Close the alert
    setShowAlert(false);
  
  };

  const handleAlertCancel = () => {
    // Close the alert without taking any action
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
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
    {data?.map(
      (badgeData) =>
        badgeData && (
          <div key={badgeData._id} className="hover:bg-slate-200 flex flex-col items-center pb-10 cursor-pointer ">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://png.pngtree.com/png-vector/20210207/ourmid/pngtree-simple-modern-level-up-game-interface-with-stars-and-arrow-png-image_2896899.jpg" alt="Bonnie image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{badgeData.name}</h5>
          <input id="small-range" type="range" min={badgeData.minScore} max={badgeData.maxScore} value={badgeData.minScore} disabled className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
      </div>
        )
    )}
   
</div>
</div>
 
  )
};

export default LevelPage;
