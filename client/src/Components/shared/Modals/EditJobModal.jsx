import React, { useEffect } from "react";
import { useEditJob } from "../../../hooks/react-query/useJobs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";

export const EditJobModal = ({ open, handleClose, job }) => {
  const { mutate } = useEditJob(job._id);

  const { data: skills } = useSkills();
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      title: job.title,
      description: job.description,
      salary: job.salary,
      skills: job.skills,
    },
  });

  const onSubmit = async (data) => {
    mutate({
      title: data.title,
      description: data.description,
      salary: data.salary,
      category: data.category,
      RecommendedSkills: data.RecommendedSkills,
    });
    handleClose();
  };
  useEffect(() => {
    if (!open) {
      // Reset the form when the modal is closed
      reset({
        title: job.title,
        description: job.description,
        salary: job.salary,
        category: job.category,
        RecommendedSkills: job.RecommendedSkills,
      });
    }
  }, [open, job, reset]);

  return (
    <div
      open={open}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"} `}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl md:w-[40rem] p-4 h-full border  w-screen overflow-y-auto max-h-full">
          <div>
            <button
              className="text-gray-400 absolute bg-zinc-900 rounded-full right-4 top-4  hover:bg-gray-200 hover:text-gray-900 text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
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
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Edit "{job.title}"
            </h2>
            <div className="mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder={job.title}
                  {...register("title")}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  multiline
                  rows={4}
                />
                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("description")}
                  placeholder={job.description}
                  id="companyDescription"
                  label="companyDescription"
                />
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder={job.salary}
                  {...register("salary")}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="salary"
                  label="salary"
                  multiline
                  rows={4}
                />

                <div className="flex-1">
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="w-full dark:bg-zinc-700 mt-2">
                        <Select
                          isMulti
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          required={true}
                          id="tags-outlined"
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

                <div className="flex justify-between mt-4">
                  <button
                    className=" px-6 py-2 text-white w-full rounded-md border-2 bg-green-500 hover:bg-green-600"
                    type="submit"
                  >
                    Edit your job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
