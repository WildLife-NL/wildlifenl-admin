import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Users = {
    getAllUserProfiles: async () => {
        try {
            const response = await axios.get(`${API_URL}/profiles/`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+json',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Auth Error: ", error.response?.data || error.message);
            throw error;
        }
    },
    
    getAllRoles: async () => {
        try{
            const response = await axios.get(`${API_URL}/roles/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+jason',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Auth Error: ", error.response?.data || error.message);
        }
    },

    addRole: async (roleID, userID) => {
        try{
            const response = await axios.post(`${API_URL}/role/`,
                {
                    roleID: roleID,
                    userID: userID
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+jason',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }
        catch (error){
            console.error("Auth Error: ", error.response?.data || error.message);
        }
    },

    removeRole: async (roleID, userID) => {
        try{
            const response = await axios.put(`${API_URL}/role/`,
                {
                    roleID: roleID,
                    userID: userID
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+jason',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }
        catch (error){
            console.error("Auth Error: ", error.response?.data || error.message);
        }
    },

    getMyUserProfile: () => {
        try{
            const response = axios.get(`${API_URL}/profile/me/`,
                {   
                headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+jason',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }
        catch (error){
            console.error("Auth Error: ", error.response?.data || error.message);
        } 
    },

    addUser: (email, name) => {
        try{
            const response = axios.post(`${API_URL}/user/`,
                {
                    email: email,
                    name: name
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+jason',
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            );
            return response;
        }
        catch (error){
            console.error("Auth Error: ", error.response?.data || error.message);
        } 
    }
};

export default Users;