import { RequestOptions } from "https";
import { Types } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: Types.ObjectId;
}

export interface IProject {
  name: string;
  author: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
  _id?: Types.ObjectId;
}

export interface IContext {
  token: string | null;
  userID: string | null;
}

export interface DecodedJWT {
  _id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}
