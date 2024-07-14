import { axios } from "../../axios";
import { useQuery } from "react-query";

const url = process.env.REACT_APP_API_ENDPOINT;

export const useAllRoles = () => {
    return useQuery({
        queryKey: "roles",
        queryFn: async () => {
            const { data } = await axios.get(`${url}/oganizationRole/getAll`);
            return data;
        },
    });
};
