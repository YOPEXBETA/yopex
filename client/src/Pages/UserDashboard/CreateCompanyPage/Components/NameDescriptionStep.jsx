import React from "react";
import { Controller } from "react-hook-form";
import { useGetAllSectors } from "../../../../hooks/react-query/useCompany";

const NameDescriptionStep = ({
  control,
  formData,
  organization,
  updateFormData,
}) => {
  const {
    data: sectorsData,
    isLoading: sectorsLoading,
    isError: sectorsError,
  } = useGetAllSectors();
  const handleInputChange = (field, value) => {
    updateFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="md:col-span-5">
          <label className="text-sm text-black mb-2 block dark:text-white">
            What is the name of your {organization}?
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue={formData.name || ""}
            rules={{ required: "Organization Name is required" }}
            render={(
              { field, fieldState } // Ensure fieldState is destructured here
            ) => (
              <div>
                <input
                  {...field}
                  onChange={(e) => {
                    handleInputChange("name", e.target.value);
                    field.onChange(e.target.value);
                  }}
                  required={true}
                  placeholder="Organization Name"
                  className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 ${
                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldState.error?.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        {organization === "Company" && (
          <div className="md:col-span-5">
            <label className="text-sm text-black mb-2 block dark:text-white">
              Select the sector that best describes your {organization}
            </label>
            <Controller
              name="sectorOfActivity"
              control={control}
              defaultValue={formData.sectorOfActivity || ""}
              rules={{ required: "Sector of Activity is required" }}
              render={(
                { field, fieldState } // Ensure fieldState is destructured here
              ) => (
                <div>
                  <select
                    {...field}
                    className={`w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 ${
                      fieldState.invalid ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a sector...</option>
                    {sectorsData?.map((sector) => (
                      <option key={sector._id} value={sector.name}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <span className="text-red-500 text-sm mt-1">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            {sectorsLoading && (
              <p className="text-gray-500">Loading sectors...</p>
            )}
            {sectorsError && (
              <p className="text-red-500">Error fetching sectors.</p>
            )}
          </div>
        )}
        <div className="md:col-span-5">
          <label className="text-sm text-black mb-2 block dark:text-white">
            Can you describe your {organization}?
          </label>
          <Controller
            name="description"
            control={control}
            defaultValue={formData.description || ""}
            rules={{
              required: "Organization Description is required",
              minLength: {
                value: 100,
                message: "Description must be at least 100 characters",
              },
            }}
            render={(
              { field, fieldState } // Ensure fieldState is destructured here
            ) => (
              <div>
                <textarea
                  {...field}
                  onChange={(e) => {
                    handleInputChange("description", e.target.value);
                    field.onChange(e.target.value);
                  }}
                  placeholder="Organization Description"
                  className={`w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 ${
                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldState.error?.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default NameDescriptionStep;
