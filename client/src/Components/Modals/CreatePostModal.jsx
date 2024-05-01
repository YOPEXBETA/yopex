import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useCreatePost } from "../../hooks/react-query/usePosts";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import LoadingSpinner from "../LoadingSpinner";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import CompanyIcon from "../icons/CompanyIcon";
import UsersIcon from "../icons/UsersIcon";
import InfoIcon from "../icons/InfoIcon";
import PhotoIcon from "../icons/PhotoIcon";

const CreatePostModal = ({ open, handleClose }) => {
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

  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    const result = [];

    for (var i = 0; i < data.files.length; i++) {
      const formData = new FormData();
      formData.append("file", data.files[i]);
      formData.append("type", "posts");

      const res = await fileUploadMutation.mutateAsync(formData);
      result.push(res.data.downloadURL);
    }

    mutate({
      title: data.title,
      description: data.description,
      postPicturePath: result,
    });
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
    >
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
          <div className="flex justify-between px-4 pt-4">
            <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Create Post
            </h4>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <CloseIcon width={4} height={4} />
            </button>
          </div>
          <hr />

          <div className="m-8 max-w-[550px] mx-auto space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <div className="relative my-2">
                    <textarea
                      className="bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none w-full"
                      {...register("description", { required: false })}
                      placeholder="Tap here and start typing your post description"
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
                      <div className="relative">
                        <Controller
                          name="files"
                          control={control}
                          rules={{ required: false }}
                          onChange={(value) => setValue("picture", value)}
                          render={({ field }) => (
                            <div>
                              <div className="text-start">
                                <label htmlFor="dropzone-file">
                                  <button
                                    type="button"
                                    aria-required
                                    className="item-center middle none center flex justify-center rounded-lg bg-green-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    onClick={() =>
                                      document
                                        .getElementById("dropzone-file")
                                        .click()
                                    }
                                  >
                                    <PhotoIcon width={6} height={6} />
                                  </button>
                                </label>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  multiple
                                  onChange={(e) =>
                                    field.onChange(e.target.files)
                                  }
                                />
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
                      Create Post
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

export default CreatePostModal;
