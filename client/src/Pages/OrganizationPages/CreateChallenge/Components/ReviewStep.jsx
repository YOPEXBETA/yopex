import React from "react";
import IndividualIcon from "../../../../Components/icons/IndividualIcon";

const ReviewAndSubmitStep = ({ formData }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-semibold dark:text-white">Review Your Challenge</h2>
            </div>

            <div
                className="grid grid-cols-3 grid-rows-3 ">                {/* Image Section */}
                <div className="col-span-3 row-span-1 flex items-center justify-center">
                    {formData.picturePath && formData.picturePath.length > 0 ? (
                        <img
                            src={URL.createObjectURL(formData.picturePath[0])}
                            alt="Challenge preview"
                            className="w-full h-36 object-cover border rounded-t-lg"
                        />
                    ) : (
                        <div
                            className="w-full h-40 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* Title, Objective, Deadline, and Description */}
                <div className="col-span-1 border bg-white rounded-b-lg shadow-md mr-2 row-span-2 flex flex-col gap-2 p-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{formData.title}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">Objective: {formData.objective}</p>
                    <p className="text-base text-gray-700 dark:text-gray-300">Deadline: {new Date(formData.deadline).toLocaleDateString()}</p>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Description:</h4>
                    <div className="flex-grow overflow-y-auto max-h-32">
                        <p
                            className="text-sm text-gray-600 dark:text-gray-400 break-words"
                            dangerouslySetInnerHTML={{__html: formData.description}}
                        />
                    </div>
                </div>

                {/* Paid Opportunity, Number of Users, YouTube Link */}
                <div className="col-span-1 bg-white border rounded-b-lg shadow-md mr-2 row-span-2 flex flex-col gap-2 p-2">
                    <div className="mb-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Paid Opportunity</h4>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            {formData.paid ? `Yes, $${formData.price}` : "No"}
                        </p>
                    </div>
                    <div className="mb-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Maximum Participants</h4>

                        <p className="flex text-base text-gray-700 dark:text-gray-300"><IndividualIcon/> {formData.nbruser || "N/A"}</p>
                    </div>
                    <div className="mb-2">
                        <h4 className="text-lg font-semibold text-center text-gray-800 dark:text-white">YouTube Link</h4>
                        {formData.youtubeLink ? (
                            <div className="flex justify-center">
                                <iframe
                                    width="300"
                                    height="120"
                                    src={`https://www.youtube.com/embed/${new URL(formData.youtubeLink).searchParams.get('v')}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className="text-base text-gray-700 dark:text-gray-300">No link was added</p>
                        )}
                    </div>
                </div>

                {/* Categories and Skills */}
                <div className="col-span-1 bg-white border rounded-b-lg shadow-md row-span-2 flex flex-col gap-2 p-2">

                    <div className="mb-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.categories.map((category, index) => (
                                <div
                                    className="rounded bg-gray-300 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#097969]"
                                >
                                    <p
                                        key={index}
                                        className="px-3 py-1 text-md  text-gray-800 dark:text-gray-200"
                                    >
                                        {category.label}
                                    </p>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                                <div
                                    className="rounded bg-gray-300 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-4px_0px_0px_#097969]"
                                >
                                <p
                                            key={index}
                                            className="px-3 py-1 text-md  text-gray-800 dark:text-gray-200"
                                        >
                                            {skill.label}
                                        </p>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewAndSubmitStep;
