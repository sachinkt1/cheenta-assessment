import { GraphQLResolveInfo } from "graphql";
import User, { IUser } from "../models/User";
import { Context } from "../types/context";
export type Resolvers = {
  Query: {
    me: (
      parent: unknown,
      args: Record<string, never>,
      context: Context,
      info: GraphQLResolveInfo
    ) => Promise<IUser | null>;
  };
  Mutation: {
    register: (
      parent: unknown,
      args: { name: string; email: string; password: string; role: string },
      context: Context,
      info: GraphQLResolveInfo
    ) => Promise<IUser>;
    login: (
      parent: unknown,
      args: { email: string; password: string },
      context: Context,
      info: GraphQLResolveInfo
    ) => Promise<string>;
  };
};

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.user) throw new Error("Not authenticated");
      return req.user;
    },
  },
  Mutation: {
    register: async (_, { name, email, password, role }) => {
      const user = new User({ name, email, password, role });
      await user.save();
      return user;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) throw new Error("Invalid credentials");
      return "Login successful!";
    },
  },
};

export default resolvers;
