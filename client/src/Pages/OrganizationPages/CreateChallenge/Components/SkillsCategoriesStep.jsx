import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useCategories } from "../../../../hooks/react-query/useCategories";
import { useSkills } from "../../../../hooks/react-query/useSkills";

const SkillCategoriesStep = ({ control, formData, updateFormData }) => {
    const { data: skills = [], isLoading: isLoadingSkills } = useSkills();
    const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
    const [skillsOptions, setSkillsOptions] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);

    useEffect(() => {
        if (skills) {
            setSkillsOptions(
                skills.map((skill) => ({
                    label: skill.name,
                    value: skill._id,
                }))
            );
        }
    }, [skills]);

    useEffect(() => {
        if (categories) {
            setCategoriesOptions(
                categories.map((category) => ({
                    label: category.name,
                    value: category._id,
                }))
            );
        }
    }, [categories]);

    if (isLoadingSkills || isLoadingCategories) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-left dark:text-white">
                    Skills & Categories
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-black mb-2 mt-6 block dark:text-white">
                        Select Skills
                    </label>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <div className="w-full dark:bg-zinc-700">
                                <Select
                                    isMulti
                                    className="my-react-select-container"
                                    classNamePrefix="my-react-select"
                                    id="skills-select"
                                    options={skillsOptions}
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions);
                                        // Update formData directly
                                        updateFormData({ ...formData, skills: selectedOptions });
                                    }}
                                    value={value}
                                    placeholder="Select Skills"
                                />
                            </div>
                        )}
                    />
                </div>

                <div>
                    <label className="text-sm text-black mb-2 mt-6 block dark:text-white">
                        Select Categories
                    </label>
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <div className="w-full dark:bg-zinc-700">
                                <Select
                                    isMulti
                                    className="my-react-select-container"
                                    classNamePrefix="my-react-select"
                                    id="categories-select"
                                    options={categoriesOptions}
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions);
                                        // Update formData directly
                                        updateFormData({ ...formData, categories: selectedOptions });
                                    }}
                                    value={value}
                                    placeholder="Select Categories"
                                />
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillCategoriesStep;
