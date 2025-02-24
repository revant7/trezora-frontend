import AuthenticationContext from "./authenticationContext";
import { useState } from "react";

const AuthenticationState = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationState;