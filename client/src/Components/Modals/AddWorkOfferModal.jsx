import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useCreateJob } from "../../hooks/react-query/useJobs";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";

export const AddWorkOfferModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { data: RecommendedSkills } = useSkills();
  const { data: categories } = useCategories();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      category: [],
      RecommendedSkills: [],
    },
  });
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);

  const { mutate } = useCreateJob(user);

  const onSubmit = (JobData) => {
    const companyId = selectedOption;

    const modifiedJobData = {
      ...JobData,
      category: JobData?.category?.map((category) => category?.value),
      RecommendedSkills: JobData?.RecommendedSkills?.map(
        (skill) => skill?.value
      ),
    };

    mutate({ companyId, JobData: modifiedJobData });
    handleClose(true);
  };

  return (
    <div
      className={`fixed z-50 inset-0  ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div
          className={`${
            open ? "w-full sm:w-[40rem]" : "hidden"
          } inline-block align-bottom bg-white scroll-smooth px-2 scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700  dark:bg-zinc-800 rounded-lg max-h-[40rem] overflow-y-auto  pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6 lg:w-[40rem]`}
        >
          <div>
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold mb-4 text-black dark:text-white">
                Add a Work Offer
              </h4>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

            <div className="mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="jobTitle"
                    className="dark:text-white block mb-2"
                  >
                    Select your company
                  </label>
                  <select
                    id="selectField"
                    className="block w-full dark:text-white p-2 border dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500 mb-2"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select your company</option>
                    {userProfile?.companies.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="jobTitle"
                    className="dark:text-white block mb-2"
                  >
                    Job Title
                  </label>
                  <input
                    className="w-full py-2 px-3 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                    type="text"
                    placeholder="job title"
                    id="jobTitle"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="jobDescription"
                    className="dark:text-white block mb-2"
                  >
                    Job Description
                  </label>
                  <textarea
                    className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                    {...register("description", { required: true })}
                    placeholder="job description"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobType"
                    className="dark:text-white block mb-2"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("job_type", { required: true })}
                  >
                    <option value="" defaultValue>
                      Choose a job type
                    </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobType"
                    className="dark:text-white block mb-2"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("offer_type", { required: true })}
                  >
                    <option value="" defaultValue>
                      Choose an offer type
                    </option>
                    <option value="Remote">Remote</option>
                    <option value="On Site">On Site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Render skills options */}
                <div className="mb-4">
                  <label
                    htmlFor="selectSkills"
                    className="dark:text-white block mb-2"
                  >
                    Select Skills
                  </label>
                  <Controller
                    name="RecommendedSkills"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full dark:bg-zinc-700">
                        <Select
                          isMulti
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={
                            RecommendedSkills
                              ? RecommendedSkills?.map((skill) => ({
                                  label: skill?.name,
                                  value: skill.name,
                                }))
                              : []
                          }
                          onChange={(selectedOptions) =>
                            onChange(selectedOptions)
                          }
                          value={value}
                          placeholder="Select Skills"
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Render categories options */}
                <div className="mb-4">
                  <label
                    htmlFor="selectCategories"
                    className="dark:text-white block mb-2"
                  >
                    Select Categories
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full dark-bg-zinc-700">
                        <Select
                          isMulti
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={
                            categories
                              ? categories?.map((category) => ({
                                  label: category?.name,
                                  value: category?.name,
                                }))
                              : []
                          }
                          onChange={(selectedOptions) =>
                            onChange(selectedOptions)
                          }
                          value={value}
                          placeholder="Select Categories"
                        />
                      </div>
                    )}
                  />
                </div>

                {/*<div className="mb-2">
                  <Controller
                    control={control}
                    name="RecommendedSkills"
                    defaultValue={"Any"}
                    render={({ field }) =>
                      itSkills && (
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={itSkills}
                          getOptionLabel={(option) => option}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(e, value) =>
                            setValue("RecommendedSkills", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Skills"
                            />
                          )}
                        />
                      )
                    }
                  />
                  </div>*/}

                <div className="flex justify-between">
                  <button
                    className="bg-green-500 px-6 py-2 text-white rounded-md w-full hover:bg-green-700"
                    type="submit"
                    disabled={isSubmitting}
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
