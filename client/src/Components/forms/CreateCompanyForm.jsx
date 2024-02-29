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

  const bannersData = uploadedFiledoc
    ? Array.from(uploadedFiledoc).map((file, index) => ({
        name: file.name,
      }))
    : [];

  const imageData = uploadedFile
    ? Array.from(uploadedFile).map((file, index) => ({
        name: file.name,
      }))
    : [];

  return (
    <Card extra={`p-4 px-4 md:p-8 mb-6 ${extra}`}>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="dark:text-white hidden md:block">
          <p className="font-medium text-lg">Company Details</p>
          <p>Please fill out all the fields.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 space-y-4">
            <div className="md:col-span-5">
              <label className="text-sm text-black mb-2 block dark:text-white">
                Company Name
              </label>
              <input
                {...register("name", { required: true })}
                required={true}
                placeholder="Company Name"
                className="w-full h-10 p-2 border mt-1  rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
              />
            </div>

            <div className="md:col-span-5">
              <label className="text-sm text-black mb-2 block dark:text-white">
                Company Description
              </label>
              <textarea
                className="w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                {...register("description", { required: true })}
                required={true}
                placeholder="Company Description"
              />
            </div>

            <div className="md:col-span-5">
              <Controller
                className="w-full"
                name="picture"
                onChange={(value) => setValue("picture", value)}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <div className="font-[sans-serif]">
                      <label className="text-sm text-black mb-2 block dark:text-white">
                        Company Logo
                      </label>
                      <input
                        required={true}
                        onChange={(e) => field.onChange(e.target.files)}
                        type="file"
                        className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded dark:bg-zinc-700 dark:text-white"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        PNG, JPG SVG, and GIF are Allowed.
                      </p>
                    </div>
                    {uploadedFile && uploadedFile.length > 0 && (
                      <div className="mb-4">
                        {fileUploadMutation.isLoading ? (
                          <>
                            <LoadingSpinner />
                          </>
                        ) : (
                          <p className="text-xs text-gray-400 mt-2"></p>
                        )}
                      </div>
                    )}{" "}
                  </div>
                )}
              />
            </div>
            <div className="md:col-span-5">
              <Controller
                name="document"
                control={control}
                rules={{ required: false }}
                onChange={(value) => setValue("document", value)}
                render={({ field }) => (
                  <div>
                    <div>
                      <label className="text-sm text-black mb-2 block dark:text-white">
                        Please provide company documents to verify your account
                      </label>

                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="sr-only"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                      <label
                        htmlFor="file"
                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                      >
                        <div>
                          <span className="mb-2 block text-xl font-semibold  dark:text-white">
                            Drop files here
                          </span>
                          <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                          </span>
                          <span className="inline-flex rounded border hover:bg-zinc-200 dark:text-white border-[#e0e0e0] py-2 px-7 text-base font-medium">
                            Browse
                          </span>
                        </div>
                      </label>
                    </div>
                    <div>
                      {uploadedFiledoc && uploadedFiledoc.length > 0 && (
                        <div className="mb-4">
                          {fileUploadMutation.isLoading ? (
                            <>
                              <LoadingSpinner />
                            </>
                          ) : (
                            <p className="text-green-600 text-left"></p>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      {bannersData?.map((banner, index) => (
                        <div
                          key={index}
                          className="my-5 rounded-md bg-[#F5F7FB] py-4 px-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                              {banner.name}
                            </span>
                            <button className="text-[#07074D]">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              ></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-black mb-2 block dark:text-white">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                {...register("country", { required: true })}
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
              <label className="text-sm text-black mb-2 block dark:text-white">
                Address / Street
              </label>

              <input
                type="text"
                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                placeholder="Address"
                {...register("address", { required: true })}
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm text-black mb-2 dark:text-white block">
                Website url
              </label>
              <input
                type="text"
                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                placeholder="Website"
                {...register("websiteURL", { required: false })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-black dark:text-white mb-2 block">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
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
