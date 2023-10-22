import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCategories } from "../../../../../../../hooks/react-query/useCategories";
import { useCreatePost } from "../../../../../../../hooks/react-query/usePosts";
import { useUserById } from "../../../../../../../hooks/react-query/useUsers";
import uploadFile from "../../../../../../../utils/uploadFile";
import Select from "react-select";
import { FaImage } from "react-icons/fa";

export const AddPostModal = ({ open, handleClose }) => {
  // Global states |  @redux/toolkit
  const { category } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile, isLoading } = useUserById(user._id);

  // Data fetching | react-query
  const { data: categories } = useCategories();
  const { mutate } = useCreatePost(category, user._id);

  // Form handling | react-hook-form
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      description: "",
      categories: [],
      files: [],
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadedFile = watch("files");

  const [selectedOption, setSelectedOption] = useState();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const onSubmit = async (data) => {
    const postPicturePath = [];
    for (let file of data.files) {
      postPicturePath.push(await uploadFile(file, setUploadProgress, "posts"));
    }

    const selectedCategories = data.categories.map(
      (category) => category.value
    );

    mutate({
      userId: selectedOption,
      description: data.description,
      categories: selectedCategories,
      postPicturePath: postPicturePath,
    });

    reset();
    setUploadProgress(0);
    handleClose();
  };

  return (
    <div
      onClose={handleClose}
      className={`fixed inset-0 z-50  ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div
          className={`${
            open ? "w-full sm:w-[40rem]" : "hidden"
          } inline-block align-bottom bg-white scroll-smooth  scrollbar-thin scrollbar-thumb-green-500 dark:scrollbar-track-slate-700  dark:bg-zinc-800 rounded-lg max-h-[40rem] overflow-y-auto  pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6 lg:w-[40rem]`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between px-4">
              <h4 className="text-xl font-bold mb-4 text-black dark:text-white">
                Add a Post
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

            <div className="px-4">
              <select
                id="selectField"
                className="block w-full p-2 mb-4 border dark:text-white dark:bg-zinc-700 rounded-md focus:ring focus:ring-green-500"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="">Select a company</option>
                <option value={user._id}>My Post</option>
                {userProfile?.companies.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.companyName}
                  </option>
                ))}
              </select>
              <div className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="CompanyDescription"
                    className="dark:text-white block mb-2"
                  >
                    Post Description
                  </label>
                  <textarea
                    className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                    {...register("description", { required: false })}
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="selectCategories"
                    className="dark:text-white block mb-2"
                  >
                    Select Categories
                  </label>
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
                </div>

                {uploadedFile && (
                  <div className="mb-4">
                    <p className="mb-1">Upload Progress: {uploadProgress}%</p>
                    <div className="bg-green-300 h-2 rounded">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
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
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 w-full rounded"
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
