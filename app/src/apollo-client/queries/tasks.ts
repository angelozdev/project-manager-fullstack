import { gql } from "@apollo/client";

export const GET_TASKS_BY_PROJECT_ID = gql`
  query GetTasksByProjectId($projectId: String!) {
    getTasksByProjectId(projectId: $projectId) {
      name
      completed
      _id
      createdAt
      updatedAt
      project {
        _id
      }
    }
  }
`;
