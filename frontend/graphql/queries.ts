import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
      status
      assignedTo
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!, $assignedTo: String!) {
    addTask(title: $title, description: $description, assignedTo: $assignedTo) {
      id
      title
      description
      status
      assignedTo
    }
  }
`;
