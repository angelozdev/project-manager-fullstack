import jsonWebToken from "jsonwebtoken";
import { env } from "../constants";
import { IUser } from "../types";

export function generateJWT(user: Partial<IUser>) {
  const token = jsonWebToken.sign(user, env.jwt.secret, {
    expiresIn: "1d",
  });
  return token;
}
