import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useCreatePost } from "../../../hooks/react-query/usePosts";
import uploadFile from "../../../utils/uploadFile";
import { FaImage } from "react-icons/fa";
import Select from "react-select";

export const AddSocialPostModal = ({ open, handleClose }) => {
  // Global states |  @redux/toolkit
  const { category } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // Data fetching | react-query
  const { data: categories } = useCategories();
  const { mutate } = useCreatePost(category);

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

  const onSubmit = async (data) => {
    const postPicturePath = [];
    for (let file of data.files) {
      postPicturePath.push(await uploadFile(file, setUploadProgress));
    }

    const selectedCategories = data.categories.map(
      (category) => category.value
    );

    mutate({
      userId: user._id,
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
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5 className="text-lg font-bold p-4">Create a Post</h5>

              <div className="px-4">
                <div className="space-y-4">
                  <textarea
                    className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none"
                    {...register("description", { required: true })}
                    placeholder="What's on your mind?"
                  />
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full">
                        <Select
                          isMulti
                          options={
                            categories
                              ? categories.map((category) => ({
                                  label: category.name,
                                  value: category,
                                }))
                              : []
                          }
                          onChange={(selectedOptions) =>
                            onChange(selectedOptions)
                          }
                          value={value}
                          className="w-full border-gray-300 rounded focus:outline-none focus:border-green-500"
                        />
                      </div>
                    )}
                  />

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
                  className="bg-white hover:bg-green-700 text-green-500 px-4 py-2 rounded border-2 border-green-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
