import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useCreateJob } from "../../../../../../../hooks/react-query/useJobs";
import { useUserById } from "../../../../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import AlertContainer from "../../../../../../../Components/alerts";
import AlertSuccess from "../../../../../../../Components/successalert";
import { useCategories } from "../../../../../../../hooks/react-query/useCategories";
import { useSkills } from "../../../../../../../hooks/react-query/useSkills";

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
  const { mutate, isError, isSuccess, error } = useCreateJob(user);

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
  };

  return (
    <div
      className={`fixed  z-50 inset-0 overflow-y-auto ${
        open ? "backdrop-blur-sm" : "hidden"
      }`}
    >
      {isError && <AlertContainer error={""} />}
      {isSuccess && <AlertSuccess message="Job offer created successfully" />}
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`${
            open ? "w-full sm:w-[40rem]" : "hidden"
          } inline-block align-bottom bg-white dark:bg-zinc-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6 lg:w-[40rem]`}
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Add a Work Offer
            </h2>

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
                    className="block w-full p-2 border dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500 mb-2"
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

                <div className="mb-2"></div>
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
                    className="bg-white dark:bg-zinc-800 px-6 py-2 text-green-500 rounded-md border-2 border-green-500"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 px-6 py-2 text-white rounded-md"
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
