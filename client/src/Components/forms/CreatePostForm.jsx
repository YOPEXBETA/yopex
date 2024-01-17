import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCreatePost } from "../../hooks/react-query/usePosts";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import LoadingSpinner from "../LoadingSpinner";

const CreatePostForm = () => {
  // Global states |  @redux/toolkit
  const { user } = useSelector((state) => state.auth);

  // Data fetching | react-query
  const { data: userProfile, isLoading } = useUserById(user._id);
  const { data: skills } = useSkills();
  const fileUploadMutation = useFileUpload();
  const { mutate } = useCreatePost();

  // Form handling | react-hook-form
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      skills: [],
      files: [],
    },
  });


  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.files[0]);
    formData.append("type", "posts");

    const result = await fileUploadMutation.mutateAsync(formData);

    const selectedSkills = data.skills.map((skill) => skill.value);

    mutate({
      //userId: user._id,
      userId: user._id,
      title: data.title,
      description: data.description,
      skills: selectedSkills,
      postPicturePath: [result.data.downloadURL],
    });
    reset();
  };
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">
          <span className="font-normal">
            please fill the required informations to create your post
          </span>
        </h1>
        <hr className="my-4" />
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-4">
                
                <div>
                  <input
                    {...register("title", { required: true })}
                    required={true}
                    placeholder="Post Title"
                    className="w-full p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                  />
                </div>
                <textarea
                  className="w-full h-40 p-2 border bg-white dark:text-white dark:bg-zinc-700 rounded focus:outline-none resize-none"
                  {...register("description", { required: false })}
                  placeholder="Tap here and start typing your post description"
                />
                <div className="flex-1">
                  <Controller
                    name="skills"
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
                            skills
                              ? skills?.map((skill) => ({
                                  label: skill?.name,
                                  value: skill,
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

                {uploadedFile && uploadedFile.length > 0 && (
                  <div className="mb-4">
                    {fileUploadMutation.isLoading ? (
                      <>
                        <LoadingSpinner />
                      </>
                    ) : (
                      <p className="text-left mt-2">
                        {uploadedFile.length}{" "}
                        {uploadedFile.length === 1 ? "image" : "images"}{" "}
                        selected
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <Controller
                    name="files"
                    control={control}
                    rules={{ required: false }}
                    onChange={(value) => setValue("picture", value)}
                    render={({ field }) => (
                      <div className="mt-4">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            title="Upload company legal document"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or GIF
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => field.onChange(e.target.files)}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
