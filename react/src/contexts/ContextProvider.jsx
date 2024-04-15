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
    const [currentUser, setCurrentUser] = useState({}); // Aktualnie zalogowany użytkownik (obiekt {id, email, firstName, lastName, group, position
    const [userToken, setUserToken] = useState(localStorage.getItem('TOKEN') || ''); // Token użytkownika



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