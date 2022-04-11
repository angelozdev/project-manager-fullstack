import jsonWebToken from "jsonwebtoken";
import { env } from "../constants";
import { IUser } from "../types";

export function generateJWT(
  user: Partial<IUser>,
  expiresIn: string | number = "15m"
) {
  const token = jsonWebToken.sign(user, env.jwt.secret, {
    expiresIn,
  });
  return token;
}

export function decodeJWT<T = any>(token: string) {
  return jsonWebToken.verify(token, env.jwt.secret) as T;
}
