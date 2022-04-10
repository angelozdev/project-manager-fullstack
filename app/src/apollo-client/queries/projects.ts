import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    getMyProjects {
      name
      _id
    }
  }
`;
