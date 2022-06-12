import { GraphQLResolveInfo } from "graphql";

import {
  Person as PersonGraphql,
  House as HouseGraphql,
  PersonResolvers,
  Query,
  QueryResolvers,
  QueryPersonsArgs,
} from "../../generated/graphql/types";
import { Person as PersonGrpc } from "../../generated/grpcServer/person_pb";
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
      const getListPersonRes =
        await context.dataSources.personService.getListPerson(args.ids);
      const allPersons: PersonGrpc[] = getListPersonRes.getPersonList();
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
      const getPersonRes = await context.dataSources.personService.getPerson(
        personId
      );
      const houseIds =
        getPersonRes
          .getPerson()
          ?.getHouseidsList()
          .map((idInt32) => idInt32.getValue()) ?? [];
      const getListHousesRes =
        await context.dataSources.houseService.getListHouses(houseIds);
      const housesGrpc = getListHousesRes.getHouseList();
      return GrpcGraphQLMapper.housesFromResponse(housesGrpc);
    },
  },
};

export default personResolver; // for mergeResolvers
