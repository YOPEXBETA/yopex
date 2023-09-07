import React, { useState } from "react";
import { useCreateLevel , useGetLevels , useDeleteLevel } from "../../../hooks/react-query/useLevels";

import { AiFillDelete ,AiFillEdit } from 'react-icons/ai';
import { EditLevelModal } from "./EditLevelModal";
import LevelMenuIcon from "./LevelMenuIcon";


const LevelPage = () => {
  const [adminDefinedPoints, setAdminDefinedPoints] = useState(null);
  const { mutate : createLevelMutate } =useCreateLevel(adminDefinedPoints);
  

 
  const {data , isLoading   } = useGetLevels();
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
    createLevelMutate(adminDefinedPoints);
    setShowAlert(false);
    setAdminDefinedPoints('');
  
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };


 
  return (
    <div >
      <div className="flex gap-11 justify-between ">
      <div class="relative mb-3" data-te-input-wrapper-init>
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Choose points" 
                   value={adminDefinedPoints}
                    onChange={(e) => setAdminDefinedPoints(e.target.value)}
                    />
                  <label
    for="exampleFormControlInput1"
    class={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      adminDefinedPoints ? 'translate-y-[0.9rem] scale-[0.8] hidden': ''
    }`}
  >
    Choose points to add
  </label>
                </div>
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
                ><div className="flex justify-between absolute top-2 right-2  ">
                       
                        <LevelMenuIcon level={badgeData}/> </div>
                  <div className="flex flex-col items-center space-y-2 mt-5">
                    
                       
                    <div className="flex justify-between items-center flex-col">  
                   
                      <h5 className="text-green-500 text-lg font-semibold truncate">
                        {badgeData.name} 
                      </h5>
                      <p className="text-gray-500 text-sm mt-4">
                     <p>{badgeData.minScore} - {badgeData.maxScore}</p>
                      </p>
                    </div>
                  </div>
            </div>
              )
          ) )}
      </div>
      <div> 
      <div>
      </div>
    </div>
    
</div>
 
  )
};

export default LevelPage;
