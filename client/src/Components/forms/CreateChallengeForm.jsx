import React, { useState } from "react";
import moment from "moment";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useCreateChallenge } from "../../hooks/react-query/useChallenges";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCategories } from "../../hooks/react-query/useCategories";
import { Link } from "react-router-dom";

const CreateChallengeForm = ({ selectedOption, handleCardClick }) => {
  const [selectedOptionpaid, setSelectedOptionpaid] = useState("false");
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      category: [],
      RecommendedSkills: [],
      category: [],
    },
  });

  const deadline = watch("deadline");

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);

  const { mutate, error, isError, isSuccess } = useCreateChallenge(user);

  const onSubmit = (challengeData) => {
    const companyId = selectedOption;
    mutate({ companyId, challengeData, paid: selectedOptionpaid });
  };

  const now = new Date().toISOString().slice(0, -8);
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">
          <span className="font-normal">
            Please fill the required informations to create your challenge
          </span>
        </h1>
        <hr className="mt-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Challenge Title
            </label>
            <input
              required
              className="w-full py-2 px-3 mt-2 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
              type="text"
              placeholder="challenge title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobDescription"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Challenge Description
            </label>
            <textarea
              required
              className="w-full h-40 p-2 mt-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
              {...register("description", { required: true })}
              placeholder="challenge description"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Challengeprize"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Challenge prize
            </label>
            <div className="flex gap-3 mb-2">
              <select
                id="selectFieldpaid"
                className="p-2 w-[20%] mt-2 border rounded-md focus:ring dark:bg-zinc-700 focus:ring-blue-300 dark:text-zinc-400"
                value={selectedOptionpaid}
                onChange={(e, value) => {
                  setSelectedOptionpaid(e.target.value);
                }}
              >
                <option value={"false"}>free</option>
                <option value={"true"}>paid</option>
              </select>
              <input
                className={`py-2 w-[80%] mt-2 px-3 rounded border ${
                  selectedOptionpaid === "false"
                    ? "bg-zinc-200 dark:bg-zinc-900"
                    : "bg-white"
                } border-gray-30 dark:bg-zinc-700 focus:outline-none focus:border-green-500`}
                type="number"
                placeholder="challenge prize"
                {...register("price", { required: false })}
                disabled={selectedOptionpaid === "false"}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="selectSkills"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Select Skills
            </label>
            <div className="mb-2">
              <Controller
                control={control}
                name="RecommendedSkills"
                defaultValue={"Any"}
                render={({ field }) =>
                  itSkills && (
                    <Select
                      isMulti
                      className="my-react-select-container border rounded-lg mt-2"
                      classNamePrefix="my-react-select"
                      id="tags-outlined"
                      options={itSkills.map((skill) => ({
                        value: skill,
                        label: skill,
                      }))}
                      value={field.value.map((skill) => ({
                        value: skill,
                        label: skill,
                      }))}
                      onBlur={field.onBlur}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        field.onChange(selectedValues);
                      }}
                    />
                  )
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="selectCategories"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Select Categories
            </label>
            <div className="mb-2">
              <Controller
                control={control}
                name="category"
                defaultValue={"Any"}
                render={({ field }) =>
                  itCategory && (
                    <Select
                      isMulti
                      className="my-react-select-container border rounded-lg mt-2"
                      classNamePrefix="my-react-select"
                      id="tags-outlined"
                      options={itCategory.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      value={field.value.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      onBlur={field.onBlur}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        field.onChange(selectedValues);
                      }}
                    />
                  )
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobDescription"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Specify the participant number
            </label>
            <input
              required
              className="w-full py-2 px-3 mt-2 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500"
              type="number"
              placeholder="number of particiant"
              {...register("nbruser", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Deadline
            </label>
            <Controller
              control={control}
              name="deadline"
              defaultValue={new Date().toISOString().slice(0, -8)}
              render={({ field }) => (
                <input
                  required
                  type="datetime-local"
                  className="w-full py-2 px-3 dark:bg-zinc-700 mt-2 dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  {...field}
                  onChange={(e) => {
                    const now = moment();
                    const diff = moment(deadline).diff(now);

                    if (diff < 0) {
                      setValue("deadline", "");
                      return false;
                    }

                    setValue("deadline", `${e.currentTarget.value}:00`);
                  }}
                  min={now}
                />
              )}
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
              Create a Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
