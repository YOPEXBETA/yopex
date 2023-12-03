import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useCreateJob } from "../../hooks/react-query/useJobs";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

import { useCategories } from "../../hooks/react-query/useCategories";
import { useSkills } from "../../hooks/react-query/useSkills";
import { Link } from "react-router-dom";

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
      <h1 className="text-xl font-semibold">
        <span className="font-normal">
          Please fill the required informations to create your job offer
        </span>
      </h1>
      <hr className="mt-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="jobTitle"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            Job Title
          </label>
          <input
            required={true}
            className="w-full py-2 px-3 dark:bg-zinc-700 mt-2 dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
            type="text"
            placeholder="job title"
            id="jobTitle"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 mb-4">
            <label
              htmlFor="jobType"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Job Type
            </label>
            <select
              id="jobType"
              required={true}
              className="bg-white border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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

          <div className="flex-1">
            <label
              htmlFor="offerType"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Offer Type
            </label>
            <select
              id="offerType"
              required={true}
              className="bg-white border border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
        </div>

        {/* Render skills options */}
        <div className="flex-1">
          <label
            htmlFor="selectSkills"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            Select Skills
          </label>
          <Controller
            name="RecommendedSkills"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="w-full dark:bg-zinc-700 mt-2">
                <Select
                  isMulti
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  required={true}
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
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            Job Description
          </label>
          <textarea
            required={true}
            className="w-full h-40 p-2 border bg-white rounded mt-2 dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
            {...register("description", { required: true })}
            placeholder="job description"
          />
        </div>

        <div className="flex justify-between">
          <Link className="px-6 py-2 bg-white rounded-md border-2" to="/feed">
            Cancel
          </Link>
          <button
            className="bg-green-500 px-6 py-2 text-white rounded-md hover:bg-green-700"
            type="submit"
            disabled={isSubmitting}
          >
            Create a job offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobOfferForm;
