import React, { useEffect } from "react";
import { useEditJob } from "../../../hooks/react-query/useJobs";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSkills } from "../../../hooks/react-query/useSkills";
import Modal from "../../Modals";
import CloseIcon from "../../icons/CloseIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles for ReactQuill

export const EditJobModal = ({ open, handleClose, job }) => {
  const { mutate } = useEditJob(job._id);

  const { data: skills } = useSkills();
  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      title: job.title,
      description: job.description,
      jobType: job.jobType,
      offerType: job.offerType,
      skills: job.skills.map((skill) => ({
        value: skill._id,
        label: skill.name,
      })),
      salaryRange: {
        min: job.salaryRange.min,
        max: job.salaryRange.max,
        currency: job.salaryRange.currency,
      },
    },
  });

  const onSubmit = async (data) => {
    const selectedSkills = data.skills.map((skill) => skill.value);

    mutate({
      ...data,
      skills: selectedSkills,
    });
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      reset({
        title: job.title,
        description: job.description,
        jobType: job.jobType,
        offerType: job.offerType,
        skills: job.skills.map((skill) => ({
          label: skill.name,
          value: skill._id,
        })),
        salaryRange: {
          min: job.salaryRange.min,
          max: job.salaryRange.max,
          currency: job.salaryRange.currency,
        },
      });
    }
  }, [open, job, reset]);

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
                Edit "{job.title}"
              </h4>
              <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <CloseIcon width={4} height={4} />
              </button>
            </div>
            <hr />
            <div className="m-8 max-w-[550px] mx-auto space-y-6 px-5 md:px-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 space-y-4">
                  {/* Job Title */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Title
                    </label>
                    <div className="relative my-2">
                      <input
                          className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                          type="text"
                          {...register("title")}
                          required
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Description
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="description"
                          control={control}
                          render={({field: {onChange, value}}) => (
                              <ReactQuill
                                  theme="snow"
                                  value={value}
                                  onChange={onChange}
                                  placeholder="Enter job description"
                              />
                          )}
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Type
                    </label>
                    <div className="relative my-2">
                      <select
                          className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                          {...register("jobType")}
                          required
                      >
                        <option value="">Choose a job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Scholarship">Scholarship</option>
                      </select>
                    </div>
                  </div>

                  {/* Offer Type */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Offer Type
                    </label>
                    <div className="relative my-2">
                      <select
                          className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                          {...register("offerType")}
                          required
                      >
                        <option value="">Choose an offer type</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Salary
                    </label>
                    <input
                        className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                        type="text"
                        {...register("salaryRange.min")}
                        placeholder="Min Salary"
                        required
                    />
                    <input
                        className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                        type="text"
                        {...register("salaryRange.max")}
                        placeholder="Max Salary"
                        required
                    />
                    <input
                        className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700"
                        type="text"
                        {...register("salaryRange.currency")}
                        placeholder="Currency"
                        required
                    />
                  </div>

                  {/* Skills */}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Skills
                    </label>
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
                                    options={skills?.map(skill => ({
                                      label: skill.name,
                                      value: skill._id
                                    }))}
                                    onChange={onChange}
                                    value={value}
                                    placeholder="Select Skills"
                                />
                              </div>
                          )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-5 text-right mt-4">
                    <button
                        className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
                        type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
  );
};
