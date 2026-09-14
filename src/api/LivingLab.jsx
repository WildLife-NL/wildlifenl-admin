import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const LivingLab = {
    getAllLivingLabs: async () => {
        try{
            const response = await axios.get(`${API_URL}/livinglabs/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+json',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    },

    AddLivingLab: async (name, definition) => {
        try{
            const response = await axios.post(`${API_URL}/livinglab/`,
                {
                    "name": name,
                    "definition": definition
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+json',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    }
}

export default LivingLab;
