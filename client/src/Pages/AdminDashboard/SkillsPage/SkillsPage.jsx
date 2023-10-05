import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateSkill,
  useDeleteSkill,
  useSkills,
  useUpdateSkill,
} from "../../../hooks/react-query/useSkills";
import { MdCode } from "react-icons/md";
import { useGetPayments } from "../../../hooks/react-query/useUsers";

const SkillsPage = () => {
  const { data } = useSkills();
  const { mutate } = useCreateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();
  const { mutate: updateSkill } = useUpdateSkill();
  const [name, setName] = React.useState("");
  

  const form = useForm();
  const onSubmit = (data) => mutate(data.name);
  const handleSubmit = (e, id) => {
    
    updateSkill({ name, id });
    e.preventDefault();
  };

  return (
    <div>
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
            Add skill{" "}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map(
          (badgeData) =>
            badgeData && (
              <div key={badgeData._id} className="col-span-1">
                <div className="bg-white shadow-md p-4 rounded-md">
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="text-green-500 text-lg">
                      <MdCode />
                    </div>
                    <p className="text-lg text-zinc-800 truncate w-34 uppercase font-bold">
                      {badgeData.name}
                    </p>
                  </div>

                  <div>
                    <form onSubmit={(e) => handleSubmit(e, badgeData._id)}>
                      <input
                        type="text"
                        placeholder="Update"
                        name="name"
                        
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 text-[#000000] bg-gray-100"
                      />
                    </form>

                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                        onClick={(e) => handleSubmit(e, badgeData._id)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => {deleteSkill(badgeData.name)}}
                        className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SkillsPage;
