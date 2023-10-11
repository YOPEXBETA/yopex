import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCategories } from "../../../../../../../hooks/react-query/useCategories";
import { useCreatePost } from "../../../../../../../hooks/react-query/usePosts";
import { useUserById } from "../../../../../../../hooks/react-query/useUsers";
import uploadFile from "../../../../../../../utils/uploadFile";

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

    mutate({
      userId: selectedOption,
      description: data.description,
      categories: data.categories,
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
                <select
                  id="selectField"
                  className="block w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
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
                  <textarea
                    className="w-full h-40 p-2 border bg-[#ffffff] rounded focus:outline-none resize-none text-black"
                    {...register("description", { required: true })}
                    placeholder="What's on your mind?"
                  />
                  <Controller
                    name="categories"
                    control={control}
                    render={() => (
                      <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={categories ? categories : []}
                        onChange={(e, values) => setValue("categories", values)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="categories"
                            placeholder="categories"
                          />
                        )}
                      />
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
                        <label className="block w-full p-2 hover:bg-green-700 border rounded-md shadow-sm bg-green-200 focus:ring focus:ring-opacity-50 cursor-pointer">
                          <span className="text-green-600">
                            {field.value && field.value.length > 0
                              ? // Display the file names when files are selected
                                `Files selected: ${field.value.length}`
                              : // Display this when no file is chosen
                                "Upload File"}
                          </span>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => field.onChange(e.target.files)}
                            className="hidden"
                          />
                        </label>
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
