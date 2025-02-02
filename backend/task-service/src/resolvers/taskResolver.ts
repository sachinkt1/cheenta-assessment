import Task from "../models/Task";

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
      return await Task.findByIdAndUpdate(id, { status }, { new: true });
    },
    deleteTask: async (_: any, { id }: any) => {
      await Task.findByIdAndDelete(id);
      return "Task deleted successfully";
    },
  },
};

export default resolvers;
