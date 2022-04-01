import { RequestOptions } from "https";
import { Types } from "mongoose";
import { TypeResolver } from "type-graphql";

export interface IUser {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: TypeResolver.ObjectId;
}

export interface IContext {
  req: RequestOptions;
}
