import axios from "axios";

const API_URL = process.env.REACT_APP_PROD_BASE_URL;

const Auth = {
    authenticate: async (newUser) => {
        try {
            const response = await axios.post(`${API_URL}/auth/`, 
                {
                    displayNameApp: 'MyApp',
                    email: newUser.userEmail
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+json'
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    },

    authorize: async (newUser) => {
        try {
            const response = await axios.put(`${API_URL}/auth/`, 
                {
                    code: newUser.userCode,
                    email: newUser.userEmail
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/problem+json'
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default Auth;