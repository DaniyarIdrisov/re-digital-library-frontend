import React, {createContext} from "react";

export interface IAuthContext {
    user: IUser

    setUser(value: React.Dispatch<React.SetStateAction<IUser>>): void
}

const AuthContext = createContext<IAuthContext | object>({})

export default AuthContext;