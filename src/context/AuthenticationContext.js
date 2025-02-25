import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        const validateToken = async () => {
            try {
                await axios.post("http://127.0.0.1:8000/api/verify-token/", { token }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Invalid or expired token.");
                localStorage.removeItem("accessToken");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContext;
