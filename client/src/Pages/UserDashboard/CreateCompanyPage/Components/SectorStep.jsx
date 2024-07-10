import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const SectorStep = ({ control, formData }) => {
    return (
            <div className="md:col-span-5">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Sector of Activity
                </label>
                <Controller
                    name="sectorOfActivity"
                    control={control}
                    defaultValue={formData.sectorOfActivity || ''}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <input
                            {...field}
                            required={true}
                            placeholder="Sector of Activity"
                            className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>);
};

export default SectorStep;
