import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            try {
                await axios.get("http://127.0.0.1:8000/api/verify-token/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsValid(true);  // Token is valid
            } catch (err) {
                localStorage.removeItem("accessToken");
                <Navigate to="/sign-in" />
                console.error("Invalid or expired token.");
                setIsValid(false);
            }
        };

        validateToken();
    }, [token]);

    if (isValid === null) return <p>Loading...</p>;
    return isValid ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
