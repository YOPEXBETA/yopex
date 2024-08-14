import React from "react";
import Modal from "../Modals/index";
import moment from "moment";
import CloseIcon from "../icons/CloseIcon";
import { useForm, Controller } from "react-hook-form";
import { useStartChallenge } from "../../hooks/react-query/useChallenges";
import {useStartTeamChallenge} from "../../hooks/react-query/useTeamChallenge";

const StartChallengeModal = ({ open, handleClose, challenge, type }) => {
  const { mutate: startChallenge } = useStartChallenge();
  const { mutate: startTeamChallenge } = useStartTeamChallenge();
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
    if (type === "challenge") {
      startChallenge(data, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else if (type === "teamChallenge") {
      startTeamChallenge(data, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else {
      console.error("Invalid type provided");
    }
  }
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
              Set the Deadline
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
          <div className="m-8 space-y-6 px-5 md:px-0">
            <form
              className="md:col-span-5 text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <div className="inline-flex items-center w-full mt-4">
                <button
                  className="bg-green-500 px-5 py-3 rounded-lg w-full hover:bg-green-700 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Start the challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StartChallengeModal;
