import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateSkill,
  useSkills,
  useUpdateSkill,
} from "../../../hooks/react-query/useSkills";
import SkillCard from "../../../Components/Cards/SkillCard";

const SkillsPage = () => {
  const { data } = useSkills();
  const { mutate } = useCreateSkill();
  const { mutate: updateSkill } = useUpdateSkill();
  const [name, setName] = useState("");

  const form = useForm();
  const onSubmit = (data) => mutate(data.name);
  const handleSubmit = (e, id) => {
    updateSkill({ name, id });
    e.preventDefault();
  };

  return (
    <div>
      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-11">
            <input
              type="text"
              className=" w-full p-3 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
              placeholder="Category name"
              {...form.register("name", { required: true })}
            />
            <button
              type="submit"
              className="bg-zinc-800 rounded-full text-white px-4 py-2 w-1/6"
            >
              Add skill
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((skill) => (
            <div key={skill?._id} className="col-span-1">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
