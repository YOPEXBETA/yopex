import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { countries } from 'countries-list';

const AdditionalDetailsStep = ({ control, formData, updateFormData }) => {
    const [selectedLogo, setSelectedLogo] = useState(null);
    const countryList = Object.values(countries).map(country => country.name);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogo(reader.result);
                updateFormData({ organizationLogo: [file] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoRemove = (field) => {
        setSelectedLogo(null);
        field.onChange(null);
        updateFormData({ organizationLogo: null });
    };

    useEffect(() => {
        if (formData.organizationLogo && formData.organizationLogo.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogo(reader.result);
            };
            reader.readAsDataURL(formData.organizationLogo[0]);
        }
    }, [formData.organizationLogo]);

    return (
        <div>
            <div className="md:col-span-5">
                <Controller
                    name="organizationLogo"
                    control={control}
                    defaultValue={formData.organizationLogo || ''}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <label className="text-sm text-black mb-2 block dark:text-white">
                                Organization Logo
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    handleLogoChange(e);
                                    field.onChange(e.target.files);
                                }}
                                className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded dark:bg-zinc-700 dark:text-white"
                            />
                            <p className="text-xs text-gray-400 mt-2">
                                PNG, JPG, SVG, and GIF are Allowed.
                            </p>
                            {selectedLogo && (
                                <div className="relative mt-2">
                                    <img
                                        src={selectedLogo}
                                        alt="Logo Preview"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleLogoRemove(field)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>
            <div className="md:col-span-5">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Website URL
                </label>
                <Controller
                    name="websiteURL"
                    control={control}
                    defaultValue={formData.websiteURL || ''}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Website URL"
                            className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>
            <div className="md:col-span-5">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Address
                </label>
                <Controller
                    name="address"
                    control={control}
                    defaultValue={formData.address || ''}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Address"
                            className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>
            <div className="md:col-span-2">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Phone Number
                </label>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue={formData.phoneNumber || ''}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Phone Number"
                            className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>
            <div className="md:col-span-2">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Country
                </label>
                <Controller
                    name="country"
                    control={control}
                    defaultValue={formData.country || ''}
                    render={({ field }) => (
                        <select
                            {...field}
                            className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        >
                            <option value="">Choose your country</option>
                            {countryList.map(country => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>
        </div>
    );
};

export default AdditionalDetailsStep;
