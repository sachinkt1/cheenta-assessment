import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model<IUser>("User", UserSchema);
