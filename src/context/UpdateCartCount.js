import { createContext, useState } from "react";

const UpdateCartCountContext = createContext();

export const UpdateCartCountProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    return (
        <UpdateCartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </UpdateCartCountContext.Provider>
    )

}

export default UpdateCartCountContext;