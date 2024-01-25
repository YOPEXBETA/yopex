import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCreatePost } from "../../hooks/react-query/usePosts";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import LoadingSpinner from "../LoadingSpinner";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";

const CreateProjectModal = ({ open, handleClose }) => {
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

  const [selectedOption, setSelectedOption] = useState();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.files[0]);
    formData.append("type", "posts");

    const result = await fileUploadMutation.mutateAsync(formData);

    const selectedSkills = data.skills.map((skill) => skill.value);

    mutate({
      //userId: user._id,
      //userId: selectedOption,
      title: data.title,
      description: data.description,
      skills: selectedSkills,
      postPicturePath: [result.data.downloadURL],
    });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
    >
      <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div class="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
          <div className="flex justify-between px-4 pt-4">
            <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Create Project
            </h4>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <CloseIcon />
            </button>
          </div>
          <hr />
          <div class="m-8 max-w-[550px] mx-auto space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 space-y-4">
                {/*<div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Post As
                  </label>
                  <div className="relative my-2">
                    <select
                      id="selectField"
                      className="block w-full p-2 mb-4 border dark:text-white dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option value="">Share a Post as</option>
                      <option value={user._id}>
                        {user?.firstname} {user?.lastname}
                      </option>
                      {userProfile?.companies.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                      </div>*/}
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Project Title
                  </label>
                  <div className="relative my-2">
                    <input
                      {...register("title", { required: true })}
                      required={true}
                      placeholder="Project Title"
                      className="w-full h-10 p-2 border mt-1  rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Project Description
                  </label>
                  <div className="relative my-2">
                    <textarea
                      className="w-full h-40 p-2 border bg-white dark:text-white dark:bg-zinc-700 rounded focus:outline-none resize-none"
                      {...register("description", { required: false })}
                      placeholder="Tap here and start typing your project description"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Select Skills
                  </label>
                  <div className="relative my-2">
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
                </div>
                <div className="md:col-span-5">
                  <div className="space-y-4">
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

                    <div>
                      <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                        Upload Files
                      </label>
                      <div className="relative my-2">
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
                                    onChange={(e) =>
                                      field.onChange(e.target.files)
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 text-right mt-4">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                      type="submit"
                    >
                      Create a project
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
