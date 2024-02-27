import moment from "moment";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStartChallenge } from "../../../../../../hooks/react-query/useChallenges";

const Start = () => {
  const { mutate } = useStartChallenge();
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
    setValue,
  } = useForm();
  const deadline = watch("deadline");
  let now = new Date();
  now.setHours(now.getHours() + 1);
  now = now.toISOString().slice(0, -8);

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div>
      <form
        className="md:col-span-5 text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-left text-black mt-4 block dark:text-white">
          Set the Deadline
        </label>

        <Controller
          control={control}
          name="deadline"
          defaultValue={now}
          render={({ field }) => (
            <input
              required
              type="datetime-local"
              className="w-full py-2 px-3 rounded-lg dark:bg-zinc-700 mt-2 dark:text-white border focus:outline-none focus:border-green-500 mb-2"
              {...field}
              onChange={(e) => {
                const now = moment();
                const diff = moment(deadline).diff(now + 1);

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
        <div className="text-center mt-4 ">
          <div className="inline-flex items-center w-full">
            <button
              className="bg-green-500 px-5 py-3 rounded-full w-full h-16 hover:bg-green-700 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              Start the challenge
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Start;
