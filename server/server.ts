import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import next from "next";
import express from "express";
import UserResolver from "./src/resolvers/UserResolver";
import { createConnection, useContainer } from "typeorm";
import Container from "typedi";

const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();
useContainer(Container);
const PORT = 3000;

export const server = async () => {
  return nextApp.prepare().then(async () => {
    const app = express();
    /**
     * typeorm setup
     */

    await createConnection();

    /**
     * Typegraphql setup
     */
    const schema = await buildSchema({
      resolvers: [UserResolver],
      container: Container,
    });

    const apollo = new ApolloServer({
      schema,
      context: async ({ req, res }) => {
        return { res, req };
      },
    });
    apollo.applyMiddleware({ path: "/api/gql", app });
    app.all("*", (req, res) => handler(req, res)); // use page folder

    app.listen({ port: PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`
      );
    });
  });
};
