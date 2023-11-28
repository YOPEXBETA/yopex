import React, { useState } from "react";
import moment from "moment";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useCreateChallenge } from "../../../../../../../hooks/react-query/useChallenges";
import { useUserById } from "../../../../../../../hooks/react-query/useUsers";
import { useSkills } from "../../../../../../../hooks/react-query/useSkills";
import { useCategories } from "../../../../../../../hooks/react-query/useCategories";

export const AddChallengeModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionpaid, setSelectedOptionpaid] = useState("false");
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    <div
      className={`fixed  z-50 inset-0  ${open ? "backdrop-blur-sm" : "hidden"}`}
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
                Add a Challenge
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%" }}
                spacing={2}
                lang="en"
              >
                <div className="mb-4">
                  <label
                    htmlFor="jobTitle"
                    className="dark:text-white block mb-2"
                  >
                    Select your company
                  </label>
                  <select
                    id="selectField"
                    className="block w-full p-2 border dark:text-white dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500 mb-2"
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
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobTitle"
                    className="dark:text-white block mb-2"
                  >
                    Challenge Title
                  </label>
                  <input
                    required
                    className="w-full py-2 px-3 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                    type="text"
                    placeholder="challenge title"
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jobDescription"
                    className="dark:text-white block mb-2"
                  >
                    Challenge Description
                  </label>
                  <textarea
                    required
                    className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                    {...register("description", { required: true })}
                    placeholder="challenge description"
                  />
                  {/*
                  <div className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2">
                    {" "}
                    <RichtTextEditor
                      {...register("description", { required: true })}
                    />
                    
                  </div>
                  */}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Challengeprize"
                    className="dark:text-white block mb-2"
                  >
                    Challenge prize
                  </label>
                  <div className="flex gap-3 mb-2">
                    <select
                      id="selectFieldpaid"
                      className="p-2 w-[20%] border rounded-md focus:ring dark:bg-zinc-700 focus:ring-blue-300 dark:text-zinc-400"
                      value={selectedOptionpaid}
                      onChange={(e, value) => {
                        setSelectedOptionpaid(e.target.value);
                      }}
                    >
                      <option value={"false"}>free</option>
                      <option value={"true"}>paid</option>
                    </select>
                    <input
                      className={`py-2 w-[80%] px-3 rounded border ${
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
                    className="dark:text-white block mb-2"
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
                            className="my-react-select-container border rounded-lg"
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
                    className="dark:text-white block mb-2"
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
                            className="my-react-select-container border rounded-lg"
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
                    className="dark:text-white block mb-2"
                  >
                    Specify the participant number
                  </label>
                  <input
                    required
                    className="w-full py-2 px-3 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                    type="number"
                    placeholder="number of particiant"
                    {...register("nbruser", { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="deadline"
                    className="dark:text-white block mb-2"
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
                        className="w-full py-2 px-3 dark:bg-zinc-700  dark:text-white rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
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
                  <button
                    className="bg-green-500 px-6 py-2 w-full hover:bg-green-700 text-white rounded-md"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Challenge
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
