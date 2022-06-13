import { GraphQLResolveInfo } from "graphql";

import {
  Person as PersonGraphql,
  House as HouseGraphql,
  PersonResolvers,
  Query,
  QueryResolvers,
  QueryPersonsArgs,
} from "../../generated/graphql/types";
import { CustomContext } from "../context/customContext";
import { GrpcGraphQLMapper } from "../mappers";

export const personResolver: {
  Person: PersonResolvers;
  Query: QueryResolvers;
} = {
  Query: {
    persons: async (
      source: Partial<Query>, // root
      args: QueryPersonsArgs,
      context: CustomContext,
      info: GraphQLResolveInfo
    ): Promise<PersonGraphql[]> => {
      const allPersons = await context.loaders.Person.getPersons.load(args.ids);
      return GrpcGraphQLMapper.personsFromResponse(allPersons);
    },
  },

  Person: {
    // this runs after `persons` query resolves
    fullname: async (
      source: Partial<PersonGraphql>, // resolved PersonGraphql object
      args: {},
      context: CustomContext,
      info: GraphQLResolveInfo
    ): Promise<string> => {
      return source.firstname + " " + source.lastname;
    },
    houses: async (
      source: Partial<PersonGraphql>,
      args: {},
      context: CustomContext,
      info: GraphQLResolveInfo
    ): Promise<HouseGraphql[]> => {
      const personId = source.id;
      if (!personId) return [];
      const personGrpc = await context.loaders.Person.getPerson.load(personId);
      const houseIds =
        personGrpc?.getHouseidsList().map((idInt32) => idInt32.getValue()) ??
        [];
      const housesGrpc = await context.loaders.House.getHouses.load(houseIds);
      return GrpcGraphQLMapper.housesFromResponse(housesGrpc);
    },
  },
};

export default personResolver; // for mergeResolvers
