import { useEditChallenge } from "../../../hooks/react-query/useChallenges";
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";

export const EditChallengeModal = ({ open, handleClose, challenge }) => {
  const { mutate } = useEditChallenge(challenge._id);
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const [formData, setFormData] = useState({
    title: challenge.title,
    description: challenge.description,
    price: challenge.price,
    nbruser: challenge.nbruser,
    category: challenge.category,
    RecommendedSkills: challenge.RecommendedSkills,
  });

  const handleCategoryChange = (_, value) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    
    // Update the corresponding field in formData based on fieldName
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSkillsChange = (_, value) => {
    setFormData({
      ...formData,
      RecommendedSkills: value,
    });
  };

  const handleEdit = () => {

    mutate({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      nbruser:formData.nbruser,
      category: formData.category,
      RecommendedSkills: formData.RecommendedSkills
    });
    handleClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-96 sm:p-6 lg:w-[40rem]">
          <div>
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Edit "{challenge.title}"
            </h2>
            <div className="mt-2">
            <input
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
            type="text"
            placeholder={formData.title}
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange(e, 'title')}
            required
          />
          <textarea
            className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
          <input
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
            type="text"
            placeholder={formData.price}
            name="price"
            value={formData.price}
            onChange={(e) => handleInputChange(e, 'price')}
            required
          />
          <input
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
            type="text"
            placeholder={formData.nbruser}
            name="nbruser"
            value={formData.nbruser}
            onChange={(e) => handleInputChange(e, 'nbruser')}
          />
              {itCategory &&(
              <Autocomplete
                multiple
                id="tags-outlined"
                options={itCategory }
                getOptionLabel={(option) => option}
                value={formData.category}
                onChange={(_, value) => handleCategoryChange(_, value)}
                filterOptions={(options, state) =>
                  options.filter((option) =>
                    option.toLowerCase().includes(state.inputValue.toLowerCase())
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Update Categories"
                  />
                )}
              />)}
              { itSkills && (
              <Autocomplete
                className="mt-2"
                multiple
                id="tags-outlined"
                options={itSkills }
                getOptionLabel={(option) => option}
                value={formData.RecommendedSkills}
                onChange={(_, value) => handleSkillsChange(_, value)}
                filterOptions={(options, state) =>
                  options.filter((option) =>
                    option.toLowerCase().includes(state.inputValue.toLowerCase())
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Update Recommended Skills"
                  />
                )}
              />)}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500 hover:bg-gray-200"
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  id="btn1"
                  className="px-6 py-2 text-white rounded-md border-2 bg-green-500 hover:bg-green-600"
                  onClick={handleEdit}
                >
                  Edit your Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};