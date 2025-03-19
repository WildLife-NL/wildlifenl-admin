import axios from "axios";

const API_URL = process.env.REACT_APP_PROD_BASE_URL;

const Species = {
    getAllSpecies: async () => {
        try{
            const response = await axios.get(`${API_URL}/species/`, 
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

    updateSpecies: async (speciesID, updatedSpecies) => {
        try{
            const response = await axios.put(`${API_URL}/species/${speciesID}`, 
                {
                    "advice": updatedSpecies.advice,
                    "behaviour": updatedSpecies.behaviour,
                    "category": updatedSpecies.category,
                    "commonName": updatedSpecies.commonName,
                    "description": updatedSpecies.description,
                    "name": updatedSpecies.name,
                    "roleInNature": updatedSpecies.roleInNature
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
    },

    AddSpecies: async (updatedSpecies) => {
        try{
            const response = await axios.post(`${API_URL}/species/`, 
                {
                    "advice": updatedSpecies.advice,
                    "behaviour": updatedSpecies.behaviour,
                    "category": updatedSpecies.category,
                    "commonName": updatedSpecies.commonName,
                    "description": updatedSpecies.description,
                    "name": updatedSpecies.name,
                    "roleInNature": updatedSpecies.roleInNature
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

export default Species;