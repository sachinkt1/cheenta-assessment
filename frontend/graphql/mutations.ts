import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $status: String!, $assignedTo: String!) {
    createTask(title: $title, description: $description, status: $status, assignedTo: $assignedTo) {
      id
      title
      description
      status
      assignedTo
    }
  }
`;
