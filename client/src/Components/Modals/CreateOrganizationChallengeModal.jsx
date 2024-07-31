import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSkills } from "../../hooks/react-query/useSkills";
import { useCategories } from "../../hooks/react-query/useCategories";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import InfoIcon from "../icons/InfoIcon";
import Select from "react-select";

const CreateOrganizationChallengeModal = ({ open, handleClose }) => {
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            category: [],
            skills: [],
            files: [],
        },
    });

    const { data: Skills } = useSkills();
    const { data: categorys } = useCategories();

    const onSubmit = async (challengeData) => {
        // Implement your form submission logic here
        console.log(challengeData);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={`fixed inset-0 z-50 ${open ? "" : "hidden"}`}
        >
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                <div className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
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
                            <CloseIcon width={4} height={4} />
                        </button>
                    </div>
                    <hr />
                    <div className="m-8 max-w-[550px] mx-auto space-y-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-10 h-10 shrink-0 border bg-blue-100 rounded-full text-blue-500 ">
                  <InfoIcon />
                </span>
                                <h1 className="font-medium text-xl dark:text-white">
                                    Create a Challenge
                                </h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-7 space-y-4">
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Challenge Title
                                        </label>
                                        <div className="relative my-2">
                                            <input
                                                {...register("title", { required: true })}
                                                required
                                                placeholder="challenge title"
                                                className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Challenge Description
                                        </label>
                                        <div className="relative my-2">
                      <textarea
                          className="w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                          {...register("description", { required: true })}
                          required
                          placeholder="challenge description"
                      />
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Objective
                                        </label>
                                        <div className="relative my-2">
                                            <select
                                                id="selectFieldpaid"
                                                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                                {...register("objective", { required: true })}
                                            >
                                                <option value="Recrutement">Recrutement</option>
                                                <option value="Freelance">Freelance</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Innovation">Innovation</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Type
                                        </label>
                                        <div className="relative my-2">
                                            <select
                                                id="selectFieldpaid"
                                                className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                                                {...register("paid", { required: true })}
                                            >
                                                <option value="false">Free</option>
                                                <option value="true">Paid</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Challenge Prize
                                        </label>
                                        <div className="relative my-2">
                                            <input
                                                className={`w-full p-2 border rounded dark:text-white ${
                                                    watch("paid") === "false"
                                                        ? "bg-zinc-200 dark:bg-zinc-900"
                                                        : "bg-white"
                                                } dark:bg-zinc-700 focus:outline-none focus:border-green-500`}
                                                type="number"
                                                placeholder="challenge prize"
                                                {...register("price", { required: false })}
                                                disabled={watch("paid") === "false"}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Select Skills
                                        </label>
                                        <div className="relative my-2">
                                            <Controller
                                                control={control}
                                                name="skills"
                                                defaultValue={[]}
                                                render={({ field }) =>
                                                    Skills && (
                                                        <Select
                                                            isMulti
                                                            className="my-react-select-container mt-2"
                                                            classNamePrefix="my-react-select"
                                                            id="tags-outlined"
                                                            options={Skills.map((skill) => ({
                                                                value: skill._id,
                                                                label: skill.name,
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
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Select Categories
                                        </label>
                                        <div className="relative my-2">
                                            <Controller
                                                control={control}
                                                name="category"
                                                defaultValue={[]}
                                                render={({ field }) =>
                                                    categorys && (
                                                        <Select
                                                            isMulti
                                                            className="my-react-select-container mt-2"
                                                            classNamePrefix="my-react-select"
                                                            id="tags-outlined"
                                                            options={categorys.map((category) => ({
                                                                value: category._id,
                                                                label: category.name,
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
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Specify The Participants Number
                                        </label>
                                        <div className="relative my-2">
                                            <input
                                                required
                                                className="w-full py-2 px-3 mt-2 dark:bg-zinc-700 dark:text-white rounded border focus:outline-none focus:border-green-500"
                                                type="number"
                                                placeholder="number of participants"
                                                min={1}
                                                {...register("nbruser", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            You can add here a YouTube video link to explain the
                                            challenge (Optional)
                                        </label>
                                        <div className="relative my-2">
                                            <input
                                                className="w-full py-2 px-3 mt-2 dark:bg-zinc-700 dark:text-white rounded border focus:outline-none focus:border-green-500"
                                                type="text"
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                {...register("youtubeLink", { required: false })}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-7">
                                        <label className="dark:text-white text-sm font-bold leading-tight tracking-normal">
                                            Add Files (Optional)
                                        </label>
                                        <div className="relative my-2">
                                            <input
                                                className="w-full py-2 px-3 mt-2 dark:bg-zinc-700 dark:text-white rounded border focus:outline-none focus:border-green-500"
                                                type="file"
                                                {...register("files", { required: false })}
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CreateOrganizationChallengeModal;
