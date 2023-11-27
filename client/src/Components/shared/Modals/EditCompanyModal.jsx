import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { useFileUpload } from "../../../hooks/react-query/useUsers";
import { useEditCompany } from "../../../hooks/react-query/useCompany";
import { FaImage } from "react-icons/fa";

import LoadingSpinner from "../../LoadingSpinner";

export const EditCompanyModal = ({ open, handleClose, company }) => {
  const { mutate } = useEditCompany(company?._id);

  const { user } = useSelector((state) => state.auth);
  const fileUploadMutation = useFileUpload();

  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      companyName: company?.companyName,
      companyDescription: company?.companyDescription,
      files: [],
    },
  });
  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    if (data.files.length > 0) {
      // If a file is present, proceed with file upload
      const formData = new FormData();
      formData.append("file", data.files[0]);
      formData.append("type", "posts");

      try {
        const datalogo = await fileUploadMutation.mutateAsync(formData);

        return mutate({
          companyName: data.companyName,
          companyDescription: data.companyDescription,
          companyLogo: datalogo.data.downloadURL,
        });
      } catch (error) {
        console.error("File Upload Error:", error);
        // Handle file upload error
      }
    }

    mutate({
      companyData: {
        companyName: data.companyName,
        companyDescription: data.companyDescription,
      },
    });

    handleClose();
    reset();
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
                  Edit {company?.companyName} Informations
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
              <div className="space-y-2 px-4">
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder={company?.companyName}
                  {...register("companyName")}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="companyName"
                  multiline
                  rows={4}
                />

                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("companyDescription")}
                  placeholder={company?.companyDescription}
                  id="companyDescription"
                  label="companyDescription"
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
                  rules={{ required: false }}
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
                        <div className="text-green-600 mt-2 text-left">
                          Files selected: {field.value.length}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-between px-4 py-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                  type="submit"
                >
                  edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
