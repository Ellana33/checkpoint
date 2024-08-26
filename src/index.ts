import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import dataSource from "./database/dataSource";
import { CountryResolver } from "./resolvers/CountryResolver";

const start = async () => {
  await dataSource.initialize();
  console.log("Connected to database");

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

start().catch((error) => {
    console.error("Erreur lors du démarrage du serveur:", error);
});