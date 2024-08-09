import React, {useEffect, useRef, useState} from "react";
import "react-quill/dist/quill.snow.css";

import Select from "react-select";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSkills } from "../../hooks/react-query/useSkills";
import {
    useCreateJob,
    useJobTypes,
    useOfferTypes,
} from "../../hooks/react-query/useJobs";
import NotFound from "../../assets/images/NotFound.png";
import Modal from ".";
import CloseIcon from "../icons/CloseIcon";
import InfoIcon from "../icons/InfoIcon";
import Editor from "../Editor";

const CreateOrganizationJobOfferModal = ({ open, handleClose }) => {
    const { currentOrganization } = useSelector(state => state.organization);
    const { data: skills } = useSkills();
    const [content, setContent] = useState("");
    const modalRef = useRef(null);

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
    const { mutate } = useCreateJob();

    const onSubmit = (JobData) => {
        const modifiedJobData = {
            ...JobData,
            description: content,
            skills: JobData?.skills?.map((skill) => skill.value),
        };
        mutate({ organizationId: currentOrganization._id, JobData: modifiedJobData });
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
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
        >
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
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
                            data-modal-hide="defaultModal"
                        >
                            <CloseIcon width={4} height={4} />
                        </button>
                    </div>
                    <hr />
                    <div class="m-8 max-w-[550px] mx-auto space-y-6 px-5 md:px-0">
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
                                            <option value="">Choose an offer type</option>
                                            <option value="On-site">On-site</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Remote">Remote</option>
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
                                                        required={false}
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

export default CreateOrganizationJobOfferModal;
