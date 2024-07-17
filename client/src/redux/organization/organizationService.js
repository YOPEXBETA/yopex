
import axios from 'axios';
const url = process.env.REACT_APP_API_ENDPOINT;

export const getCurrentOrganization = async (organizationId) => {
    try {
        const response = await axios.get(`${url}/company/getCurrentOrganization/${organizationId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
