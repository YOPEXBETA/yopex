import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const SocialMediaInfoStep = ({ control, formData, updateFormData }) => {
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [errorMessageLogo, setErrorMessageLogo] = useState("");
    const [errorMessageBanner, setErrorMessageBanner] = useState("");
    const socialMediaPlatforms = ["Facebook", "Instagram", "LinkedIn", "Twitter"];

    const urlValidationRules = {
        Facebook: {
            pattern: {
                value: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/,
                message: "Invalid Facebook URL, must start with https://facebook.com/"
            }
        },
        Instagram: {
            pattern: {
                value: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9(_)?]/,
                message: "Invalid Instagram URL, must start with https://instagram.com/"
            }
        },
        Linkedin: {
            pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9(_)?-]/,
                message: "Invalid LinkedIn URL, must start with https://linkedin.com/in/"
            }
        },
        Twitter: {
            pattern: {
                value: /^https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9(_)?]/,
                message: "Invalid Twitter URL, must start with https://x.com/"
            }
        }
    };
    const handleInputChange = (field, value) => {
        updateFormData({ ...formData, [field]: value });
    };
    const handleFileChange = (e, setSelectedFile, updateFormDataField, setErrorMessage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/svg+xml",
                "image/gif",
            ];

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
        if (formData.organizationLogo && formData.organizationLogo.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogo(reader.result);
            };
            reader.readAsDataURL(formData.organizationLogo[0]);
        }

        if (formData.organizationBanner && formData.organizationBanner.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedBanner(reader.result);
            };
            reader.readAsDataURL(formData.organizationBanner[0]);
        }
    }, [formData.organizationLogo, formData.organizationBanner]);

    return (
        <div>
        <div className="text-center mb-10">
            <h2 className="text-2xl mt-6 font-bold text-left dark:text-white">
                Social Media Information
            </h2>
        </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="organizationLogo"
                        control={control}
                        defaultValue={formData.organizationLogo || ""}
                        rules={{required: "Organization Logo is required"}}
                        render={({field, fieldState}) => (
                            <div>
                                <label className="text-sm text-black mb-2 block dark:text-white">
                                    Show us your awesome organization's logo!
                                </label>
                                <input
                                    type="file"
                                    accept=".png, .jpg, .svg, .gif"
                                    onChange={(e) => {
                                        handleFileChange(e, setSelectedLogo, (file) => updateFormData({organizationLogo: file}), setErrorMessageLogo);
                                        field.onChange(e.target.files);
                                    }}
                                    className={`w-full h-12 text-black text-sm mt-1 bg-white border file:cursor-pointer cursor-pointer 
                                file:border-0 file:py-2.5 file:h-12 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black 
                                rounded dark:bg-zinc-700 dark:text-white ${
                                        fieldState.invalid
                                            ? "border-red-500"
                                            : "border-gray-300"
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
                                            onClick={() => handleFileRemove(setSelectedLogo, (file) => updateFormData({organizationLogo: file}), field)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex
                                        items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="organizationBanner"
                        control={control}
                        defaultValue={formData.organizationBanner || ""}
                        rules={{required: "Organization Banner is required"}}
                        render={({field, fieldState}) => (
                            <div>
                                <label className="text-sm text-black mb-2 block dark:text-white">
                                    Upload your organization's banner!
                                </label>
                                <input
                                    type="file"
                                    accept=".png, .jpg, .svg, .gif"
                                    onChange={(e) => {
                                        handleFileChange(e, setSelectedBanner, (file) => updateFormData({organizationBanner: file}), setErrorMessageBanner);
                                        field.onChange(e.target.files);
                                    }}
                                    className={`w-full h-12 text-black text-sm mt-1 bg-white border file:cursor-pointer cursor-pointer 
                                file:border-0 file:py-2.5 file:h-12 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black 
                                rounded dark:bg-zinc-700 dark:text-white ${
                                        fieldState.invalid
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {fieldState.invalid && (
                                    <span className="text-red-500 text-xs mt-1">
                                {fieldState.error?.message}
                            </span>
                                )}
                                {errorMessageBanner && (
                                    <span className="text-red-500 text-xs mt-1">
                                {errorMessageBanner}
                            </span>
                                )}
                                {selectedBanner && (
                                    <div className="relative mt-2">
                                        <img
                                            src={selectedBanner}
                                            alt="Banner Preview"
                                            className="w-full h-40 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleFileRemove(setSelectedBanner, (file) => updateFormData({organizationBanner: file}), field)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex
                                        items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="text-center mt-4">
                    <h2 className="text-sm text-black block dark:text-white">
                        Provide the social links to you organization
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialMediaPlatforms.map((platform, index) => (
                        <div key={platform}>
                            <Controller
                                name={`socialMediaLinks.${index}.platform`}
                                control={control}
                                defaultValue={platform}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="hidden"
                                        value={platform}
                                    />
                                )}
                            />
                            <Controller
                                name={`socialMediaLinks.${index}.url`}
                                control={control}
                                defaultValue={formData.socialMediaLinks?.[index]?.url || ""}
                                rules={urlValidationRules[platform]}
                                render={({ field, fieldState }) => (
                                    <div>
                                        <label className="text-sm text-black mb-2 block dark:text-white">
                                            {platform} URL
                                        </label>
                                        <input
                                            {...field}
                                            onChange={(e) => {
                                                const updatedLinks = [...formData.socialMediaLinks];
                                                updatedLinks[index] = { platform, url: e.target.value };
                                                handleInputChange('socialMediaLinks', updatedLinks);
                                                field.onChange(e.target.value);
                                            }}
                                            placeholder={`Enter ${platform} URL`}
                                            className={`w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700 ${
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialMediaInfoStep;
