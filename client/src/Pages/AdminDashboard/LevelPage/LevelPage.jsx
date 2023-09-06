import React, { useState } from "react";
import { useCreateLevel , useGetLevels , useDeleteLevel } from "../../../hooks/react-query/useLevels";

import { AiFillDelete ,AiFillEdit } from 'react-icons/ai';
import { EditLevelModal } from "./EditLevelModal";


const LevelPage = () => {
  const [adminDefinedPoints, setAdminDefinedPoints] = useState(0);
  const { mutate : createLevelMutate } =useCreateLevel(adminDefinedPoints);
  const [levelToEdit, setLevelToEdit] = useState(null);
  const handleEditLevel = (levelData) => {
    setLevelToEdit(levelData);
    toggleModal();
  };

  const { mutate : deleteLevelMutate } =useDeleteLevel();
  const {data , isLoading } = useGetLevels();
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [openPostModal, setOpenPostModal] = useState(false);
  const toggleModal = () => setOpenPostModal((prev) => !prev);

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
    createLevelMutate(adminDefinedPoints);
    setShowAlert(false);
    setAdminDefinedPoints(0);
  
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };


 
  return (
    <div >
      <div className="flex gap-11 ">
       <input
       className="w-full"
          type="range"
          min="0"
          max="1000" // Adjust max points as needed
          step="10"
          value={adminDefinedPoints}
          onChange={(e) => setAdminDefinedPoints(e.target.value) }
        />
        <span>{adminDefinedPoints} Points</span>
          <button  onClick={handleAddLevel} className="bg-zinc-800 rounded-full mb-2 hover:bg-slate-800 text-white px-4 py-2 w-1/6" type="submit">
            Add a new Level
          </button>
      </div>
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
{isLoading ? (
        <p>Loading levels ...</p>
        
      ) : (
        data
          ?.map(
            (badgeData) =>
              badgeData && (
                <div
                  key={badgeData._id}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border-2 border-green-400"
                >
                  <div className="flex flex-col items-center space-y-2 mt-5">
                    
                    <div className="flex items-center flex-col">
                      <h5 className="text-green-500 text-lg font-semibold truncate">
                        {badgeData.name}
                      </h5>
                      <p className="text-gray-500 text-sm mt-4">
                     <p>{badgeData.minScore} - {badgeData.maxScore}</p>
                      </p>
                    </div>
                  </div>

                  <button
                  onClick={() => deleteLevelMutate(badgeData._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-400 transition duration-300"
                  >
                    <AiFillDelete/>
                  </button>
                  
                  <button
                  onClick={()=>handleEditLevel(badgeData)}
                  className="absolute top-2 right-12 bg-zinc-600 text-white px-2 py-1 rounded-full hover:bg-zinc-400 transition duration-300"
                  >
                    <AiFillEdit/>
                  </button>
                </div>
              )
          ) )}
      </div>
      <div> 
      <div>
      </div>
    </div>
    <EditLevelModal open={openPostModal} 
                  handleClose={()=> {setOpenPostModal(false);
          setLevelToEdit(null);}} levelData={levelToEdit} />
</div>
 
  )
};

export default LevelPage;
