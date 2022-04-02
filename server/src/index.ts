import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./modules/users";
import { ProjectResolver } from "./modules/projects";
import connectDB from "./db";
import { Logger } from "./utils";

async function initialize() {
  await connectDB();
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
  });

  const server = new ApolloServer({
    schema,
    context({ req }) {
      const bearerToken = req.headers["authorization"];
      if (!bearerToken || typeof bearerToken !== "string")
        return { token: null };
      const token = bearerToken.split(" ")[1];
      return { token };
    },
  });

  server
    .listen()
    .then(({ url }) => {
      Logger.success("initialize", `Server ready at ${url}`);
    })
    .catch((error) => Logger.error("initialize", (error as Error)?.message));
}

initialize();
