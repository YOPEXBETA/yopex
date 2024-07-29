import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "../../../../../countries.json";
import {useEditOrganization} from "../../../../../hooks/react-query/useCompany";
import {useFileUpload} from "../../../../../hooks/react-query/useUsers";
import Card from "../../../../../Components/Cards";
import "react-phone-number-input/style.css";

const EditOrganization = ({ extra }) => {
    const dispatch = useDispatch();
    const fileUploadMutation = useFileUpload();
    const { currentOrganization } = useSelector(state => state.organization);
    const [logoPreview, setLogoPreview] = useState(currentOrganization?.organizationLogo || "");
    const [bannerPreview, setBannerPreview] = useState(currentOrganization?.organizationBanner || "");
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    const { mutate: updateOrganization, isLoading } = useEditOrganization(currentOrganization?._id);
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            organizationName: currentOrganization?.organizationName,
            organizationDescription: currentOrganization?.organizationDescription,
            country: currentOrganization?.country,
            PhoneNumber: currentOrganization?.PhoneNumber,
            address: currentOrganization?.address,
            websiteURL: currentOrganization?.websiteURL,
            sectorOfActivity: currentOrganization?.sectorOfActivity,
        },
    });

    const countryList = countries?.map((country) => country.name.common);

    const onSubmit = async (data) => {
        try {
            const {
                organizationName,
                organizationDescription,
                country,
                PhoneNumber,
                address,
                websiteURL,
                sectorOfActivity
            } = data;

            let logoUrl = currentOrganization?.organizationLogo || "";
            let bannerUrl = currentOrganization?.organizationBanner || "";

            // Check if organizationLogo has files
            if (logoFile) {
                const logoFormData = new FormData();
                logoFormData.append("file", logoFile);
                const logoData = await fileUploadMutation.mutateAsync(logoFormData);
                logoUrl = logoData?.data?.downloadURL || '';
            }

            // Check if organizationBanner has files
            if (bannerFile) {
                const bannerFormData = new FormData();
                bannerFormData.append("file", bannerFile);
                const bannerData = await fileUploadMutation.mutateAsync(bannerFormData);
                bannerUrl = bannerData?.data?.downloadURL || '';
            }
            console.log('logo', logoUrl)
            console.log('bannerUrl', bannerUrl)

            await updateOrganization({
                organizationName,
                organizationDescription,
                country,
                PhoneNumber,
                address,
                websiteURL,
                sectorOfActivity,
                organizationLogo: logoUrl,
                organizationBanner: bannerUrl,
            });
        } catch (error) {
            console.error("Error updating organization:", error);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
            setLogoFile(file);
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setBannerPreview(previewUrl);
            setBannerFile(file);
        }
    };



    return (
        <Card extra={`p-8 ${extra}`}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative grid grid-cols-1 gap-3"
            >
                <div className="relative">
                    {/* Banner */}
                    <div className="relative">
                        {bannerPreview ? (
                            <img
                                alt="banner"
                                src={bannerPreview}
                                className="w-full h-28 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                                <FaCamera className="w-12 h-12 text-gray-400"/>
                            </div>
                        )}
                        {/* Banner Input */}
                        <label
                            htmlFor="bannerInput"
                            className="absolute bottom-1.5 right-1.5 p-2 bg-green-500 rounded-full text-white cursor-pointer"
                        >
                            <input
                                id="bannerInput"
                                hidden
                                accept="image/*"
                                type="file"
                                {...register("organizationBanner")}
                                onChange={handleBannerChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <FaCamera className="w-4 h-4"/>
                        </label>
                    </div>

                    {/* Logo and Input */}
                    <div className="absolute left-4 top-14 flex items-center gap-4 z-10">
                        <div className="relative w-28 h-28">
                            {logoPreview ? (
                                <img
                                    alt="logo"
                                    src={logoPreview}
                                    className="rounded-full object-cover border-2 w-28 h-28"
                                />
                            ) : (
                                <div
                                    className="w-28 h-28 bg-gray-200 rounded-full border-2 flex items-center justify-center">
                                    <FaCamera className="w-12 h-12 text-gray-400"/>
                                </div>
                            )}
                            <label
                                htmlFor="logoInput"
                                className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full text-white cursor-pointer"
                            >
                                <input
                                    id="logoInput"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    {...register("organizationLogo")}
                                    onChange={handleLogoChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <FaCamera className="w-4 h-4"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <button
                        className={`${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
                        } text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting" : "Save"}
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                        <label htmlFor="organizationName" className="block dark:text-gray-300">
                            Organization Name
                        </label>
                        <input
                            id="organizationName"
                            type="text"
                            placeholder="Organization name"
                            className="w-full border border-gray-300 dark:bg-zinc-700 mt-1 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 bg-white"
                            {...register("organizationName")}
                        />
                    </div>
                    <div className="col-span-1">
                         <label className="dark:text-gray-300">Organization Description</label>
                        <textarea
                            id="organizationDescription"
                            placeholder="Description"
                            rows={6}
                            className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
                            {...register("organizationDescription")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="dark:text-gray-300">Website URL</label>
                        <input
                            type="text"
                            placeholder="Website URL"
                            className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
                            {...register("websiteURL")}
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="PhoneNumber" className="block dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            id="PhoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
                            {...register("PhoneNumber")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="dark:text-gray-300">Country</label>
                        <select
                            className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
                            defaultValue={currentOrganization?.country}
                            {...register("country")}
                        >
                            <option value="">Choose your country</option>
                            {countryList.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="dark:text-gray-300">Address</label>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
                            {...register("address")}
                        />
                    </div>
                </div>
            </form>
        </Card>

    );
};

export default EditOrganization;

