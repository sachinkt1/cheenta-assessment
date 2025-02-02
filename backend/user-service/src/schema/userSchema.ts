import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): String
    register(name: String!, email: String!, password: String!): User
  }
`;

export default typeDefs;
