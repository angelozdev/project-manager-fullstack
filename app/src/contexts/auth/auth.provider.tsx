import React from "react";
import JWTDecode from "jwt-decode";

// utils
import { SecureStoreItems } from "@consts";
import { secureStoreUtils } from "@utils";
import AuthContext from "./auth.context";
import useGetAccessToken from "@features/auth/use-get-access-token";

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const accessToken = useGetAccessToken(user?.refreshToken);
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

  React.useEffect(() => {
    if (!accessToken || !user) return;
    handleSetUser({
      ...user,
      accessToken,
    });
  }, [accessToken, user?.refreshToken, handleSetUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

// const [_, { data, startPolling, stopPolling }] = useLazyQuery<
// GetAcessTokenData,
// GetAcessTokenVars
// >(queries.auth.GET_ACCESS_TOKEN, {
// onError: (error) => {
//   toasts.onError(error.message);
// },
// variables: {
//   refreshToken: user?.refreshToken,
// },
// onCompleted: (data) => {
//   if (!data.refreshToken.accessToken || !user) return;
//   setUser({ ...user, accessToken: data.refreshToken.accessToken });
// },
// });

// React.useEffect(() => {
// if (user?.refreshToken) {
//   startPolling(1000 * 4 * 60);
// }
// return () => stopPolling();
// }, [user?.refreshToken]);
