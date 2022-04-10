import React from "react";

const AuthContext = React.createContext<IAuthContext | null>(null);

AuthContext.displayName = "AuthContext";
export default AuthContext;
