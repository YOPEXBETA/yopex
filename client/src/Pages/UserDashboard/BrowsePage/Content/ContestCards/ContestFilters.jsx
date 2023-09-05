import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PaidIcon from "@mui/icons-material/Paid";

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
          <label htmlFor="min-amount" className="font-bold text-base">
            Contest Prize
          </label>

          <div className="flex items-center space-x-2">
            <span className="flex-shrink-0">
              <PaidIcon />
            </span>
            <input
              id="min-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Min Amount"
              {...register("minAmount")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="flex-shrink-0">
              <PaidIcon />
            </span>
            <input
              id="max-amount"
              type="number"
              className="border rounded-md p-2 w-full"
              placeholder="Max Amount"
              {...register("maxAmount")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContestsFilters;
