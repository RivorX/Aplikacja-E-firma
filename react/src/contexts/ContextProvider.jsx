import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        name: 'Tom Cook',
        email: 'tom@example.com',
    })
    const [userToken, setUserToken] = useState('');

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const userStateContext = () => useContext(StateContext)