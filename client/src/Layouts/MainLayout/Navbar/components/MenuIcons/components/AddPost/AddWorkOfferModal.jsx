import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateJob } from "../../../../../../../hooks/react-query/useJobs";
import { useUserById } from "../../../../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

export const AddWorkOfferModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);
  const { mutate } = useCreateJob(user);

  const onSubmit = (JobData) => {
    const companyId = selectedOption;

    mutate({ companyId, JobData });
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-96 sm:p-6 lg:w-[40rem]">
          <div>
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Create a Job Offer
            </h2>
            <div className="mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  id="selectField"
                  className="block w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="">Select a company</option>
                  {userProfile?.companies.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.companyName}
                    </option>
                  ))}
                </select>

                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder="job title"
                  {...register("title", { required: true })}
                />
                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("description", { required: true })}
                  placeholder="job description"
                />
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-4 "
                  type="text"
                  placeholder="salary"
                  {...register("salary", { required: true })}
                />

                <div className="flex justify-between">
                  <button
                    className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 px-6 py-2 text-white rounded-md"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Post a job offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
