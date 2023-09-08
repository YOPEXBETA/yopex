import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaMoney } from "react-icons/fa";

const ContestsFilters = ({ setMinAmount, setMaxAmount }) => {
  const { register, watch } = useForm();

  const minAmount = watch("minAmount");
  const maxAmount = watch("maxAmount");

  useEffect(() => {
    setMinAmount(minAmount);
  }, [minAmount, setMinAmount]);

  useEffect(() => {
    setMaxAmount(maxAmount);
  }, [maxAmount, setMaxAmount]);

  return (
    <div className="bg-white rounded-lg border-b-2 p-4 border-green-500 shadow-md">
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="min-amount" className="font-bold text-lg mb-4">
            Filters
          </label>

          <div className="flex flex-col space-y-2">
            <input
              id="min-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Min Price Amount"
              {...register("minAmount")}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <input
              id="max-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Max Price Amount"
              {...register("maxAmount")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContestsFilters;
