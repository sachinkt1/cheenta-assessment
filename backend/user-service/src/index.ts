import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectDB from "./config/db";
import typeDefs from "./schema/userSchema";
import resolvers from "./resolvers/userResolver";
import authRoutes from "./routes/auth";

dotenv.config();
connectDB();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  // Keep REST auth routes (if needed)
  app.use("/auth", authRoutes);

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 User Service running at http://localhost:${PORT}/graphql`));
}

startServer();
