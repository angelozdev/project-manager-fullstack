import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask($newTask: NewTaskInput!) {
    createTask(newTask: $newTask) {
      _id
      completed
      name
      createdAt
      updatedAt
      project {
        _id
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($updatedTask: UpdateTaskInput!, $taskId: String!) {
    updateTask(updatedTask: $updatedTask, taskId: $taskId) {
      _id
      completed
      name
      createdAt
      updatedAt
      project {
        _id
      }
    }
  }
`;
