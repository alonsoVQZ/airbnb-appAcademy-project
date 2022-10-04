import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const user = useSelector(state => state.user)
    const [userState, setUserState] = useState();
    const userObject = { user: userState, setUser: setUserState };
    useEffect(() => {
        setUserState(user)
    }, [user]);
    return (
        <UserContext.Provider value={userObject}>
            {children}
        </UserContext.Provider>
    )
}