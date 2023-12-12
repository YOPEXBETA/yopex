import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreatePost } from "../../hooks/react-query/usePosts";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import LoadingSpinner from "../LoadingSpinner";
import Card from "../Cards";

const CreatePostForm = () => {
  // Global states |  @redux/toolkit
  const { user } = useSelector((state) => state.auth);

  // Data fetching | react-query
  const { data: userProfile, isLoading } = useUserById(user._id);
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

    mutate({
      //userId: user._id,
      userId: selectedOption,
      description: data.description,
      postPicturePath: [result.data.downloadURL],
    });
    reset();
  };

  return (
    <Card>
      <div className="px-4 py-4">
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-4">
                <select
                  id="selectField"
                  className="block w-full p-2 mb-4 border dark:text-white dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="">Create a Post as</option>
                  <option value={user._id}>
                    {user?.firstname} {user?.lastname}
                  </option>
                  {userProfile?.companies.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.companyName}
                    </option>
                  ))}
                </select>

                <textarea
                  className="w-full h-40 p-2 border bg-white dark:text-white dark:bg-zinc-700 rounded focus:outline-none resize-none"
                  {...register("description", { required: false })}
                  placeholder="Tap here and start typing your post description"
                />

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
            <div className="flex justify-between my-4">
              <Link
                className="px-6 py-2 bg-white text-black rounded-md border-2"
                to="/feed"
              >
                Cancel
              </Link>
              <button
                className="bg-green-500 px-6 py-2 text-white rounded-md hover:bg-green-700"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default CreatePostForm;
