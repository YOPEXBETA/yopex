import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useCreateLevel = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (name) => {
        const { data } = await axios.post(
          `${url}/admin/createLevel`,
          
          { withCredentials: true }
        );
        return data;
      },
      onSuccess: (newLevelName) => {
        queryClient.invalidateQueries({ queryKey: ["levels"] });
        const confirmationMessage = `A new ${newLevelName} will be created. Do you want to continue?`;
      },
    });
  };