import { gql } from "@apollo/client";

export const GET_ACCESS_TOKEN = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;
