import React from "react";
import AuthContext from "./auth.context";

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("[AuthContext]: Missing provider");
  return context;
}
