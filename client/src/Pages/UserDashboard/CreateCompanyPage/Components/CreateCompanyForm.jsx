import React, {useState} from 'react';
import OrganizationTypeStep from './OrganizationTypeStep';
import NameDescriptionStep from './NameDescriptionStep';
import AdditionalDetailsStep from './AdditionalDetailsStep';
import VerifyDocumentsStep from './VerifyDocumentsStep';
import {useForm} from 'react-hook-form';
import useStep from '../../../../hooks/react-query/useStep';
import {useFileUpload, useUserById} from "../../../../hooks/react-query/useUsers";
import {useCreateCompany, useSendInvitation} from "../../../../hooks/react-query/useCompany";
import {useSelector} from "react-redux";
import Card from "../../../../Components/Cards";
import InvitationsStep from "./InviteMembersStep";
import LogoPlaceholder from '../../../../assets/images/LogoPlaceholder.jpg';
import { FaGlobe, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import PreviewCard from "./PreviewCard";


const CreateCompanyForm = () => {
    const {step, next, back} = useStep(1);
    const {handleSubmit, control, reset, watch} = useForm();
    const fileUploadMutation = useFileUpload();
    const {mutateAsync: createCompany, isLoading} = useCreateCompany();
    const sendInvitationMutation = useSendInvitation();
    const {user} = useSelector((state) => state.auth);
    const {data: userProfile} = useUserById(user._id);
    const navigate = useNavigate();

    const [organizationTypeS, setOrganizationTypeS] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        organizationType: '',
        sectorOfActivity: '',
        organizationLogo: [],
        websiteURL: '',
        address: '',
        phoneNumber: '',
        country: '',
        organizationDocument: [],
        invitations: [], // Array to store invitations
    });
    const uploadedFile = watch("organizationLogo");
    const uploadedFiledoc = watch("organizationDocument");

    // Handlers to update form data
    const updateFormData = (data) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...data,
        }));
        console.log('Updated formData:', formData);
    };


    const handleType = (type) => {
        setOrganizationTypeS(type);
        console.log('type', organizationTypeS)
        next(); // Move to the next step after setting organization type
    };

    const handleNext = (data) => {
        console.log('type', organizationTypeS)
        updateFormData(data);
        next(); // Move to the next step
    };

    const handlePrevious = () => {
        back(); // Move to the previous step
    };

    const onSubmit = async (data) => {
        try {
            updateFormData(data); // Update formData state with current form data
            let updatedData = {...formData};
            // Handle file uploads
            let logo = '';
            let doc = '';
            if (formData.organizationLogo && formData.organizationLogo.length > 0) {
                const logoFormData = new FormData();
                logoFormData.append('file', formData.organizationLogo[0]);
                logoFormData.append('type', 'organizationLogo');
                const response = await fileUploadMutation.mutateAsync(logoFormData);
                logo = response.data.downloadURL;
            }

            if (formData.organizationDocument && formData.organizationDocument.length > 0) {
                const docFormData = new FormData();
                docFormData.append('file', formData.organizationDocument[0]);
                docFormData.append('type', 'organizationDocument');
                const response = await fileUploadMutation.mutateAsync(docFormData);
                doc = response.data.downloadURL;
            }
            const {
                name, description, organizationType,
                sectorOfActivity, address, phoneNumber,
                websiteURL, country
            } = updatedData;

            // Call createCompany mutation
            const createCompanyResponse = await createCompany({
                userId: user._id,
                organizationName: name,
                organizationDescription: description,
                organizationLogo: logo || '', // Ensure it's a string
                organizationDocument: doc || '', // Ensure it's a string
                organizationType: organizationTypeS,
                sectorOfActivity,
                address,
                phoneNumber, // Check the correct field name based on backend expectations
                websiteURL,
                country,
            });

            console.log('Create company response:', createCompanyResponse); // Log entire response to debug

            if (createCompanyResponse) {
                const {organizationId} = createCompanyResponse; // Destructure organizationId from response

                console.log('Created organizationId:', organizationId);

                // Send invitations
                console.log('roles', formData.invitations)
                formData.invitations.forEach(invitation => {
                    sendInvitationMutation.mutate({
                        organizationId: organizationId,
                        userId: invitation.userId,
                        roleName: invitation.roleName,
                    });
                });
                setTimeout(() => {
                    navigate(`/company/${organizationId}`);
                }, 1000);
            } else {
                console.error('Create company response is undefined.');
            }

        } catch (error) {
            console.error('Error creating company or sending invitations:', error);

        }
    };
    const getButtonLabel = () => {
        if ((step === 4) && (!formData.organizationDocument || formData.organizationDocument.length === 0)) {
            return 'Skip';
        } else if (step === 5 && (!formData.invitations || formData.invitations.length === 0)) {
            return 'Skip';
        } else {
            return 'Continue';
        }
    };


    return (
        <Card className="bg-white mx-20 p-6 rounded-lg shadow-lg">
            <h1>{step}</h1>
            {step < 7 && step > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && <OrganizationTypeStep onNext={handleType}/>}
                        {step === 2 && (
                            <NameDescriptionStep
                                control={control}
                                formData={formData}
                                organization={organizationTypeS}
                                updateFormData={updateFormData}
                            />
                        )}
                        {step === 3 && (
                            <AdditionalDetailsStep
                                control={control}
                                formData={formData}
                                updateFormData={updateFormData}
                            />
                        )}
                        {step === 4 && (
                            <VerifyDocumentsStep
                                control={control}
                                formData={formData}
                                updateFormData={updateFormData}
                            />
                        )}
                        {step === 5 && (
                            <InvitationsStep
                                control={control}
                                formData={formData} updateFormData={updateFormData}
                            />
                        )}
                        {step === 6 && (
                            <PreviewCard
                                formData={formData}
                                organizationTypeS={organizationTypeS}
                            />
                        )}
                        <div className="flex justify-between">
                            {step > 1 && (
                                <div className="cursor-pointer" onClick={handlePrevious}>
                                    <div className="relative inline-flex items-center justify-start py-3 pr-4 pl-12 overflow-hidden
                                    font-semibold shadow text-green-500 transition-all duration-150 ease-in-out rounded hover:pr-10
                                    hover:pl-6 bg-gray-50
                                    dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
                                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
                                        bg-green-500 group-hover:h-full"></span>
                                        <span
                                            className="absolute left-0 pl-4 duration-200 ease-out group-hover:-translate-x-20 -translate-x-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 stroke="currentColor" fill="none"
                                                 className="w-5 h-5 text-green-700 transform rotate-180">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"
                                                      strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span
                                            className="absolute right-0 pr-4 pl-4 ease-out duration-200 group-hover:translate-x-0 translate-x-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 stroke="currentColor" fill="none"
                                                 className="w-5 h-5 text-green-700 transform rotate-180">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"
                                                      strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white
                                        dark:group-hover:text-gray-200">Previous</span>
                                    </div>
                                </div>
                            )}
                            {step < 6 && step > 1 && (
                                <div className="cursor-pointer" onClick={handleSubmit(handleNext)}>
                                    <div
                                        className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden
                                        font-semibold shadow text-green-500 transition-all duration-150 ease-in-out rounded hover:pl-10
                                        hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
                                            bg-green-500 group-hover:h-full"></span>
                                        <span
                                            className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 stroke="currentColor" fill="none" className="w-5 h-5 text-green-700">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"
                                                      strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span
                                            className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 stroke="currentColor" fill="none" className="w-5 h-5 text-green-700">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"
                                                      strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out
                                        group-hover:text-white dark:group-hover:text-gray-200">{getButtonLabel()}</span>
                                    </div>
                                </div>
                            )}
                            {step === 6 && (
                                <button
                                    className="relative inline-flex items-center justify-start px-6 overflow-hidden
                                    font-semibold shadow text-green-500 transition-all duration-150 ease-in-out rounded bg-gray-50
                                    dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
                                    type="submit"
                                >
                                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
                                        bg-green-500 group-hover:h-full"></span>
                                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white
                                        dark:group-hover:text-gray-200">Submit</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                {step < 6 && step > 0 && (
                <div className="lg:col-span-1">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <PreviewCard
                            formData={formData}
                            organizationTypeS={organizationTypeS}
                        />
                    </div>
                </div>
                )}
            </div>
            )}
        </Card>
    )
        ;
};

export default CreateCompanyForm;
