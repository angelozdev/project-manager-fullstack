import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types";
import { Logger } from "../utils";

const LogAccess: MiddlewareFn<IContext> = ({ info }, next) => {
  Logger.info("LogAccess", info.variableValues.data["email"], " accessed");
  return next();
};

export default LogAccess;
