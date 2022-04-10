import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($data: LogInInput!) {
    logIn(data: $data) {
      accessToken
      name
      email
      _id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($data: NewUserInput!) {
    signUp(data: $data) {
      name
    }
  }
`;
