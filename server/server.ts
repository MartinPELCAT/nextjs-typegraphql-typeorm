import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import next from "next";
import express from "express";
import UserResolver from "./src/resolvers/UserResolver";

const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

export const server = async () => {
  return nextApp.prepare().then(async () => {
    const app = express();

    const schema = await buildSchema({ resolvers: [UserResolver] });
    const apollo = new ApolloServer({
      schema,
      subscriptions: {
        path: "/api/sub",
      },
    });
    apollo.applyMiddleware({ path: "/api/gql", app });

    app.all("*", (req, res) => handler(req, res)); // use page folder 

    await app.listen(3000);
    const { graphqlPath, subscriptionsPath } = apollo;
    console.info(`Server started at : ${graphqlPath}`);
    console.info(`Server started at : ${subscriptionsPath}`);
  });
};
