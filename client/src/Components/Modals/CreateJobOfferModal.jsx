import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import moment from "moment";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSkills } from "../../hooks/react-query/useSkills";
import {
  useCreateJob,
  useJobTypes,
  useOfferTypes,
} from "../../hooks/react-query/useJobs";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import CompanyIcon from "../icons/CompanyIcon";
import UsersIcon from "../icons/UsersIcon";
import Editor from "../Editor";
import InfoIcon from "../icons/InfoIcon";

const CreateJobOfferModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showUser, setShowUser] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const handleCardClick = (companyId) => {
    setSelectedOption(companyId);
  };
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);

  const { data: skills } = useSkills();
  const { data: JobTypes } = useJobTypes();
  const { data: OfferTypes } = useOfferTypes();
  const [content, setContent] = useState("");

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      description: "",
      skills: [],
    },
  });

  const { mutate } = useCreateJob(user);

  const onSubmit = (JobData) => {
    const companyId = selectedOption;

    const modifiedJobData = {
      ...JobData,
      description: content,
      category: JobData?.category?.map((category) => category?.value),
      skills: JobData?.skills.map((skill) => skill.value),
    };

    mutate({ companyId, JobData: modifiedJobData });
  };

  const handleToggleUser = () => {
    setShowUser(true);
    setShowCompanies(false);
  };

  const handleToggleCompanies = () => {
    setShowUser(false);
    setShowCompanies(true);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = userProfile?.companies.length || 0;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

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
              Create Job Offer
            </h4>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <CloseIcon />
            </button>
          </div>
          <hr />
          <div class="m-8 max-w-[550px] mx-auto space-y-6 px-5 md:px-0">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-10 h-10 shrink-0 border bg-blue-100 rounded-full text-blue-500 ">
                  <InfoIcon />
                </span>
                <h1 className="font-medium text-xl dark:text-white">
                  Are you posting as an individual, or as a company?
                </h1>
              </div>
              <div className="flex inset-y-0 right-0 items-center pr-0 h-14  bg-green-50 rounded-full">
                <button
                  className={`flex items-center rounded-full h-14 dark:text-black transition-colors duration-300 ease-in focus:outline-none w-full hover:text-green-300 px-4 py-2 ${
                    showUser ? "bg-green-500 text-white shadow" : ""
                  }`}
                  onClick={handleToggleUser}
                >
                  <div className="flex items-center gap-2 dark:text-white">
                    <UsersIcon />
                    <span className="hidden sm:inline font-medium text-lg dark:text-white">
                      Individual
                    </span>
                  </div>
                </button>
                <button
                  className={`flex items-center rounded-full h-14 dark:text-black transition-colors duration-300 ease-in focus:outline-none w-full hover:text-green-300  px-4 py-2 ${
                    showCompanies ? "bg-green-500 text-white shadow" : ""
                  }`}
                  onClick={handleToggleCompanies}
                >
                  <div className="flex items-center gap-2 dark:text-white">
                    <CompanyIcon />
                    <span className="hidden sm:inline font-medium text-lg dark:text-white">
                      Company
                    </span>
                  </div>
                </button>
              </div>
              <div>
                {showCompanies && (
                  <div className="flex items-center justify-center">
                    {userProfile?.companies.length > 1 && (
                      <button
                        onClick={handlePrevPage}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-6 h-6"
                        >
                          <path d="M15 18l-6-6 6-6v12z" fill="currentColor" />
                        </svg>
                      </button>
                    )}
                    {userProfile?.companies.length > 0 &&
                      userProfile.companies
                        .slice(currentPage, currentPage + 1)
                        .map((option, index) => (
                          <div
                            key={option._id}
                            className={`border-2 p-2 rounded-lg mb-2 cursor-pointer relative ${
                              selectedOption === option._id
                                ? "border-green-500"
                                : "border-gray-300 "
                            }`}
                            onClick={() => handleCardClick(option._id)}
                          >
                            {/* Company image */}
                            <img
                              src={option.companyLogo}
                              alt={option.companyName}
                              className={`w-32 h-32 object-cover border rounded-lg transition-transform transform hover:scale-110 `}
                            />
                            {selectedOption === option._id && (
                              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 mb-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 12"
                                  width="24"
                                  height="12"
                                  className="text-green-500"
                                >
                                  <path
                                    d="M0 0l12 12 12-12z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                    {userProfile?.companies.length > 1 && (
                      <button
                        onClick={handleNextPage}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-6 h-6"
                        >
                          <path d="M9 18l6-6-6-6v12z" fill="currentColor" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 space-y-4">
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Job Title
                  </label>
                  <div className="relative my-2">
                    <input
                      {...register("title", { required: true })}
                      required={true}
                      placeholder="job title"
                      className="w-full h-10 p-2 border mt-1  rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                    />
                  </div>
                </div>

                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Job Type
                  </label>
                  <div className="relative my-2">
                    <select
                      id="jobType"
                      required={true}
                      className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                      {...register("jobType", { required: true })}
                    >
                      <option value="" defaultValue>
                        Choose a job type
                      </option>
                      {JobTypes?.map((jobType) => (
                        <option key={jobType._id} value={jobType.name}>
                          {jobType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Offer Type
                  </label>
                  <div className="relative my-2">
                    <select
                      id="offerType"
                      required={true}
                      className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                      {...register("offerType", { required: true })}
                    >
                      <option value="" defaultValue>
                        Choose an offer type
                      </option>
                      {OfferTypes?.map((offerType) => (
                        <option key={offerType._id} value={offerType.name}>
                          {offerType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Render skills options */}
                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Select Skills
                  </label>
                  <div className="relative my-2">
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
                </div>

                <div className="md:col-span-5">
                  <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                    Job Description
                  </label>
                  <div className="relative my-2">
                    <Editor value={content} onChange={setContent} />
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
