import React, { useState } from "react";
import moment from "moment";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useCreateChallenge } from "../../hooks/react-query/useChallenges";
import { useFileUpload, useUserById } from "../../hooks/react-query/useUsers";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCategories } from "../../hooks/react-query/useCategories";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import CompanyIcon from "../icons/CompanyIcon";
import UsersIcon from "../icons/UsersIcon";
import { FaImage } from "react-icons/fa";

const CreateChallengeModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleCardClick = (companyId) => {
    setSelectedOption(companyId);
  };
  const [selectedOptionpaid, setSelectedOptionpaid] = useState("false");
  const [showUser, setShowUser] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      category: [],
      RecommendedSkills: [],
      category: [],
      files: [],
    },
  });

  const deadline = watch("deadline");

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);

  const { mutate, error, isError, isSuccess } = useCreateChallenge(user);
  //const fileUploadMutation = useFileUpload();
  const onSubmit = async (challengeData) => {
    
    if (showCompanies) {
      const companyId = selectedOption;
      mutate({ companyId, challengeData, paid: selectedOptionpaid });
    } else {
      // const formData = new FormData();
      // formData.append("file", challengeData.files[challengeData.files[0]]);
      // formData.append("type", "posts");

      // const result = await fileUploadMutation.mutateAsync(formData);

      mutate({ challengeData, paid: selectedOptionpaid });
    }
  };

  const now = new Date().toISOString().slice(0, -8);

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
      <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div class="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white">
          <div className="flex justify-between px-4 pt-4">
            <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Create Challenge
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
          <div class="m-8  max-w-[550px] mx-auto space-y-6">
            <div className="space-y-6">
              <h1 className="font-medium text-xl">
                Are you posting as an individual, or as a company?
              </h1>
              <div className="flex inset-y-0 right-0 items-center pr-0 h-14  bg-green-50 rounded-full">
                <button
                  className={`flex items-center rounded-full h-14 dark:text-black transition-colors duration-300 ease-in focus:outline-none w-full hover:text-green-300 px-4 py-2 ${
                    showUser ? "bg-green-500 text-white shadow" : ""
                  }`}
                  onClick={handleToggleUser}
                >
                  <div className="flex items-center gap-2">
                    <UsersIcon />
                    <span className="hidden sm:inline font-medium text-lg">
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
                  <div className="flex items-center gap-2">
                    <CompanyIcon />
                    <span className="hidden sm:inline font-medium text-lg">
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
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Challenge Title
                  </label>
                  <input
                    {...register("title", { required: true })}
                    required={true}
                    placeholder="challenge title"
                    className="w-full h-10 p-2 border mt-1  rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Challenge Description
                  </label>
                  <textarea
                    className="w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                    {...register("description", { required: true })}
                    required={true}
                    placeholder="challenge description"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Type
                  </label>

                  <select
                    id="selectFieldpaid"
                    className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                    value={selectedOptionpaid}
                    onChange={(e, value) => {
                      setSelectedOptionpaid(e.target.value);
                    }}
                  >
                    <option value={"false"}>free</option>
                    <option value={"true"}>paid</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Challenge Prize
                  </label>

                  <input
                    className={`w-full p-2 border  rounded dark:text-white  ${
                      selectedOptionpaid === "false"
                        ? "bg-zinc-200 dark:bg-zinc-900"
                        : "bg-white"
                    }  dark:bg-zinc-700 focus:outline-none focus:border-green-500`}
                    type="number"
                    placeholder="challenge prize"
                    {...register("price", { required: false })}
                    disabled={selectedOptionpaid === "false"}
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Select Skills
                  </label>
                  <Controller
                    control={control}
                    name="RecommendedSkills"
                    defaultValue={"Any"}
                    render={({ field }) =>
                      itSkills && (
                        <Select
                          isMulti
                          className="my-react-select-container mt-2"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={itSkills.map((skill) => ({
                            value: skill,
                            label: skill,
                          }))}
                          value={field.value.map((skill) => ({
                            value: skill,
                            label: skill,
                          }))}
                          onBlur={field.onBlur}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
                              (option) => option.value
                            );
                            field.onChange(selectedValues);
                          }}
                        />
                      )
                    }
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Select Categories
                  </label>
                  <Controller
                    control={control}
                    name="category"
                    defaultValue={"Any"}
                    render={({ field }) =>
                      itCategory && (
                        <Select
                          isMulti
                          className="my-react-select-container mt-2"
                          classNamePrefix="my-react-select"
                          id="tags-outlined"
                          options={itCategory.map((category) => ({
                            value: category,
                            label: category,
                          }))}
                          value={field.value.map((category) => ({
                            value: category,
                            label: category,
                          }))}
                          onBlur={field.onBlur}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
                              (option) => option.value
                            );
                            field.onChange(selectedValues);
                          }}
                        />
                      )
                    }
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Specify The Participants Number
                  </label>
                  <input
                    required
                    className="w-full py-2 px-3 mt-2 dark:bg-zinc-700  dark:text-white rounded border focus:outline-none focus:border-green-500"
                    type="number"
                    placeholder="number of particiant"
                    min={1}
                    {...register("nbruser", { required: true })}
                  />
                </div>
                

                <div className="md:col-span-5">
                  <label className="text-sm text-black mb-2 block dark:text-white">
                    Deadline
                  </label>

                  <Controller
                    control={control}
                    name="deadline"
                    defaultValue={new Date().toISOString().slice(0, -8)}
                    render={({ field }) => (
                      <input
                        required
                        type="datetime-local"
                        className="w-full py-2 px-3 dark:bg-zinc-700 mt-2 dark:text-white rounded border focus:outline-none focus:border-green-500 mb-2"
                        {...field}
                        onChange={(e) => {
                          const now = moment();
                          const diff = moment(deadline).diff(now);

                          if (diff < 0) {
                            setValue("deadline", "");
                            return false;
                          }

                          setValue("deadline", `${e.currentTarget.value}:00`);
                        }}
                        min={now}
                      />
                    )}
                  />
                </div>

                <div className="md:col-span-5 text-right mt-4">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create Challenge
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

export default CreateChallengeModal;
