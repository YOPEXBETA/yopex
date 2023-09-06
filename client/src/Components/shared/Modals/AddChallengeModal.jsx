import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import moment from "moment";
import AlertContainer from "../../../Components/alerts";

import { useSelector } from "react-redux";
import AlertSuccess from "../../../Components/successalert";
import { useForm, Controller } from "react-hook-form";

// ==============================|| HOOKS ||============================== //

import { useCreateChallenge } from "../../../hooks/react-query/useChallenges";
import { useUserById } from "../../../hooks/react-query/useUsers";
import { useSkills } from "../../../hooks/react-query/useSkills";
import { useCategories } from "../../../hooks/react-query/useCategories";

export const AddChallengeModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);
  const [category, setCategory] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      RecommendedSkills: [],
    },
  });

  const deadline = watch("deadline");

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data: userProfile, isLoading } = useUserById(userId);

  const { mutate, error, isError, isSuccess } = useCreateChallenge(user);

  const onSubmit = (challengeData) => {
    const companyId = selectedOption;

    mutate({ companyId, challengeData });
  };

  const now = new Date().toISOString().slice(0, -8);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-96 sm:p-6 lg:w-[40rem]">
          <div>
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Create a Challenge
            </h2>
            <div className="mt-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%" }}
                spacing={2}
                lang="en"
              >
                <select
                  id="selectField"
                  className="block w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="">Select a company</option>
                  {userProfile?.companies.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.companyName}
                    </option>
                  ))}
                </select>

                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder="challenge title"
                  {...register("title", { required: true })}
                />
                <div className="mb-2">
                  <Controller
                    control={control}
                    name="RecommendedSkills"
                    defaultValue={"Any"}
                    render={({ field }) =>
                      itSkills && (
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={itSkills}
                          getOptionLabel={(option) => option}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(e, value) =>
                            setValue("RecommendedSkills", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Skills"
                            />
                          )}
                        />
                      )
                    }
                  />
                </div>

                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("description", { required: true })}
                  placeholder="challenge description"
                />

                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="number"
                  placeholder="challenge prize"
                  {...register("price", { required: true })}
                />
                <div className="mb-2">
                  {itCategory && (
                    <Autocomplete
                      disablePortal
                      id="tags-outlined"
                      options={itCategory}
                      value={category}
                      onChange={(e, value) => {
                        setValue("category", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Category"
                        />
                      )}
                    />
                  )}
                </div>

                {isError && (
                  <AlertContainer error={error?.response?.data?.error?.msg} />
                )}
                {isSuccess && <AlertSuccess message="Created the challenge" />}

                <div className="mb-4">
                  <Controller
                    control={control}
                    name="deadline"
                    defaultValue={new Date().toISOString().slice(0, -8)}
                    render={({ field }) => (
                      <TextField
                        required
                        fullWidth
                        type="datetime-local"
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: now,
                        }}
                      />
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 px-6 py-2 text-white rounded-md"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Challenge
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
