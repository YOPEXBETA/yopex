import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useCreatePost } from "../../../hooks/react-query/usePosts";
import { useFileUpload } from "../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../LoadingSpinner";

export const AddSocialPostModal = ({ open, handleClose }) => {
  // Global states |  @redux/toolkit
  const { category } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // Data fetching | react-query
  const { data: categories } = useCategories();
  const fileUploadMutation = useFileUpload();
  const { mutate } = useCreatePost(category);

  // Form handling | react-hook-form
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      description: "",
      categories: [],
      files: [],
    },
  });

  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.files[0]);
    formData.append("type", "posts");

    const result = await fileUploadMutation.mutateAsync(formData);

    const selectedCategories = data.categories.map(
      (category) => category.value
    );

    mutate({
      userId: user._id,
      description: data.description,
      categories: selectedCategories,
      postPicturePath: [result.data.downloadURL],
    });

    reset();
    handleClose();
  };

  return (
    <div
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"} `}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center p-4">
                <h5 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Create a Post
                </h5>
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

              <div className="px-4">
                <div className="space-y-4">
                  <textarea
                    className="w-full h-40 p-2 border bg-white dark:text-white dark:bg-zinc-700 rounded focus:outline-none resize-none"
                    {...register("description", { required: false })}
                    placeholder="What's on your mind?"
                  />
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full dark:bg-zinc-700">
                        <Select
                          isMulti
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          options={
                            categories
                              ? categories?.map((category) => ({
                                  label: category?.name,
                                  value: category,
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
                  {uploadedFile && (
                    <div className="mb-4">
                      {fileUploadMutation.isLoading ? (
                        <>
                          <LoadingSpinner />
                        </>
                      ) : null}
                    </div>
                  )}
                  <Controller
                    name="files"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="mt-4">
                        <label className="w-12 h-12 p-2 flex items-center justify-center hover:bg-green-700 border rounded-full shadow-sm bg-green-200 focus:ring focus:ring-opacity-50 cursor-pointer">
                          {field.value && field.value.length > 0 ? (
                            <span className="text-green-600">
                              <FaImage />
                            </span>
                          ) : (
                            <span className="text-green-600">
                              <FaImage />
                            </span>
                          )}
                          <input
                            type="file"
                            multiple
                            onChange={(e) => field.onChange(e.target.files)}
                            className="hidden"
                          />
                        </label>
                        {field.value && field.value.length > 0 && (
                          <div className="text-green-600 mt-2">
                            Files selected: {field.value.length}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between px-4 py-4">
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
    </div>
  );
};
