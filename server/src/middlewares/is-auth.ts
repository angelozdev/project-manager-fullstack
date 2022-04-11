import { MiddlewareFn } from "type-graphql";
import { DecodedJWT, IContext } from "../types";
import { JWT } from "../utils";

const IsAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  const { token } = context;
  if (!token || typeof token !== "string") throw new Error("No token provided");
  const { _id } = JWT.decodeJWT<DecodedJWT>(token);
  context.userID = _id;
  return next();
};

export default IsAuth;
