import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../../Components/Cards";
import countries from "../../countries.json";

const GetStarted = ({ extra }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const countryList = countries.map((country) => country.name.common);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      phoneNumber: "",
      confirmation: "",
    },
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card extra={`${extra} p-5`}>
      <div className="flex items-center min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto my-10 dark:bg-gray-800">
            <div className="relative flex items-center justify-between w-full mb-8">
              <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
              <div
                className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-green-500 transition-all duration-500"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 ${
                    currentStep === step ? "bg-green-500" : "bg-gray-300"
                  } rounded-full place-items-center`}
                ></div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Account Details
                  </h2>
                  <div>
                    <div className="flex flex-col gap-4">
                      <input
                        type="number"
                        id="phoneNumber"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Phone Number"
                        {...register("phoneNumber", { required: true })}
                      />
                      <div>
                        <select
                          id="country"
                          name="country"
                          {...register("country", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose your country</option>
                          {countryList.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h2>
                  <input
                    type="text"
                    {...register("personalInfo", { required: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your personal information"
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                  <input
                    type="text"
                    {...register("confirmation", { required: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Confirm your details"
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  className={`select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all ${
                    currentStep === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:shadow-lg hover:shadow-gray-900/20"
                  }`}
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  Prev
                </button>
                {currentStep < 3 ? (
                  <button
                    className={`select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all ${
                      currentStep === 3
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:shadow-lg hover:shadow-gray-900/20"
                    }`}
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all bg-green-500 hover:shadow-lg hover:shadow-gray-900/20"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GetStarted;
