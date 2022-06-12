import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./resolvers";
import { CustomContext } from "./context/customContext";

const PORT = 5600;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is up");
});

const schemas: string = "type Query{p:Test} type Test { id: Int!}";
const services: any = {};
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: schemas,
    resolvers: resolvers,
  }),
  dataSources: () => {
    return services as any;
  },
  context: (context: CustomContext) => {
    // context.loaders = new DataLoaders(services);
    return context;
  },
  // playground: true,
  introspection: true,
  // tracing: true,
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}...`);
  server.start().then(() => {
    server.applyMiddleware({ app, path: "/graphql", cors: true });
  });
});
