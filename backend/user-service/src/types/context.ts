import { Request, Response } from "express";
import { IUser } from "../models/User";

export interface Context {
  req: Request & { user?: IUser };
  res: Response;
}
