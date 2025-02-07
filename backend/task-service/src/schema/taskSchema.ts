import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: String!
    createdAt: String!
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String!, status: String!, assignedTo: String!): Task
    updateTask(id: ID!, status: String!): Task
    deleteTask(id: ID!): String
  }
`;

export default typeDefs;
