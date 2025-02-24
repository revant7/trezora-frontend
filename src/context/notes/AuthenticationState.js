import NoteContext from "./authenticationContext";
import { useState } from "react";

const AuthenticationState = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <NoteContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default AuthenticationState;