import { axios } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useOccupations = (occupationSearchQuery) => {
    return useQuery({
        queryKey: ["occupations", occupationSearchQuery],
        queryFn: async () => {
            let query = "";

            if (occupationSearchQuery) {
                query += `&search=${occupationSearchQuery}`;
            }

            const { data } = await axios.get(`${url}/occupation/getOccupations?${query}`);

            return data;
        },
    });
};

export const useCreateProfession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (name) => {
            const { data } = await axios.post(`${url}/occupation/createOccupation`, { name });
            return data;
        },

        onSuccess: () => {
            toast.success("Occupation Added successfully");
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
        },
        onError: () => {
            toast.error("Error Adding Occupation");
        },
    });
};

export const useDeleteProfession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (name) => {
            await axios.delete(`${url}/occupation/deleteOccupation/${name}`);
        },
        onSuccess: () => {
            toast.success("Occupation Deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
        },
        onError: () => {
            toast.error("Error Deleting Occupation");
        },
    });
};

export const useUpdateProfession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            await axios.put(`${url}/occupation/updateOccupation/${data.id}`, {
                name: data.name,
            });
        },
        onSuccess: () => {
            toast.success("Occupation Updated successfully");
            queryClient.invalidateQueries({ queryKey: ["occupations"] });
        },
        onError: () => {
            toast.error("Error Updating Occupation");
        },
    });
};
