import { Resolvers } from "@apollo/server";
import User from "../models/User";

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.user) throw new Error("Not authenticated");
      return req.user;
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
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
