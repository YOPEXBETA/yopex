import React, { useState } from "react";
import { useUpdateSkill } from "../../hooks/react-query/useSkills";

const EditSkillModal = ({ onClose, initialValue, skill }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const { mutate: updateSkill } = useUpdateSkill();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <label className="block mb-2 font-medium">Edit Skill Name:</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => updateSkill({ name: inputValue, id: skill._id })}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSkillModal;
