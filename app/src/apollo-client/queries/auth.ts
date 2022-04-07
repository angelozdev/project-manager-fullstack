import { gql } from "@apollo/client";

export const LOG_IN = gql`
  query Query($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      accessToken
    }
  }
`;
