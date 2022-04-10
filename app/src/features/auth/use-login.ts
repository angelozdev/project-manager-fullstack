import React from "react";
import { useMutation } from "@apollo/client";

// utils
import { mutations } from "@apollo-client";
import { getErrorMessage, toasts } from "@utils";
import { useAuthContext } from "@contexts/auth";

function useLogin(variables: LoginVars): [() => void, { loading: boolean }] {
  const { setUser } = useAuthContext();
  const [login, { reset, loading }] = useMutation<LoginData, LoginVars>(
    mutations.auth.LOG_IN,
    {
      variables,
      onError: (error) => {
        const message = getErrorMessage(error);
        toasts.onError(message);
      },
      fetchPolicy: "network-only",
    }
  );

  const handleLogin = React.useCallback(() => {
    login({
      onError: reset,
      onCompleted: async ({ logIn }) => {
        toasts.onSuccess("Login exitoso");
        setUser(logIn);
      },
    });
  }, [login, reset, setUser]);

  return [handleLogin, { loading }];
}

export default useLogin;
