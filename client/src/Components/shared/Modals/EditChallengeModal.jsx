import { useEditChallenge } from "../../../hooks/react-query/useChallenges";
import React, { useState } from "react";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export const EditChallengeModal = ({ open, handleClose, challenge }) => {
  const { mutate } = useEditChallenge(challenge._id);
  const { data: Skills } = useSkills();
  const { data: categorys } = useCategories();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      category: challenge.category.map((category) => ({
        value: category._id,
        label: category.name,
      })),

      RecommendedSkills: challenge.RecommendedSkills.map((skill) => ({
        value: skill._id,
        label: skill.name,
      })),

      title: challenge.title,
      description: challenge.description,
      price: challenge.price,
      nbruser: challenge.nbruser,
    },
  });

  const handleEdit = (data) => {
    mutate({
      ...data,
    });
    handleClose();
  };

  return (
    <div
      open={open}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"} `}
    >
      <form className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl md:w-[40rem] p-4 h-[40rem] border  w-screen overflow-y-auto max-h-full">
          <div>
            <button
              className="text-gray-400 absolute bg-zinc-900 rounded-full right-4 top-4  hover:bg-gray-200 hover:text-gray-900 text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="mt-2">
              <label>Challenge Name</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                placeholder="Challenge name"
                {...register("title", { required: true })}
              />

              <label>Challenge Description</label>
              <textarea
                className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                name="description"
                placeholder="Challenge Description"
                {...register("description", { required: true })}
              />

              <label>Challenge Prize</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder="Challenge Prize"
                {...register("price", { required: true })}
              />

              <label>Max Challenger</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder="Max Challenger"
                {...register("nbruser", { required: true })}
                min={1}
              />
              {Skills && (
                <>
                  <label>Skills</label>
                  <Controller
                    control={control}
                    name="RecommendedSkills"
                    render={({ field }) =>
                      Skills && (
                        <Select
                          value={field.value}
                          isMulti
                          className="my-react-select-container mt-2"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={Skills.map((skill) => ({
                            value: skill._id,
                            label: skill.name,
                          }))}
                          onBlur={field.onBlur}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
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
              {categorys && (
                <>
                  <label>Recommended Skills</label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) =>
                      categorys && (
                        <Select
                          value={field.value}
                          isMulti
                          className="my-react-select-container mt-2"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={categorys.map((category) => ({
                            value: category._id,
                            label: category.name,
                          }))}
                          onBlur={field.onBlur}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
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
              <div className="mt-4">
                <button
                  className="px-6 py-2 text-white rounded-md w-full border-2 bg-green-500 hover:bg-green-600"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleEdit)}
                >
                  Edit your Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
