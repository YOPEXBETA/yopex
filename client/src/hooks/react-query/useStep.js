import { useState } from 'react';

const useStep = (initialStep = 1) => {
    const [step, setStep] = useState(initialStep);
    const [formData, setFormData] = useState({});

    const next = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    const back = () => setStep((prev) => prev - 1);

    const goTo = (stepNumber) => setStep(stepNumber);

    return {
        step,
        formData,
        next,
        back,
        goTo,
        updateFormData: setFormData,
    };
};

export default useStep;
