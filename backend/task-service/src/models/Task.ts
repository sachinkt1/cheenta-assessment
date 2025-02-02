import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    assignedTo: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
