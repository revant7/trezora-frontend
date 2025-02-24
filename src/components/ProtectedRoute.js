import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../context/notes/authenticationContext";

const ProtectedRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem("accessToken");
    const { setIsAuthenticated } = useContext(AuthenticationContext);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValid(false);
                setIsAuthenticated(false);
                return;
            }

            const body = { "token": `${token}` }

            try {
                await axios.post("http://127.0.0.1:8000/api/verify-token/", body, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsValid(true);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Invalid or expired token.");
                localStorage.removeItem("accessToken");
                setIsValid(false);
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, [token, setIsAuthenticated]);


    if (isValid === null) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;


    return isValid ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
