import React, { useState } from "react";
import {
  useCreateLevel,
  useGetLevels,
  useDeleteLevel,
} from "../../../hooks/react-query/useLevels";
import LevelCard from "../../../Components/Cards/LevelCard";

const LevelPage = () => {
  const [adminDefinedPoints, setAdminDefinedPoints] = useState(0);
  const { mutate: createLevelMutate } = useCreateLevel(adminDefinedPoints);

  const { data, isLoading } = useGetLevels();
  console.log(data, "levels");
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const lastLevel = data && data[data.length - 1];

  const handleAddLevel = () => {
    if (lastLevel) {
      const newLevelNumber = lastLevel.level + 1;
      const message = `A new Level ${newLevelNumber} will be created. Do you want to continue?`;

      setConfirmationMessage(message);

      setShowAlert(true);
    } else {
      const newLevelNumber = 1;
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

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <div className="flex gap-11 justify-between ">
        <input
          type="text"
          placeholder="Choose points to add"
          className=" w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
          value={adminDefinedPoints}
          onChange={(e) => setAdminDefinedPoints(e.target.value)}
        />
        <button
          onClick={handleAddLevel}
          className="bg-zinc-800 rounded-full mb-2 hover:bg-slate-800 text-white px-4 py-2 w-1/6"
          type="submit"
        >
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
          <div className="mt-2 mb-4 text-sm">{confirmationMessage}</div>
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
          data?.map(
            (badgeData) =>
              badgeData && (
                <LevelCard key={badgeData._id} badgeData={badgeData} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default LevelPage;
