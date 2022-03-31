import { RequestOptions } from "https";
import { Types } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContext {
  req: RequestOptions;
}
