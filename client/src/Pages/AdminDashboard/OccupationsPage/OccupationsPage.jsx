import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    useCreateProfession,
    useOccupations,
    useUpdateProfession,
    useDeleteProfession,
} from "../../../hooks/react-query/useOccupations";
import ProfessionCard from "../../../Components/Cards/ProfessionCard";

const OccupationPage = () => {
    const { data } = useOccupations();
    const { mutate: createProfession } = useCreateProfession();
    const { mutate: updateProfession } = useUpdateProfession();
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const form = useForm();
    const onSubmit = (data) => createProfession(data.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateProfession({ name, id: editId });
            setEditId(null);
            setName("");
        }
    };

    return (
        <div>
            <div className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-11">
                        <input
                            type="text"
                            className="w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
                            placeholder="Profession name"
                            {...form.register("name", { required: true })}
                        />
                        <button
                            type="submit"
                            className="bg-zinc-800 rounded-full text-white px-4 py-2 w-1/6"
                        >
                            Add occupation
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.map((profession) => (
                        <div key={profession?._id} className="col-span-1">
                            <ProfessionCard profession={profession} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OccupationPage;
