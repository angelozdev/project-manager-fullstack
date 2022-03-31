import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types";

const LogAccess: MiddlewareFn<IContext> = ({ context }, next) => {
  console.log("[LogAccess]: ", context?.req?.headers?.["authorization"]);
  return next();
};

export default LogAccess;
