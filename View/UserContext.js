import React, { createContext, useState, useContext } from "react";

// Create Context object
export const UserContext = createContext();

// It returns the context provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Returning our provider with value as an object of value and update method
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

// useUser is our own custom React hook that will return user and setUser.
export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    return { user, setUser };
};

// Utilized gpt for this