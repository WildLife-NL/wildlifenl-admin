import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Belonging = {
    getAllBelongings: async () => {
        try{
            const response = await axios.get(`${API_URL}/belonging/`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, application/problem+json',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
        );
        return response
        }
        catch (error){
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    },
    addBelonging: async (newBelonging) => {
        try{
            const response = await axios.post(`${API_URL}/belonging/`, 
            {
                "category": newBelonging.category,
                "name": newBelonging.name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, application/problem+json',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
        );
        return response
        }
        catch (error){
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    },
    updateBelonging: async (updatedBelonging, ID) => {
        try{
            const response = await axios.put(`${API_URL}/belonging/${ID}`, 
            {
                "category": updatedBelonging.category,
                "name": updatedBelonging.name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, application/problem+json',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
        );
        return response
        }
        catch (error){
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    }
}

export default Belonging