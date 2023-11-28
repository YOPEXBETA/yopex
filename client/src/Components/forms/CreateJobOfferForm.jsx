import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useCreateJob } from "../../hooks/react-query/useJobs";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";

const CreateJobOfferForm = ({ selectedOption, handleCardClick }) => {
  const { data: RecommendedSkills } = useSkills();
  const { data: categories } = useCategories();

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
  };
  return (
    <div className="px-4 py-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="jobTitle" className="dark:text-white block mb-2">
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
          <label htmlFor="jobType" className="dark:text-white block mb-2">
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
          <label htmlFor="jobType" className="dark:text-white block mb-2">
            Offer Type
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
          <label htmlFor="selectSkills" className="dark:text-white block mb-2">
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
                  onChange={(selectedOptions) => onChange(selectedOptions)}
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
                  onChange={(selectedOptions) => onChange(selectedOptions)}
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

        <div className="flex justify-end">
          <button
            className="bg-green-500 px-6 py-2 text-white rounded-md w-40 hover:bg-green-700"
            type="submit"
            disabled={isSubmitting}
          >
            Post a job offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobOfferForm;
