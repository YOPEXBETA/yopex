import { useEditChallenge } from "../../../hooks/react-query/useChallenges";
import React, {useEffect, useState} from "react";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {useUpdateTeamChallenge} from "../../../hooks/react-query/useTeamChallenge";

export const EditChallengeModal = ({ open, handleClose, challenge, type }) => {
  const { mutate: editChallenge } = useEditChallenge(challenge._id);
  const { mutate: editTeamChallenge } = useUpdateTeamChallenge(challenge._id);

  const { data: Skills } = useSkills();
  const { data: categories } = useCategories();
  const [isPaid, setIsPaid] = useState(challenge.paid);
  const inputName = type === 'Challenge' ? 'nbruser' : 'teamSize';
  const inputLabel = type === 'Challenge' ? 'Maximum Participants' : 'Maximum Teams';
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      categories: challenge?.categories?.map((category) => ({
        value: category._id,
        label: category.name,
      })),

      skills: challenge?.skills?.map((skill) => ({
        value: skill._id,
        label: skill.name,
      })),
      title: challenge.title,
      description: challenge.description,
      price: challenge.price,
      [inputName]: challenge[inputName],
    },
  });
  useEffect(() => {
    setIsPaid(challenge.paid);
  }, [challenge.paid]);
  const handleEdit = (data) => {
    console.log('data', data)
    if (type === 'Challenge') {
      editChallenge(data);
    } else if (type === 'TeamChallenge') {
      editTeamChallenge(data);
    }
    handleClose();
  };


  return (
      <div
          open={open}
          className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
      >
        <form className="flex justify-center items-center min-h-screen">
          <div
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl md:w-[60rem] p-4 h-auto border w-screen overflow-y-auto max-h-full">
            <button
                className="text-gray-400 absolute bg-zinc-900 rounded-full right-4 top-4 hover:bg-gray-200 hover:text-gray-900 text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
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
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Edit "{challenge.title}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">Challenge Title</label>
                  <Controller
                      name="title"
                      control={control}
                      defaultValue={challenge.title || ""}
                      rules={{required: "Challenge title is required"}}
                      render={({field, fieldState}) => (
                          <div>
                            <input
                                {...field}
                                placeholder="Challenge Title"
                                className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-sm mt-1">
                          {fieldState.error?.message}
                        </span>
                            )}
                          </div>
                      )}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Challenge Description</label>
                  <Controller
                      name="description"
                      control={control}
                      defaultValue={challenge.description || ""}
                      rules={{required: "Challenge description is required"}}
                      render={({field, fieldState}) => (
                          <div>
                      <textarea
                          {...field}
                          placeholder="Challenge Description"
                          className={`w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2 ${
                              fieldState.invalid ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-sm mt-1">
                          {fieldState.error?.message}
                        </span>
                            )}
                          </div>
                      )}
                  />
                </div>
                {isPaid && (

                <div>
                  <label className="block font-medium text-gray-700">Challenge Prize</label>
                  <Controller
                      name="price"
                      control={control}
                      defaultValue={challenge.price || ""}
                      rules={{required: "Challenge prize is required"}}
                      render={({field, fieldState}) => (
                          <div>
                            <input
                                type="number"
                                {...field}
                                placeholder="Challenge Prize"
                                className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2 ${
                                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-sm mt-1">
                          {fieldState.error?.message}
                        </span>
                            )}
                          </div>
                      )}
                  />
                </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">{inputLabel}</label>
                  <Controller
                      name={inputName}
                      control={control}
                      defaultValue={challenge[inputName] || ""}
                      rules={{required: `${inputLabel} is required`, min: 1}}
                      render={({field, fieldState}) => (
                          <div>
                            <input
                                type="number"
                                {...field}
                                placeholder={inputLabel}
                                className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-sm mt-1">
                          {fieldState.error?.message}
                        </span>
                            )}
                          </div>
                      )}
                  />
                </div>
                <div>
                  {Skills && (
                      <>
                        <label className="block font-medium text-gray-700">Skills</label>
                        <Controller
                            control={control}
                            name="skills"
                            render={({field}) =>
                                Skills && (
                                    <Select
                                        value={field.value}
                                        isMulti
                                        className=" my-react-select-container"
                                        classNamePrefix="my-react-select"
                                        id="tags-outlined"
                                        options={Skills?.map((skill) => ({
                                          value: skill?._id,
                                          label: skill?.name,
                                        }))}
                                        onBlur={field.onBlur}
                                        onChange={(selectedOptions) => {
                                          const selectedValues = selectedOptions?.map(
                                              (option) => ({
                                                value: option.value,
                                                label: option.label,
                                              })
                                          );
                                          field.onChange(selectedValues);
                                        }}
                                    />
                                )
                            }
                        />
                      </>
                  )}
                </div>

                <div>
                  {categories && (
                      <>
                        <label className="block font-medium text-gray-700">Recommended Categories</label>
                        <Controller
                            control={control}
                            name="categories"
                            render={({field}) =>
                                categories && (
                                    <Select
                                        value={field.value}
                                        isMulti
                                        className="my-react-select-container mt-2"
                                        classNamePrefix="my-react-select"
                                        id="tags-outlined"
                                        options={categories.map((category) => ({
                                          value: category._id,
                                          label: category.name,
                                        }))}
                                        onBlur={field.onBlur}
                                        onChange={(selectedOptions) => {
                                          const selectedValues = selectedOptions?.map(
                                              (option) => ({
                                                value: option.value,
                                                label: option.label,
                                              })
                                          );
                                          field.onChange(selectedValues);
                                        }}
                                    />
                                )
                            }
                        />
                      </>
                  )}
                </div>

              </div>
            </div>

            <div className="mt-4">
              <button
                  className="px-6 py-2 text-white rounded-md w-full border-2 bg-green-500 hover:bg-green-600"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleEdit)}
              >
                Update your challenge
              </button>
            </div>
          </div>
        </form>
      </div>
  );
};
