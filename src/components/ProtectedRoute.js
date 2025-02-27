import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/sign-in", { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    return isAuthenticated ? children : null; // Return null, navigation is handled in useEffect
};

export default ProtectedRoute;