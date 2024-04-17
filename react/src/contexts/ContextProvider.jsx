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
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');// Token użytkownika

    const setUserToken = (token) => {
        if (token) {
          localStorage.setItem('TOKEN', token)
        } else {
          localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
      }



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

export const useStateContext = () => useContext(StateContext);