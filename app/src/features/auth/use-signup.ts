import { mutations } from "@apollo-client";
import { useMutation } from "@apollo/client";
import { getErrorMessage, toasts } from "@utils";

function useSignUp(variables: SignUpVars) {
  const mutation = useMutation<SignUpData, SignUpVars>(mutations.auth.SIGN_UP, {
    variables,
    fetchPolicy: "no-cache",
    onError: (error) => {
      const message = getErrorMessage(error);
      toasts.onError(message);
    },
  });

  return mutation;
}

export default useSignUp;
