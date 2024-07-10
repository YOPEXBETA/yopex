import React, { useState } from 'react';
import OrganizationTypeStep from './OrganizationTypeStep';
import SectorStep from './SectorStep';
import NameDescriptionStep from './NameDescriptionStep';
import AdditionalDetailsStep from './AdditionalDetailsStep';
import VerifyDocumentsStep from './VerifyDocumentsStep';
import { useForm } from 'react-hook-form';
import useStep from '../../../../hooks/react-query/useStep';
import {useFileUpload, useUserById} from "../../../../hooks/react-query/useUsers";
import {useCreateCompany, useSendInvitation} from "../../../../hooks/react-query/useCompany";
import {useSelector} from "react-redux";
import Card from "../../../../Components/Cards";
import InvitationsStep from "./InviteMembersStep";

const CreateCompanyForm = () => {
    const { step, next, back } = useStep(1);
    const {  handleSubmit, control, reset, watch } = useForm();
    const fileUploadMutation = useFileUpload();
    const { mutateAsync: createCompany, isLoading } = useCreateCompany();
    const sendInvitationMutation = useSendInvitation();
    const { user } = useSelector((state) => state.auth);
    const { data: userProfile } = useUserById(user._id);


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
            let updatedData = { ...formData };
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
                const { organizationId } = createCompanyResponse; // Destructure organizationId from response

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
            } else {
                console.error('Create company response is undefined.');
            }

        } catch (error) {
            console.error('Error creating company or sending invitations:', error);
            // Handle errors appropriately
        }
    };

    const getButtonLabel = () => {
        if (step === 4 && organizationTypeS !== 'company' && (!formData.organizationDocument || formData.organizationDocument.length === 0)) {
            return 'Skip';
        } else if (step === 5 && organizationTypeS === 'company' && (!formData.organizationDocument || formData.organizationDocument.length === 0)) {
            return 'Skip';
        } else {
            return 'Continue';
        }
    };



    return (
        <Card className="bg-white mx-20 p-6 rounded-lg shadow-lg" >
            <h1>{step}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 1 && <OrganizationTypeStep onNext={handleType}/>}
                    {step === 2 && organizationTypeS === 'company' && (
                        <SectorStep
                            control={control}
                            formData={formData}
                        />
                    )}
                    {step === 2 && organizationTypeS !== 'company' && (
                        <NameDescriptionStep
                            control={control}
                            formData={formData}
                        />
                    )}
                    {step === 3 && organizationTypeS === 'company' && (
                        <NameDescriptionStep
                            control={control}
                            formData={formData}
                        />
                    )}
                    {step === 3 && organizationTypeS !== 'company' && (
                        <AdditionalDetailsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    )}
                    {step === 4 && organizationTypeS === 'company' && (
                        <AdditionalDetailsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    )}
                    {step === 4 && organizationTypeS !== 'company' && (
                        <VerifyDocumentsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    )}
                    {step === 5 && organizationTypeS === 'company' && (
                        <VerifyDocumentsStep
                            control={control}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    )}

                    {step === 5 && organizationTypeS !== 'company' &&(
                        <InvitationsStep
                            control={control}
                            formData={formData} updateFormData={updateFormData}
                        />
                    )}

                    <div className="text-right mt-4">
                        {step > 1 && (
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2"
                                type="button"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                        )}
                        {step < 6 && step > 1 && (
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                type="button" // Change type to button
                                onClick={handleSubmit(handleNext)}
                            >
                                {getButtonLabel()}
                            </button>
                        )}
                        {step === 6 && (
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="lg:col-span-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <Card className="h-full">
                        {organizationTypeS && (
                            <h3 className="text-xl font-bold text-center mb-4">Your {organizationTypeS}</h3>
                        )}
                        {!organizationTypeS && (
                            <h3 className="text-xl font-bold text-center mb-4">Your Organization</h3>
                        )}
                        {formData.organizationLogo && (
                            <div className="flex items-center mb-4">
                                <img
                                    src={formData.organizationLogo}
                                    alt="Organization Logo"
                                    className="w-12 h-12 mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-bold">{formData.name}</h3>
                                    <p className="text-gray-700">{formData.websiteURL}</p>
                                </div>
                            </div>
                        )}
                        {!formData.organizationLogo && (
                            <p className="text-gray-700">Upload organization logo to display here.</p>
                        )}
                        <p className="text-gray-700">
                            This section can contain additional information or components.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
        </Card>
    );
};

export default CreateCompanyForm;
