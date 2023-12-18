import React from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useCreateCompany } from "../../hooks/react-query/useCompany";
import { useFileUpload } from "../../hooks/react-query/useUsers";
import LoadingSpinner from "../LoadingSpinner";
import Card from "../Cards";
import countries from "../../countries.json";

const CreateCompanyForm = ({ extra }) => {
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      picture: [],
    },
  });
  const countryList = countries.map((country) => country.name.common);
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
    if (data.document !== undefined) {
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
      address: data.address,
      PhoneNumber: data.PhoneNumber,
      websiteURL: data.websiteURL,
      country: data.country,
    });

    reset();
  };
  return (
    <Card extra={`p-4 px-4 md:p-8 mb-6 ${extra}`}>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="dark:text-white">
          <p className="font-medium text-lg">Company Details</p>
          <p>Please fill out all the fields.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
              <label for="Company_Name">Company Name</label>
              <input
                {...register("name", { required: true })}
                required={true}
                placeholder="Company Name"
                className="w-full h-10 p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
              />
            </div>

            <div className="md:col-span-5">
              <label for="Company_Description">Company Description</label>

              <textarea
                className="w-full h-40 p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                {...register("description", { required: true })}
                required={true}
                placeholder="Company Description"
              />
            </div>

            <div className="md:col-span-5">
              <label for="Company_Logo">Company Logo</label>

              <Controller
                className="w-full"
                name="picture"
                onChange={(value) => setValue("picture", value)}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <input
                      className="w-full p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
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
            <div className="md:col-span-5">
              <label for="Company_Document">
                Please provide company documents to verify your account
                (optional)
              </label>

              <Controller
                name="document"
                control={control}
                rules={{ required: false }}
                onChange={(value) => setValue("document", value)}
                render={({ field }) => (
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        title="Upload company legal document"
                        className="w-full p-2 border mt-1 bg-gray-50 hover:bg-gray-100 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
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
                            PDF, WORD, SVG, PNG, JPG
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
                    {uploadedFiledoc && uploadedFiledoc.length > 0 && (
                      <div className="mb-4">
                        {fileUploadMutation.isLoading ? (
                          <>
                            <LoadingSpinner />
                          </>
                        ) : (
                          <p className="text-left mt-2">
                            {uploadedFiledoc.length}{" "}
                            {uploadedFiledoc.length === 1 ? "file" : "files"}{" "}
                            selected for company document
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label for="country">Country / region</label>
              <select
                id="country"
                name="country"
                {...register("country", { required: true })}
                className="bg-gray-50 border border-gray-300 mt-1 text-sm rounded block w-full p-2 dark:text-white dark:bg-zinc-700"
              >
                <option value="">Choose your country</option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3">
              <label for="address">Address / Street</label>
              <input
                type="text"
                className="w-full h-10 p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                placeholder="Address"
                {...register("address", { required: true })}
              />
            </div>

            <div className="md:col-span-3">
              <label for="zipcode">Website</label>
              <input
                type="text"
                className="w-full p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                placeholder="Website"
                {...register("websiteURL", { required: true })}
              />
            </div>

            <div className="md:col-span-2">
              <label for="zipcode">Phone Number</label>
              <input
                type="text"
                className="w-full p-2 border mt-1 bg-gray-50 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                placeholder="Phone Number"
                {...register("PhoneNumber", { required: false })}
              />
            </div>

            <div className="md:col-span-5 text-right mt-4">
              <div className="inline-flex items-end">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                  type="submit"
                >
                  Create your company
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreateCompanyForm;
