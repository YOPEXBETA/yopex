import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const MediaSettingsStep = ({ control, formData, updateFormData, isPaid, setIsPaid }) => {
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [errorMessageLogo, setErrorMessageLogo] = useState("");

    const handleFileChange = (e, setSelectedFile, updateFormDataField, setErrorMessage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif"];

            if (!allowedTypes.includes(file.type)) {
                setErrorMessage("Only PNG, JPG, SVG, and GIF files are allowed.");
                e.target.value = null;
                return;
            } else {
                setErrorMessage("");
            }

            reader.onloadend = () => {
                setSelectedFile(reader.result);
                updateFormDataField([file]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileRemove = (setSelectedFile, updateFormDataField, field) => {
        setSelectedFile(null);
        field.onChange(null);
        updateFormDataField(null);
    };

    useEffect(() => {
        if (formData.picturePath && formData.picturePath.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogo(reader.result);
            };
            reader.readAsDataURL(formData.picturePath[0]);
        }
    }, [formData.picturePath]);

    const handleToggleChange = () => {
        setIsPaid(!isPaid);
        if (!isPaid) {
            updateFormData({ price: ""});
        }
    };

    const handleInputChange = (field, value) => {
        updateFormData({ ...formData, [field]: value });
    };

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-left dark:text-white">
                    Media Settings
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="organizationLogo"
                    control={control}
                    defaultValue={formData.picturePath || ""}
                    rules={{required: "Challenge Banner is required"}}
                    render={({field, fieldState}) => (
                        <div>
                            <label className="text-sm text-black mb-2 block dark:text-white">
                                Show us your awesome challenge's banner!
                            </label>
                            <input
                                type="file"
                                accept=".png, .jpg, .svg, .gif"
                                onChange={(e) => {
                                    handleFileChange(e, setSelectedLogo, (file) => updateFormData({picturePath: file}), setErrorMessageLogo);
                                    field.onChange(e.target.files);
                                }}
                                className={`w-full h-12 text-black text-sm mt-1 bg-white border file:cursor-pointer cursor-pointer 
                                file:border-0 file:py-2.5 file:h-12 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black 
                                rounded dark:bg-zinc-700 dark:text-white ${
                                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-xs mt-1">
                                    {fieldState.error?.message}
                                </span>
                            )}
                            {errorMessageLogo && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errorMessageLogo}
                                </span>
                            )}
                            {selectedLogo && (
                                <div className="relative mt-2">
                                    <img
                                        src={selectedLogo}
                                        alt="Logo Preview"
                                        className="w-40 h-40 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleFileRemove(setSelectedLogo, (file) => updateFormData({picturePath: file}), field)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                />
                    <Controller
                        name="youtubeLink"
                        control={control}
                        defaultValue={formData.youtubeLink || ""}
                        rules={{
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/,
                                message: "Invalid YouTube link format",
                            },
                        }}
                        render={({field, fieldState}) => (
                            <div>
                                <label className="text-sm text-black mb-2 block dark:text-white">
                                    YouTube link for the challenge (optional)
                                </label>
                                <input
                                    type="url"
                                    {...field}
                                    onChange={(e) => {
                                        handleInputChange("youtubeLink", e.target.value);
                                        field.onChange(e.target.value);
                                    }}
                                    placeholder="YouTube Link"
                                    className={`w-full h-12 p-2 border mt-1 rounded dark:text-white focus:outline-none dark:bg-zinc-700 ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Is this challenge paid or unpaid?
                </label>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => handleToggleChange()}
                        className={`px-4 py-2 rounded-full text-white ${isPaid ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        {isPaid ? 'Paid' : 'Unpaid'}
                    </button>
                </div>
            </div>

            {isPaid && (
                <div className="space-y-4">
                    <div className="mb-6">
                        <Controller
                            name="price"
                            control={control}
                            defaultValue={formData.price || ""}
                            rules={{
                                required: "Price is required",
                                min: {value: 0, message: "Price must be a positive number"},
                            }}
                            render={({field, fieldState}) => (
                                <div>
                                    <label className="text-sm text-black mb-2 block dark:text-white">
                                        What is the price of the challenge?
                                    </label>
                                    <input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                            handleInputChange("price", e.target.value);
                                            field.onChange(e.target.value);
                                        }}
                                        placeholder="Price"
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
            )}
                </div>
        </div>
    );
};

export default MediaSettingsStep;
