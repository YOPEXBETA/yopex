import React from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useCreateCompany } from "../../hooks/react-query/useCompany";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import { FaImage, FaFile } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";

const CreateCompanyForm = () => {
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      picture: [],
    },
  });
  const { mutate } = useCreateCompany();
  const fileUploadMutation = useFileUpload();
  const uploadedFile = watch("picture");
  const uploadedFiledoc = watch("document");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.picture[0]);
    formData.append("type", "companyLogo");
    const datalogo = await fileUploadMutation.mutateAsync(formData);
    let documentPath = "";
    if (data.document != undefined) {
      const formData = new FormData();
      formData.append("file", data.document[0]);
      formData.append("type", "companyDocument");
      const docpic = await fileUploadMutation.mutateAsync(formData);
      documentPath = docpic.data.downloadURL;
    }
    mutate({
      companyName: data.name,
      companyDescription: data.description,
      companyLogo: datalogo.data.downloadURL,
      companyDocument: documentPath,
    });

    reset();
  };
  return (
    <div>
      <h1 className="text-xl font-semibold text-left">
        Hello there ?,
        <span className="font-normal">
          please fill the required informations to create your company page
        </span>
      </h1>
      <hr className="my-4" />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div>
              <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                Company Name*
              </label>
              <input
                {...register("name", { required: true })}
                required={true}
                placeholder="Company Name"
                className="w-full p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 mb-2"
              />
            </div>
            <div>
              <div>
                <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                  Company Description*
                </label>
                <textarea
                  className="w-full h-40 p-2 border bg-white rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                  {...register("description", { required: true })}
                  required={true}
                  placeholder="Company Description"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-4">
                <Controller
                  className="w-full"
                  name="picture"
                  onChange={(value) => setValue("picture", value)}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Add Company Logo*
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        required={true}
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
              </div>

              <div className="mb-4">
                <Controller
                  name="document"
                  control={control}
                  rules={{ required: false }}
                  onChange={(value) => setValue("document", value)}
                  render={({ field }) => (
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Please provide company documents to verify your account
                        (optional)
                      </label>
                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
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
                              PDF, WORD, SVG, PNG, JPG or GIF
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
            <div>
              {uploadedFiledoc && uploadedFiledoc.length > 0 && (
                <div className="mb-4">
                  {fileUploadMutation.isLoading ? (
                    <>
                      <LoadingSpinner />
                    </>
                  ) : (
                    <p className="text-green-600 text-left">
                      {uploadedFiledoc.length}{" "}
                      {uploadedFiledoc.length === 1 ? "file" : "files"} selected
                      for company document
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <button
              type="submit"
              className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full mb-8"
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
