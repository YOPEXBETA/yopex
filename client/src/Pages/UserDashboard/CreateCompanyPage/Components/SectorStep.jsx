import React from 'react';
import { Controller } from 'react-hook-form';
import { useGetAllSectors } from '../../../../hooks/react-query/useCompany';

const SectorStep = ({ control, formData }) => {
    const { data: sectorsData, isLoading: sectorsLoading, isError: sectorsError } = useGetAllSectors();


    return (
        <div className="md:col-span-5">
            <label className="text-sm text-black mb-2 block dark:text-white">
                Sector of Activity
            </label>
            <Controller
                name="sectorOfActivity"
                control={control}
                defaultValue={formData.sectorOfActivity || ''}
                render={({ field }) => (
                    <select
                        {...field}
                        className="w-full p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                    >
                        <option value="">Select a sector...</option>
                        {sectorsData?.map((sector) => (
                            <option key={sector._id} value={sector.name}>
                                {sector.name}
                            </option>
                        ))}
                    </select>
                )}
            />
            {sectorsLoading && <p className="text-gray-500">Loading sectors...</p>}
            {sectorsError && <p className="text-red-500">Error fetching sectors.</p>}
        </div>
    );
};

export default SectorStep;
