import { mutations } from "@apollo-client";
import { useMutation } from "@apollo/client";
import { getErrorMessage, toasts } from "@utils";

function useLogin(variables: LoginVars) {
  const mutation = useMutation<LoginData, LoginVars>(mutations.auth.LOG_IN, {
    variables,
    onError: (error) => {
      const message = getErrorMessage(error);
      toasts.onError(message);
    },
    fetchPolicy: "network-only",
  });

  return mutation;
}

export default useLogin;
