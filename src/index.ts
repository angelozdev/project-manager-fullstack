import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./modules/users";
import connectDB from "./db";
import { Logger } from "./utils";

async function initialize() {
  await connectDB();
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  server
    .listen()
    .then(({ url }) => {
      Logger.success("initialize", `Server ready at ${url}`);
    })
    .catch((error) => Logger.error("initialize", (error as Error)?.message));
}

initialize();
