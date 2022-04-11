import { queries } from "@apollo-client";
import { useLazyQuery } from "@apollo/client";
import { toasts } from "@utils";
import React from "react";

function useGetAccessToken(refreshToken?: string): string | null {
  const [getAccessToken, { data }] = useLazyQuery<
    GetAcessTokenData,
    GetAcessTokenVars
  >(queries.auth.GET_ACCESS_TOKEN, {
    fetchPolicy: "no-cache",
    onError: () => {
      toasts.onError("Something went wrong");
    },
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!refreshToken) return;
      getAccessToken({ variables: { refreshToken } });
    }, 1000 * 60 * 4);

    return () => clearInterval(id);
  }, [refreshToken]);

  return data?.refreshToken.accessToken ?? null;
}

export default useGetAccessToken;
