import React from "react";
import { Controller } from "react-hook-form";

const BasicDetailsStep = ({ control, formData, updateFormData }) => {
    const handleInputChange = (field, value) => {
        updateFormData({ ...formData, [field]: value });
    };
    const isDateInThePast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to the start of the day
        return new Date(date) < today;
    };
console.log('form', formData)
    return (
        <div>
            <div className="text-center mb-3">
                <h2 className="text-2xl mt-12 font-bold text-left dark:text-white">
                    Basic Information
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="md:col-span-1">
                    <div className="mb-4">
                        <label className="text-sm text-black mb-2 block dark:text-white">
                            What is the title of your challenge?
                        </label>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={formData.title || ""}
                            rules={{ required: "Challenge title is required" }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        onChange={(e) => {
                                            handleInputChange("title", e.target.value);
                                            field.onChange(e.target.value);
                                        }}
                                        placeholder="Challenge Title"
                                        className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                            fieldState.invalid ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {fieldState.invalid && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {fieldState.error?.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm text-black mb-2 block dark:text-white">
                            Select the objective of your challenge
                        </label>
                        <Controller
                            name="objective"
                            control={control}
                            defaultValue={formData.objective || ""}
                            rules={{ required: "Objective is required" }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <select
                                        {...field}
                                        onChange={(e) => {
                                            handleInputChange("objective", e.target.value);
                                            field.onChange(e.target.value);
                                        }}
                                        className={`w-full p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                            fieldState.invalid ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">Select a sector...</option>
                                        <option value="Recrutement">Recrutement</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Innovation">Innovation</option>
                                    </select>
                                    {fieldState.invalid && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {fieldState.error?.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="mb-4">
                        <label className="text-sm text-black mb-2 block dark:text-white">
                            Deadline
                        </label>
                        <Controller
                            name="deadline"
                            control={control}
                            defaultValue={formData.deadline || ""}
                            rules={{ required: "Deadline is required",
                                validate: {
                                    notInThePast: (value) =>
                                        value && !isDateInThePast(value) ? true : "Deadline cannot be in the past",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        type="date"
                                        {...field}
                                        onChange={(e) => {
                                            handleInputChange("deadline", e.target.value);
                                            field.onChange(e.target.value);
                                        }}
                                        className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                            fieldState.invalid ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {fieldState.invalid && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {fieldState.error?.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    <div className="mb-6">
                        <Controller
                            name="nbruser"
                            control={control}
                            defaultValue={formData.nbruser || ""}
                            rules={{
                                required: "Participants number is required",
                                min: { value: 0, message: "Participants number must be a positive number" },
                            }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <label className="text-sm text-black mb-2 block dark:text-white">
                                        How many participants do you expect?
                                    </label>
                                    <input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                            handleInputChange("nbruser", e.target.value);
                                            field.onChange(e.target.value);
                                        }}
                                        placeholder="Participants number"
                                        className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
                                            fieldState.invalid ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {fieldState.invalid && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {fieldState.error?.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Can you describe your challenge?
                </label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={formData.description || ""}
                    rules={{
                        required: "Challenge Description is required",
                        minLength: {
                            value: 100,
                            message: "Description must be at least 100 characters",
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <textarea
                                {...field}
                                onChange={(e) => {
                                    handleInputChange("description", e.target.value);
                                    field.onChange(e.target.value);
                                }}
                                placeholder="Challenge Description"
                                className={`w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-sm mt-1">
                                    {fieldState.error?.message}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default BasicDetailsStep;
