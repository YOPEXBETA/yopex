import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useSkills } from "../../../../../../hooks/react-query/useSkills";
import { useState } from "react";
import { useCreateExperience } from "../../../../../../hooks/react-query/useExperience";

const AddExperienceModel = ({ open, handleClose, userId }) => {
  const { data: skills } = useSkills();
  const [type, setType] = useState("");
  const [locationtype, setLocationtype] = useState("");
  const { mutate } = useCreateExperience(userId);
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit = async (data) => {
    data.skills = data.skills.map((skill) => skill.label);
    const creationData = {
      ...data,
      type,
      locationtype,
    };
    mutate(creationData);
    handleClose(false);
  };
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"} `}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center my-8">
          <div className="dark:bg-zinc-800 rounded-lg shadow-xl w-full md:max-w-xl h-full bg-white  overflow-y-auto ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between px-4 pt-4">
                <h4 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Add Experince
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    handleClose(false);
                  }}
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
              <div className="px-4">
                <div className="grid grid-cols-1">
                  <div className="col-span-1">
                    <label className="dark:text-gray-300">Title</label>

                    <input
                      type="text"
                      placeholder="EX: Web developer, Art, software engineer..."
                      className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("title")}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="company"
                      className="block text-gray-600 dark:text-gray-300"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Company Name"
                      className="w-full border border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("company")}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="type"
                      className="block text-gray-600 dark:text-gray-300"
                    >
                      Type
                    </label>
                    <Select
                      className="my-react-select-container"
                      classNamePrefix="my-react-select"
                      options={[
                        { label: "internship", value: "internship" },
                        { label: "Full-time", value: "Full-time" },
                        { label: "volunteering", value: "volunteering" },
                        { label: "Part-time", value: "Part-time" },
                      ]}
                      onChange={(selectedOptions) => {
                        setType(selectedOptions.value);
                      }}
                      placeholder="Select Type"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="location"
                      className="block text-gray-600 dark:text-gray-300"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="location"
                      className="w-full border border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("location")}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="type"
                      className="block text-gray-600 dark:text-gray-300"
                    >
                      Location Type
                    </label>
                    <Select
                      className="my-react-select-container"
                      classNamePrefix="my-react-select"
                      options={[
                        { label: "remote", value: "remote" },
                        { label: "office", value: "office" },
                        { label: "hybrid", value: "hybrid" },
                      ]}
                      onChange={(selectedOptions) => {
                        setLocationtype(selectedOptions.value);
                      }}
                      placeholder="Select Type"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="dark:text-gray-300">Start Date</label>
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("startdate")}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="dark:text-gray-300">End Date</label>
                    <input
                      type="date"
                      placeholder="End Date"
                      className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("enddate")}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="col-span-1">
                    <label className="dark:text-gray-300">Description</label>

                    <textarea
                      id="Description"
                      placeholder="Description"
                      rows={6}
                      className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                      {...register("description")}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="selectCategories"
                    className="dark:text-white block mb-2"
                  >
                    Select Skills
                  </label>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full ">
                        <Select
                          isMulti
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          options={
                            skills
                              ? skills?.map((skill) => ({
                                  label: skill?.name,
                                  value: skill,
                                }))
                              : []
                          }
                          onChange={(selectedOptions) =>
                            onChange(selectedOptions)
                          }
                          value={value}
                          placeholder="Select Skills"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between px-4 py-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 w-full rounded"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceModel;
