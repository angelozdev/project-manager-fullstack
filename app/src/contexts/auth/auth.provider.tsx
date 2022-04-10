import React from "react";
import JWTDecode from "jwt-decode";

// utils
import { SecureStoreItems } from "@consts";
import { secureStoreUtils } from "@utils";
import AuthContext from "./auth.context";

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSetUser = React.useCallback(async (user: IUser | null) => {
    setUser(user);

    try {
      const wasUserSaved = await secureStoreUtils.setItem(
        SecureStoreItems.USER,
        user
      );
      if (!wasUserSaved) throw new Error("[AUTH_PROVIDER]: error on save user");
    } catch (error) {
      setUser(null);
    }
  }, []);

  const logout = React.useCallback(async () => {
    setUser(null);
    await secureStoreUtils.deleteItem(SecureStoreItems.USER);
  }, []);

  const value: IAuthContext = React.useMemo(
    () => ({ user, setUser: handleSetUser, isLoading, logout }),
    [user, handleSetUser, isLoading, logout]
  );

  React.useEffect(() => {
    async function getUser() {
      try {
        const user = await secureStoreUtils.getItem<IUser>(
          SecureStoreItems.USER
        );
        if (!user || !user.accessToken) return;
        const { exp } = JWTDecode<IUserJWT>(user.accessToken);
        const isTokenExpired = exp * 1000 < Date.now();
        if (isTokenExpired) throw new Error("[AUTH_PROVIDER]: token expired");
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
