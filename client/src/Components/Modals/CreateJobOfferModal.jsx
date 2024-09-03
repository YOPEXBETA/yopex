import React, {useEffect, useRef, useState} from "react";
import "react-quill/dist/quill.snow.css";

import Select from "react-select";
import {useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {useSkills} from "../../hooks/react-query/useSkills";
import {useCreateJob} from "../../hooks/react-query/useJobs";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import Editor from "../Editor";
import currencyData from '../../currencies.json';

const CreateJobOfferModal = ({open, handleClose}) => {
  const {data: skills} = useSkills();
  const [content, setContent] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const modalRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: {isSubmitting, errors},
  } = useForm({
    defaultValues: {
      title: "",
      jobType: "",
      offerType: "",
      skills: [],
      appliersNumber: "",
      salaryRange: {
        min: "",
        max: "",
        currency: "TND",
      },
      paid: false,
    },
  });
  const {mutate} = useCreateJob();

  const onSubmit = (JobData) => {
    const modifiedJobData = {
      ...JobData,
      description: content,
      skills: JobData?.skills?.map((skill) => skill.value),
      paid: isPaid,
    };
    console.log('data', modifiedJobData)
    mutate({userId: user._id, JobData: modifiedJobData});
    handleClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const currencyOptions = Object.keys(currencyData).map((code) => ({
    value: code,
    label: `${currencyData[code].name} (${currencyData[code].symbol})`,
  }));

  const minSalary = watch("salaryRange.min");
  const maxSalary = watch("salaryRange.max");

  const validateMinSalary = (value) => {
    if (value < 0) return "Minimum salary cannot be negative";
    if (maxSalary !== undefined && value > maxSalary) return "Minimum salary cannot be higher than maximum salary";
    return true;
  };

  const validateMaxSalary = (value) => {
    if (value < 0) return "Maximum salary cannot be negative";
    if (minSalary !== undefined && value < minSalary) return "Maximum salary cannot be lower than minimum salary";
    return true;
  };
  return (
      <Modal
          open={open}
          onClose={handleClose}
          className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
      >
        <div
            className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div ref={modalRef}
               className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
            <div className="flex justify-between px-4 pt-4">
              <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Create Organization Job Offer
              </h4>
              <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <CloseIcon width={4} height={4}/>
              </button>
            </div>
            <hr/>
            <div className="m-8 max-w-[550px] mx-auto space-y-6 px-5 md:px-0">
              <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 space-y-4">
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Title
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="title"
                          control={control}
                          rules={{required: "Job title is required"}}
                          render={({field}) => (
                              <>
                                <input
                                    {...field}
                                    placeholder="job title"
                                    className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                )}
                              </>
                          )}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Type
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="jobType"
                          control={control}
                          rules={{required: "Job type is required"}}
                          render={({field}) => (
                              <>
                                <select
                                    {...field}
                                    className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                >
                                  <option value="" disabled>Choose a job type</option>
                                  <option value="Full-time">Full-time</option>
                                  <option value="Part-time">Part-time</option>
                                  <option value="Contract">Contract</option>
                                  <option value="Freelance">Freelance</option>
                                  <option value="Internship">Internship</option>
                                  <option value="Volunteering">Volunteering</option>
                                  <option value="Scholarship">Scholarship</option>
                                </select>
                                {errors.jobType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>
                                )}
                              </>
                          )}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Offer Type
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="offerType"
                          control={control}
                          rules={{required: "Offer type is required"}}
                          render={({field}) => (
                              <>
                                <select
                                    {...field}
                                    className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                >
                                  <option value="" disabled>Choose an offer type</option>
                                  <option value="On-site">On-site</option>
                                  <option value="Hybrid">Hybrid</option>
                                  <option value="Remote">Remote</option>
                                </select>
                                {errors.offerType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.offerType.message}</p>
                                )}
                              </>
                          )}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Opportunity Type
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="paid"
                          control={control}
                          render={({field: {onChange, value}}) => (
                              <ul className="grid w-full gap-2 md:grid-cols-2">
                                <li>
                                  <input
                                      type="radio"
                                      id="paid"
                                      name="opportunity-type"
                                      value="true"
                                      checked={value === true}
                                      onChange={() => {
                                        onChange(true);
                                        setIsPaid(true);
                                      }}
                                      className="hidden peer"
                                      required
                                  />
                                  <label
                                      htmlFor="paid"
                                      className={`inline-flex items-center justify-center w-full border rounded-lg cursor-pointer dark:border-gray-700 ${value === true ? 'border-green-600' : 'border-gray-200 hover:border-green-400 dark:border-gray-600 dark:hover:border-gray-400'} h-10`}
                                  >
                                    <div
                                        className="flex flex-col items-center justify-center h-full w-full text-center">
                                      <div className="text-lg font-semibold">Paid</div>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <input
                                      type="radio"
                                      id="unpaid"
                                      name="opportunity-type"
                                      value="false"
                                      checked={value === false}
                                      onChange={() => {
                                        onChange(false);
                                        setIsPaid(false);
                                      }}
                                      className="hidden peer"
                                  />
                                  <label
                                      htmlFor="unpaid"
                                      className={`inline-flex items-center justify-center w-full border rounded-lg cursor-pointer dark:border-gray-700 ${value === false ? 'border-red-600' : 'border-gray-200 hover:border-red-400 dark:border-gray-600 dark:hover:border-gray-400'} h-10`}
                                  >
                                    <div
                                        className="flex flex-col items-center justify-center h-full w-full text-center">
                                      <div className="text-lg font-semibold">Unpaid</div>
                                    </div>
                                  </label>
                                </li>
                              </ul>
                          )}
                      />
                    </div>
                  </div>


                  {isPaid && (
                      <div className="md:col-span-5">
                        <label
                            className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                          Salary Range
                        </label>
                        <div className="relative my-2">
                          <Controller
                              name="salaryRange.min"
                              control={control}
                              rules={{validate: validateMinSalary}}
                              render={({field}) => (
                                  <>
                                    <input
                                        {...field}
                                        placeholder="Minimum salary"
                                        type="number"
                                        className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                    />
                                    {errors.salaryRange?.min && (
                                        <p className="text-red-500 text-xs mt-1">{errors.salaryRange.min.message}</p>
                                    )}
                                  </>
                              )}
                          />
                        </div>
                      </div>
                  )}

                  {isPaid && (
                      <div className="md:col-span-5">
                        <label
                            className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                          Maximum Salary
                        </label>
                        <div className="relative my-2">
                          <Controller
                              name="salaryRange.max"
                              control={control}
                              rules={{validate: validateMaxSalary}}
                              render={({field}) => (
                                  <>
                                    <input
                                        {...field}
                                        placeholder="Maximum salary"
                                        type="number"
                                        className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                    />
                                    {errors.salaryRange?.max && (
                                        <p className="text-red-500 text-xs mt-1">{errors.salaryRange.max.message}</p>
                                    )}
                                  </>
                              )}
                          />
                        </div>
                      </div>
                  )}

                  {isPaid && (
                      <div className="md:col-span-5">
                        <Controller
                            name="salaryRange.currency"
                            control={control}
                            rules={{required: "Currency is required"}}
                            render={({field}) => (
                                <>
                                  <label className="text-sm dark:text-white">Currency</label>
                                  <Select
                                      {...field}
                                      options={currencyOptions}
                                      className="w-full mt-1"
                                      onChange={(option) => field.onChange(option.value)}
                                      value={currencyOptions.find(opt => opt.value === field.value)}
                                      placeholder="Select Currency"
                                  />
                                  {errors.salaryRange?.currency && (
                                      <p className="text-red-500 text-xs mt-1">{errors.salaryRange.currency.message}</p>
                                  )}
                                </>
                            )}
                        />
                      </div>
                  )}
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Select Skills
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="skills"
                          control={control}
                          rules={{required: "At least one skill is required"}}
                          render={({field: {onChange, value}}) => (
                              <>
                                <div className="w-full dark:bg-zinc-700 mt-2">
                                  <Select
                                      isMulti
                                      className="my-react-select-container"
                                      classNamePrefix="my-react-select"
                                      id="tags-outlined"
                                      options={
                                        skills
                                            ? skills.map((skill) => ({
                                              label: skill.name,
                                              value: skill,
                                            }))
                                            : []
                                      }
                                      onChange={(selectedOptions) => onChange(selectedOptions)}
                                      value={value}
                                      placeholder="Select Skills"
                                  />
                                </div>
                                {errors.skills && (
                                    <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>
                                )}
                              </>
                          )}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Appliers Number
                    </label>
                    <div className="relative my-2">
                      <Controller
                          name="appliersNumber"
                          control={control}
                          rules={{
                            required: "Appliers number is required",
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Appliers number must be a valid number"
                            }
                          }}
                          render={({field}) => (
                              <>
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="Number of appliers"
                                    className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                />
                                {errors.appliersNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.appliersNumber.message}</p>
                                )}
                              </>
                          )}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                      Job Description
                    </label>
                    <div className="relative my-2">
                      <Editor value={content} onChange={setContent}/>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right mt-4">
                    <div className="inline-flex items-end">
                      <button
                          className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
                          type="submit"
                          disabled={isSubmitting}
                      >
                        Create Job Offer
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
  );
};

export default CreateJobOfferModal;
