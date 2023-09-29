import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { createContext, useState } from "react";

export const UserFullNameContext = createContext({})

const Root = () => {
    const [userFullName, setUserFullName] = useState('')
    console.log("From root: >>>>> ", userFullName);
    return (
        <div>
            <UserFullNameContext.Provider value={{userFullName, setUserFullName}}>
                <Header></Header>
                <Outlet></Outlet>
            </UserFullNameContext.Provider>
        </div>
    );
};

export default Root;