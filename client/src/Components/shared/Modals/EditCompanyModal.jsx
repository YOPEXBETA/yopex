import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { useFileUpload } from "../../../hooks/react-query/useUsers";
import { useEditCompany } from "../../../hooks/react-query/useCompany";
import { FaImage } from "react-icons/fa";

import LoadingSpinner from "../../LoadingSpinner";
import CloseIcon from "../../icons/CloseIcon";

export const EditCompanyModal = ({ open, handleClose, company }) => {
  const { mutate } = useEditCompany(company?._id);
  const { user } = useSelector((state) => state.auth);
  const fileUploadMutation = useFileUpload();

  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      companyName: company?.companyName,
      companyDescription: company?.companyDescription,
      address: company?.address,
      PhoneNumber: company?.PhoneNumber,
      websiteURL: company?.websiteURL,
      country: company?.country,
      files: [],
    },
  });
  const uploadedFile = watch("files");
  const onSubmit = async (data) => {
    try {
      if (data.files.length > 0) {
        // If a file is present, proceed with file upload
        const formData = new FormData();
        formData.append("file", data.files[0]);
        formData.append("type", "company");

        try {
          const result = await fileUploadMutation.mutateAsync(formData);

          mutate({
            ...data,
            companyLogo: result.data.downloadURL,
          });
        } catch (error) {
          console.error("Error in file upload:", error);
        }
      } else {
        // If no file is uploaded, update everything
        mutate({
          ...data,
        });
      }

      handleClose();
      reset();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div
      open={open}
      onClose={handleClose}
      className={`fixed z-50 top-0 right-0 h-full flex items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-xl"></div>
        </div>
      </div>
      <div>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="fixed top-0 right-0 h-full flex items-center">
          <div className="bg-white dark:bg-zinc-800 md:w-[40rem] w-full h-full px-8 py-4  shadow-md overflow-auto">
            <div className="">
              <div className="flex justify-between items-center">
                <h5 className="text-xl dark:text-white font-semibold">
                  Edit {company?.companyName} Informations
                </h5>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-xs md:text-sm  inline-flex justify-center items-center  dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <hr className="border-zinc-100 border w-full my-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  {...register("companyName")}
                  placeholder={company?.companyName}
                  required
                />

                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("companyDescription")}
                  placeholder={company?.companyDescription}
                />

                <Controller
                  className="w-full"
                  name="files"
                  onChange={(value) => setValue("picture", value)}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        className="w-full p-2 border  bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={(e) => field.onChange(e.target.files)}
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
                              {uploadedFile.length === 1 ? "file" : "files"}{" "}
                              selected for company logo
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                />
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  {...register("websiteURL")}
                  placeholder={company?.websiteURL}
                />
              </div>

              <div className="flex justify-between py-4">
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
