import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import uploadFile from "../../../../../../../utils/uploadFile";
import { useCreateCompany } from "../../../../../../../hooks/react-query/useCompany";

export const AddCompanyModal = ({ open, handleClose }) => {
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      picture: [],
    },
  });
  const { mutate } = useCreateCompany();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressdoc, setUploadProgressdoc] = useState(0);
  const uploadedFile = watch("picture");
  const uploadedFiledoc = watch("document");

  const onSubmit = async (data) => {
    const picturePath = await uploadFile(
      data.picture[0],
      setUploadProgress,
      "companyLogo"
    );
    let documentPath = "";
    if (data.document != undefined) {
      documentPath = await uploadFile(
        data.document[0],
        setUploadProgressdoc,
        "companyDocument"
      );
    }
    mutate({
      companyName: data.name,
      companyDescription: data.description,
      companyLogo: picturePath,
      companyDocument: documentPath,
    });

    reset();
    setUploadProgressdoc(0);
    setUploadProgress(0);
    handleClose();
  };

  return (
    <div
      open={open}
      onClose={handleClose}
      className={`fixed  z-50 inset-0 overflow-y-auto ${
        open ? "backdrop-blur-sm" : "hidden"
      }`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`${
            open ? "w-full sm:w-[40rem]" : "hidden"
          } inline-block align-bottom bg-white dark:bg-zinc-800 rounded-lg  pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6 lg:w-[40rem]`}
        >
          <form onSubmit={handleSubmit(onSubmit)} spacing={1}>
            <div className="flex justify-between">
              <h4 className="text-xl font-bold mb-4 text-black dark:text-white">
                Add a Company
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <div className="mb-4">
                <label
                  htmlFor="CompanyName"
                  className="dark:text-white block mb-2"
                >
                  Company Name
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Company Name"
                  className="w-full p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="CompanyDescription"
                  className="dark:text-white block mb-2"
                >
                  Company Description
                </label>
                <textarea
                  className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
                  {...register("description", { required: true })}
                  placeholder="Company Description"
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
                className="w-full"
                name="picture"
                onChange={(value) => setValue("picture", value)}
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
                            "Upload Image"}
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
              {uploadedFiledoc && (
                <div className="mb-4">
                  <p className="mb-1">Upload Progress: {uploadProgressdoc}%</p>
                  <div className="bg-green-300 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${uploadProgressdoc}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <Controller
                name="document"
                control={control}
                rules={{ required: false }}
                onChange={(value) => setValue("document", value)}
                render={({ field }) => (
                  <div className="mt-4">
                    <label className="block w-full p-2 hover:bg-green-700 border rounded-md shadow-sm bg-green-200 focus:ring focus:ring-opacity-50 cursor-pointer">
                      <span className="text-green-600">
                        {field.value && field.value.length > 0
                          ? // Display the file names when files are selected
                            `Documents selected: ${field.value.length}`
                          : // Display this when no file is chosen
                            "Upload Document"}
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

            <div className="flex justify-between py-4">
              <button
                type="submit"
                className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
              >
                Add Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
