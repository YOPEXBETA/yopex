import React from "react";
import { Controller } from "react-hook-form";
import { countries } from "countries-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const AdditionalDetailsStep = ({ control, formData, updateFormData }) => {
    const countryList = countries ? Object.values(countries).map((country) => country.name) : [];

    const handleInputChange = (field, value) => {
        updateFormData({ ...formData, [field]: value });
    };

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-2xl mt-6 font-bold text-left dark:text-white">
                    Additional Information
                </h2>
            </div>
    <div className="grid grid-cols-1 gap-4">
        {/* Row 1: Country and Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="text-sm text-black mb-2 block dark:text-white">
                        Where is your organization's HQ located?
                    </label>
                    <Controller
                        name="address"
                        control={control}
                        defaultValue={formData.address || ""}
                        rules={{ required: "Address is required" }}
                        render={({ field, fieldState }) => (
                            <div>
                                <input
                                    {...field}
                                    placeholder="Address"
                                    onChange={(e) => {
                                        handleInputChange("address", e.target.value);
                                        field.onChange(e.target.value);
                                    }}
                                    className={`w-full h-12 p-2 border  rounded dark:text-white focus:outline-none 
                              resize-none dark:bg-zinc-700 ${
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
                            </div>
                        )}
                    />
                </div>
                <div>
                    <label className="text-sm text-black mb-2 block dark:text-white">
                        Which country is your organization based in?
                    </label>
                    <Controller
                        name="country"
                        control={control}
                        defaultValue={formData.country || ""}
                        rules={{ required: "Country is required" }}
                        render={({ field, fieldState }) => (
                            <div>
                                <select
                                    {...field}
                                    onChange={(e) => {
                                        handleInputChange("country", e.target.value);
                                        field.onChange(e.target.value);
                                    }}
                                    className={`w-full h-12 p-2 border mb-4 rounded dark:text-white 
                              focus:outline-none resize-none dark:bg-zinc-700 ${
                                        fieldState.invalid
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Choose your country</option>
                                    {countryList.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
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
            {/* Row 2: Website URL and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-black mb-2 block dark:text-white">
                        Drop your organization's cool website URL here!
                    </label>
                    <Controller
                        name="websiteURL"
                        control={control}
                        defaultValue={formData.websiteURL || ""}
                        rules={{
                            required: "Website URL is required",
                            pattern: {
                                value: /^((http|https|ftp):\/\/)/,
                                message: "Invalid URL format",
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <div>
                                <input
                                    {...field}
                                    placeholder="Website URL"
                                    onChange={(e) => {
                                        handleInputChange("websiteURL", e.target.value);
                                        field.onChange(e.target.value);
                                    }}
                                    className={`w-full h-12 p-2 border rounded dark:text-white 
                              focus:outline-none resize-none dark:bg-zinc-700 ${
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
                            </div>
                        )}
                    />
                </div>
                <div>
                    <label className="text-sm text-black mb-2 block dark:text-white">
                        What's the phone number to reach your organization at?
                    </label>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={formData.phoneNumber || ""}
                        rules={{ required: "Phone Number is required" }}
                        render={({ field, fieldState }) => (
                            <div>
                                <PhoneInput
                                    {...field}
                                    onChange={(value) => {
                                        handleInputChange("phoneNumber", value);
                                        field.onChange(value);
                                    }}
                                    placeholder="Phone Number"
                                    className={`w-full h-12 p-2 border mt-1 mb-4 rounded dark:text-white 
                              focus:outline-none resize-none dark:bg-zinc-700 ${
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
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
        </div>

    );
};

export default AdditionalDetailsStep;
