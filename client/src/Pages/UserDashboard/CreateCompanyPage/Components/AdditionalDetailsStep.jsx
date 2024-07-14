import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { countries } from 'countries-list';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const AdditionalDetailsStep = ({ control, formData, updateFormData }) => {
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const countryList = Object.values(countries).map(country => country.name);

    const handleInputChange = (field, value) => {
        updateFormData({ ...formData, [field]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif"];

            if (!allowedTypes.includes(file.type)) {
                setErrorMessage('Only PNG, JPG, SVG, and GIF files are allowed.');
                e.target.value = null;
                return;
            } else {
                setErrorMessage('');
            }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
                <Controller
                    name="organizationLogo"
                    control={control}
                    defaultValue={formData.organizationLogo || ''}
                    rules={{ required: 'Organization Logo is required' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <label className="text-sm text-black mb-2 block dark:text-white">
                                Show us your awesome organization's logo!
                            </label>
                            <input
                                type="file"
                                accept=".png, .jpg, .svg, .gif"
                                onChange={(e) => {
                                    handleLogoChange(e);
                                    field.onChange(e.target.files);
                                }}
                                className={`w-full h-12 text-black text-sm mt-1 bg-white border file:cursor-pointer cursor-pointer 
                                file:border-0 file:py-2.5 file:h-12 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black 
                                rounded dark:bg-zinc-700 dark:text-white ${
                                    fieldState.invalid ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {fieldState.invalid && (
                                <span className="text-red-500 text-xs mt-1">
                                    {fieldState.error?.message}
                                </span>
                            )}
                            {errorMessage && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errorMessage}
                                </span>
                            )}
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
            <div className="md:col-span-1">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Drop your organization's cool website URL here!
                </label>
                <Controller
                    name="websiteURL"
                    control={control}
                    defaultValue={formData.websiteURL || ''}
                    rules={{
                        required: 'Website URL is required', pattern: {
                            value: /^((http|https|ftp):\/\/)/,
                            message: 'Invalid URL format'
                        }
                    }}
                    render={({field, fieldState}) => (
                        <div>
                            <input
                                {...field}
                                placeholder="Website URL"
                                onChange={(e) => {
                                    handleInputChange('websiteURL', e.target.value);
                                    field.onChange(e.target.value);
                                }}
                                className={`w-full h-12 p-2 border mt-1 rounded dark:text-white 
                                focus:outline-none resize-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? 'border-red-500' : 'border-gray-300'
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
            <div className="md:col-span-2">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Where is your organization's HQ located?
                </label>
                <Controller
                    name="address"
                    control={control}
                    defaultValue={formData.address || ''}
                    rules={{required: 'Address is required'}}
                    render={({field, fieldState}) => (
                        <div>
                            <input
                                {...field}
                                placeholder="Address"
                                onChange={(e) => {
                                    handleInputChange('address', e.target.value);
                                    field.onChange(e.target.value);
                                }}
                                className={`w-full h-12 p-2 border mt-1 rounded dark:text-white focus:outline-none 
                                resize-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? 'border-red-500' : 'border-gray-300'
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
            <div className="md:col-span-1">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    What's the phone number to reach your organization at?
                </label>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue={formData.phoneNumber || ''}
                    rules={{required: 'Phone Number is required'}}
                    render={({field, fieldState}) => (
                        <div>
                            <PhoneInput
                                {...field}
                                onChange={(value) => {
                                    handleInputChange('phoneNumber', value);
                                    field.onChange(value);
                                }}
                                placeholder="Phone Number"
                                className={`w-full h-12 p-2 border mt-1 mb-4 rounded dark:text-white 
                                focus:outline-none resize-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? 'border-red-500' : 'border-gray-300'
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
            <div className="md:col-span-1">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Which country is your organization based in?
                </label>
                <Controller
                    name="country"
                    control={control}
                    defaultValue={formData.country || ''}
                    rules={{required: 'Country is required'}}
                    render={({field, fieldState}) => (
                        <div>
                            <select
                                {...field}
                                onChange={(e) => {
                                    handleInputChange('country', e.target.value);
                                    field.onChange(e.target.value);
                                }}
                                className={`w-full h-12 p-2 border mb-4 rounded dark:text-white 
                                focus:outline-none resize-none dark:bg-zinc-700 ${
                                    fieldState.invalid ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Choose your country</option>
                                {countryList.map(country => (
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
    );
};

export default AdditionalDetailsStep;
