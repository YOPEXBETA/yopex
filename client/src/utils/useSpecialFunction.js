import { useEffect } from "react";
import { axios } from "../axios";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useSpecialFunction = () => {
  useEffect(() => {
    const updateData = async () => {
      await axios.patch(`${url}/special`);
    };
    updateData();
  }, []);

  return "Done";
};
