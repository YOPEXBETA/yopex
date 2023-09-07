import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const url = process.env.URL || "http://localhost:8000";

export const useCreateLevel = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (adminDefinedPoints) => {
        console.log("adminDefinedPoints inside useCreateLevel:", adminDefinedPoints);

        const { data } = await axios.post(`${url}/admin/createLevel`,
        { adminDefinedPoints},
         {withCredentials: true
        });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["levels"] });
      },
    });
  };

  export const useUpdateLevel = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (level) => {
      
          const { data } = await axios.put(
            `${url}/admin/updateLevel/${level._id}`,
            { maxScore :level.maxScore },
            { withCredentials: true }
          );
  
          return data;
       
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["levels"] });
      },
    });
  }

  export const useGetLevels = () => {
    return useQuery({
      queryKey: ["Levels"],
      queryFn: async () => {
        const { data } = await axios.get(`${url}/admin/allLevels`, {
          withCredentials: true,
        });
        return data;
      },
    });
  }

  export const useDeleteLevel = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (LevelId) => {
        await axios.delete(`${url}/admin/delLevel/${LevelId}`, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["levels"] });
    
      },
    });
  };