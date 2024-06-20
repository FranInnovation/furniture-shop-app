'use client'
import { AppProps } from "next/app";
import { UserProvider, UserContext } from "@/store/user-context";
import { useContext } from "react";

const UserPage: React.FC = ({}) => {

    const userCtx = useContext(UserContext);

    return (
        <>
        <UserProvider>
        <h1>User Page</h1>
        <h2>{userCtx.user.name}</h2>
        </UserProvider>
        </>
    )
}

export default UserPage