import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RangeSlider from "./RangerSlider";
import { useUpdateLevel } from "../../../hooks/react-query/useLevels";

export const EditLevelModal = ({ open, handleClose, levelData }) => {
  const [maxScoreValue, setMaxScoreValue] = useState("");
  const handleMaxScoreChange = (e) => {
    // Update the state variable with the input value
    setMaxScoreValue(e.target.value);
  };
  const { mutate } = useUpdateLevel();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      levelName: "",
      minScore: "",
      maxScore: "",
    },
  });

  const onSubmit = () => {
    const updatedLevelData = {
      ...levelData, // Existing level data
      maxScore: maxScoreValue, // Update maxScore with the input value
    };
    mutate(updatedLevelData);
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
                  <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="maxScore"
                      name="maxScore"
                      value={maxScoreValue}
                      onChange={handleMaxScoreChange}
                      placeholder="Choose points"
                    />
                    <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                      Choose points to add
                    </label>
                  </div>
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
