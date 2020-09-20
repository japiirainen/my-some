import { makeSchema, objectType, queryType, mutationType } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import path from "path";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id(), t.model.username(), t.model.password(), t.model.email();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.user();
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
  },
});

export const schema = makeSchema({
  types: { Query, User, Mutation },
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"),
    typegen: path.join(process.cwd(), "nexus.ts"),
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
