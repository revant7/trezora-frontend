import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthenticationContext);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
