import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const NameDescriptionStep = ({ control, formData }) => {
    return (
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="md:col-span-5">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Organization Name
                </label>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={formData.name || ''}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <input
                            {...field}
                            required={true}
                            placeholder="Organization Name"
                            className="w-full h-10 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>
            <div className="md:col-span-5">
                <label className="text-sm text-black mb-2 block dark:text-white">
                    Organization Description
                </label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={formData.description || ''}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder="Organization Description"
                            className="w-full h-40 p-2 border mt-1 rounded dark:text-white focus:outline-none resize-none dark:bg-zinc-700"
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default NameDescriptionStep;
