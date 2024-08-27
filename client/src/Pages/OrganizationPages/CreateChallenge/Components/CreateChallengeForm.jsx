import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {FaCheck, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useSelector } from "react-redux";
import { useFileUpload } from "../../../../hooks/react-query/useUsers";
import useStep from "../../../../hooks/react-query/useStep";
import ChallengeTypeStep from "./ChallengeTypeStep";
import BasicDetailsStep from "./BasicDetailsStep";
import MediaSettingsStep from "./MediaSettingsStep";
import SkillCategoriesStep from "./SkillsCategoriesStep";
import ReviewAndSubmitStep from "./ReviewStep";
import { useCreateOrganizationChallenge} from "../../../../hooks/react-query/useChallenges";
import {useCreateTeamChallenge} from "../../../../hooks/react-query/useTeamChallenge";

const CreateChallengeForm = () => {
    const { step, next, back } = useStep(1);
    const { handleSubmit, control, reset, watch } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const fileUploadMutation = useFileUpload();
    const createTeamChallenge = useCreateTeamChallenge();
    const createOrganizationChallenge = useCreateOrganizationChallenge();
    const { currentOrganization } = useSelector(state => state.organization);

    const [challengeTypeS, setChallengeTypeS] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        objective: "",
        picturePath: [],
        categories: [],
        skills: [],
        deadline: new Date(),
        paid: false,
        price: 0,
        youtubeLink: "",
        nbruser: 0,
    });

    const updateFormData = (data) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...data,
        }));
        console.log("Updated formData:", formData);
    };

    const handleType = (type) => {
        setChallengeTypeS(type);
        next(); // Move to the next step after setting organization type
    };

    const handleNext = (data) => {
        updateFormData(data);
        next(); // Move to the next step
    };

    const handlePrevious = () => {
        back();
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            updateFormData(data);
            const skillsIds = formData.skills.map(skill => skill.value);
            const categoriesIds = formData.categories.map(category => category.value);

            let updatedData = { ...formData, skills: skillsIds, categories: categoriesIds };

            let banner = "";
            if (formData.picturePath && formData.picturePath.length > 0) {
                const bannerFormData = new FormData();
                bannerFormData.append("file", formData.picturePath[0]);
                bannerFormData.append("type", "organizationLogo");
                const response = await fileUploadMutation.mutateAsync(bannerFormData);
                banner = response.data.downloadURL;
            }

            const {
                title,
                description,
                objective,
                categories,
                skills,
                deadline,
                paid,
                price,
                youtubeLink,
                nbruser,
            } = updatedData;

            if (challengeTypeS === "Team") {
                const createTeamChallengeResponse = await createTeamChallenge.mutateAsync({
                    title,
                    description,
                    picturePath: banner || "",
                    objective,
                    categories: categoriesIds,
                    skills: skillsIds,
                    deadline,
                    paid,
                    price,
                    youtubeLink,
                    teamSize : nbruser,
                    organizationId: currentOrganization?._id,
                    userId: user?._id
                });

                console.log("Create team challenge response:", createTeamChallengeResponse);
            } else if (challengeTypeS === "Individual") {
                const createOrganizationChallengeResponse = await createOrganizationChallenge.mutateAsync({
                    challengeData: {
                        title,
                        description,
                        picturePath: banner || "",
                        objective,
                        categories: categoriesIds,
                        skills: skillsIds,
                        deadline,
                        paid,
                        price,
                        youtubeLink,
                        nbruser,
                    },
                    paid,
                    objective,
                    organizationId: currentOrganization?._id,
                    userId: user?._id
                });

                console.log("Create organization challenge response:", createOrganizationChallengeResponse);
            }

        } catch (error) {
            console.error("Error creating challenge:", error);
        } finally {
            setLoading(false);
            navigate(`/organization/${currentOrganization?._id}/challenges`);
        }
    };


    const isStepCompleted = (stepNumber) => {
        return step > stepNumber;
    };
    return (
        <div className="flex flex-col h-full w-full p-8"> {/* Full height and width */}
            <ol className="flex items-center justify-between w-full text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                {[...Array(5).keys()].map((index) => (
                    <li
                        key={index}
                        className={`flex md:w-full items-center ${isStepCompleted(index + 1) ? 'text-blue-600 dark:text-blue-500' : ''} ${index < 4 ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-3  dark:after:border-gray-700' : ''}`}
                    >
            <span
                className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
            >
                {isStepCompleted(index + 1) ? (
                    <FaCheck className="text-green-600"/>
                ) : (
                    <span className="mr-2">{index + 1}</span>
                )}
                {index === 0 && 'Challenge Type'}
                {index === 1 && 'Basic Details'}
                {index === 2 && 'Media Settings'}
                {index === 3 && 'Skills & Categories'}
                {index === 4 && 'Review & Submit'}
            </span>
                    </li>
                ))}
            </ol>

            <div className="flex flex-col flex-grow mt-8"> {/* Flex container */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    {step === 1 && <ChallengeTypeStep onNext={handleType}/>}
                    {step === 2 && (
                        <div>
                            <BasicDetailsStep
                                control={control}
                                formData={formData}
                                updateFormData={updateFormData}
                            />
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <MediaSettingsStep
                                control={control}
                                formData={formData}
                                updateFormData={updateFormData}
                                isPaid={formData.paid}
                                setIsPaid={(paid) => updateFormData({paid})}
                            />
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <SkillCategoriesStep
                                control={control}
                                formData={formData}
                                updateFormData={updateFormData}
                            />
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <ReviewAndSubmitStep
                                formData={formData}
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        {/* Your form fields and content */}
                    </div>
                    <div className="mt-8 flex gap-4 items-start">
                        {step > 1 && (
                            <div className="cursor-pointer" onClick={handlePrevious}>
                                <button
                                    type="button"
                                    className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black transition bg-gray-100 rounded-full shadow ripple hover:shadow-lg hover:bg-gray-200 focus:outline-none"
                                >
                                    <div className="flex items-center justify-between flex-1 gap-4">
                                        <FaChevronLeft/>
                                        <span className="text-lg font-medium dark:text-white">
                                            Previous
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}
                        {step !== 1 && step !== 5 && (
                            <div className="cursor-pointer" onClick={handleSubmit(handleNext)}>
                                <button
                                    type="button"
                                    className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white transition bg-black rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-black"
                                >
                                    <div className="flex items-center justify-between flex-1 gap-4">
                                        <span className="text-lg font-medium text-white">
                                            Next
                                        </span>
                                        <FaChevronRight/>
                                    </div>
                                </button>
                            </div>
                        )}
                        {step === 5 && (
                            <button
                                type="submit"
                                className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white transition bg-green-500 rounded-full shadow ripple hover:shadow-lg hover:bg-green-200 focus:outline-none"
                            >
                                <div className="flex items-center justify-between flex-1 gap-4">
                                    <span className="text-lg font-medium dark:text-white">
                                        Submit
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-center">
                            <LoadingSpinner/>
                        </div>
                        <h1 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
                            Submitting your challenge ...
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateChallengeForm;
