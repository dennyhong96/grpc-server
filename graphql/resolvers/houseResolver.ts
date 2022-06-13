import { GraphQLResolveInfo } from "graphql";

import {
  HouseResolvers,
  QueryResolvers,
  House as HouseGraphQL,
  Person as PersonGraphQL,
  Query,
  QueryHousesArgs,
} from "../../generated/graphql/types";
import { CustomContext } from "../context/customContext";
import { GrpcGraphQLMapper } from "../mappers";

export const houseResolver: {
  House: HouseResolvers;
  Query: QueryResolvers;
} = {
  Query: {
    houses: async (
      source: Partial<Query>, // parent, the root
      args: QueryHousesArgs,
      context: CustomContext, // for auth, etc.
      info: GraphQLResolveInfo
    ): Promise<HouseGraphQL[]> => {
      const houses = await context.loaders.House.getHouses.load(args.ids);
      return GrpcGraphQLMapper.housesFromResponse(houses);
    },
  },

  House: {
    // this runs after `houses` query resolves
    owner: async (
      source: Partial<HouseGraphQL>, // parent - resolved HouseGraphQL object
      args: {},
      context: CustomContext,
      info: GraphQLResolveInfo
    ): Promise<PersonGraphQL> => {
      const personGrpc = await context.loaders.Person.getPerson.load(
        source.owner?.id ?? -1
      );
      if (personGrpc === undefined) {
        return GrpcGraphQLMapper.person(undefined);
      }
      return GrpcGraphQLMapper.personsFromResponse([personGrpc])[0];
    },
  },
};

export default houseResolver; // for mergeResolvers
