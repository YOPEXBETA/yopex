import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RangeSlider from "./RangerSlider";


export const EditLevelModal = ({ open, handleClose,levelData  }) => {
    

   console.log(levelData?.name);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
        levelName: "",
        minScore: "",
        maxScore: "",
        },
    });
    
      
    
      const onSubmit = (data) => {
       reset(); 
        handleClose();
      };

  return (
    <div
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
       <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-lg font-bold p-6">Edit {levelData?.name}</h5>

              <div className="px-4">
                <div className="space-y-4">
                <input
       className="w-full"
          type="range"
          min={levelData?.minScore}
          max={levelData?.maxScore} // Adjust max points as needed
          step="1"
          value={levelData?.minScore}

        />
        <div className="flex justify-between ">
        <p>{levelData?.minScore}</p>
        <p>{levelData?.maxScore}</p>
        </div>
                </div>
              </div>

              <div className="flex justify-between px-4 py-4">
                <button
                  className="bg-white hover:bg-green-700 text-green-500 px-4 py-2 rounded border-2 border-green-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
