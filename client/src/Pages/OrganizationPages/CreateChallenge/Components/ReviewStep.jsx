import React from "react";

const ReviewAndSubmitStep = ({ formData }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold dark:text-white">Review Your Challenge</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {/* Image Section */}
                <div className="col-span-1 flex items-center justify-center">
                    {formData.picturePath && formData.picturePath.length > 0 ? (
                        <img
                            src={URL.createObjectURL(formData.picturePath[0])}
                            alt="Challenge preview"
                            className="w-full h-auto rounded-lg shadow-md object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* Title, Objective, Deadline, and Paid Opportunity */}
                <div className="col-span-1 space-y-4">
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Title</h4>
                        <p className="text-gray-900 dark:text-gray-100">{formData.title}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Objective</h4>
                        <p className="text-gray-900 dark:text-gray-100">{formData.objective}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Deadline</h4>
                        <p className="text-gray-900 dark:text-gray-100">
                            {new Date(formData.deadline).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Paid Opportunity</h4>
                        <p className="text-gray-900 dark:text-gray-100">
                            {formData.paid ? `Yes, $${formData.price}` : "No"}
                        </p>
                    </div>
                </div>

                {/* Description, Categories, Skills, Number of Users, and YouTube Link */}
                <div className="col-span-1 space-y-4">
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Description</h4>
                        <p className="text-sm h-20 break-words overflow-ellipsis overflow-hidden dark:text-gray-100">{formData.description}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Categories</h4>
                        <p className="text-gray-900 dark:text-gray-100">
                            {formData.categories.map((category) => category.label).join(", ")}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Skills</h4>
                        <p className="text-gray-900 dark:text-gray-100">
                            {formData.skills.map((skill) => skill.label).join(", ")}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Number of Users</h4>
                        <p className="text-gray-900 dark:text-gray-100">{formData.nbruser || "N/A"}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">YouTube Link</h4>
                        <p className="text-gray-900 dark:text-gray-100">{formData.youtubeLink}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewAndSubmitStep;
