import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import typeDefs from "./schema/taskSchema";
import resolvers from "./resolvers/taskResolver";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`🚀 Task Service running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
