import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/Users";

const AuthWrapper = ({ children, requiredRoles = [], redirectTo = "/users" }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (!token) {
            setLoading(false); // Avoid infinite loading if token is missing
            return;
        }

        const fetchRoles = async () => {
            try {
                const userProfile = await UserAPI.getMyUserProfile();
                const theRoles = userProfile.data.roles.map(role => role.name);
                setRoles(theRoles);
            } catch (error) {
                console.error("Error fetching user roles:", error);
                setRoles([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>; 
    }

    // Redirect to login if no token
    if (!token) {
        return <Navigate to="/Login" />;
    }

    // Redirect if user has no roles
    if (roles.length === 0) {
        return <Navigate to={redirectTo} />;
    }

    // Check if user has the required role
    const hasRequiredRole = requiredRoles.some(role => roles.includes(role));

    if (!hasRequiredRole) {
        console.log(`Required roles: ${requiredRoles}`);
        console.log(`Roles of the current user: ${roles}`);
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AuthWrapper;
