import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const googleAuthSuccess = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as any;

  // Generate JWT Token
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  // Send token as response
  res.json({ token, user });
};

export const googleAuthFailure = (req: Request, res: Response) => {
  res.status(401).json({ message: "Google Authentication Failed" });
};
