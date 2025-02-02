import { createClient } from "redis";
import Task from "../models/Task";

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

const resolvers = {
  Query: {
    getTasks: async () => await Task.find(),
    getTask: async (_: any, { id }: { id: string }) => await Task.findById(id),
  },
  Mutation: {
    createTask: async (_: any, { title, description, assignedTo }: any) => {
      const task = new Task({ title, description, assignedTo });
      await task.save();
      return task;
    },
    updateTask: async (_: any, { id, status }: any) => {
      const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedTask) throw new Error("Task not found");

      // Publish update to Redis
      await redisClient.publish("task-updates", JSON.stringify(updatedTask));

      return updatedTask;
    },
    deleteTask: async (_: any, { id }: any) => {
      await Task.findByIdAndDelete(id);
      return "Task deleted successfully";
    },
  },
};

export default resolvers;
