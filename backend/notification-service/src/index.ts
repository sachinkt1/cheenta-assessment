import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Redis Pub/Sub setup
const redisSubscriber = createClient({ url: process.env.REDIS_URL });
const redisPublisher = createClient({ url: process.env.REDIS_URL });

redisSubscriber.connect();
redisPublisher.connect();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Subscribe to task updates
redisSubscriber.subscribe("task-updates", (message) => {
  console.log("Task Update:", message);
  io.emit("task-update", message); // Send to all clients
});

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`🚀 Notification Service running on port ${PORT}`));
