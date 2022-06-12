import path from "path";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { CustomContext } from "./context/customContext";

const PORT = 5600;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is up");
});

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./schemas"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers")) as any
);
const services: any = {};
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: () => {
    return services as any;
  },
  context: (context: CustomContext) => {
    // context.loaders = new DataLoaders(services);
    return context;
  },
  introspection: true,
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}...`);
  server.start().then(() => {
    server.applyMiddleware({ app, path: "/graphql", cors: true });
  });
});
