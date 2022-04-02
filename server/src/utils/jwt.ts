import jsonWebToken from "jsonwebtoken";
import { env } from "../constants";
import { IUser } from "../types";

export function generateJWT(user: Partial<IUser>) {
  const token = jsonWebToken.sign(user, env.jwt.secret, {
    expiresIn: "15m",
  });
  return token;
}

export function decodeJWT(token: string) {
  return jsonWebToken.verify(token, env.jwt.secret);
}
