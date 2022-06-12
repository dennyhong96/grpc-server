import { GraphQLResolveInfo } from "graphql";

import { allPeople, allHouse } from "../../database";
import {
  Person as PersonGraphql,
  House as HouseGraphql,
  PersonResolvers,
  Query,
  QueryResolvers,
} from "../../generated/graphql/types";
import { Person as PersonGrpc } from "../../generated/grpcServer/person_pb";
import { House as HouseGrpc } from "../../generated/grpcServer/house_pb";

export const personResolver: {
  Person: PersonResolvers;
  Query: QueryResolvers;
} = {
  Query: {
    persons: async (
      source: Partial<Query>, // root
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): Promise<PersonGraphql[]> => {
      return allPeople.map((h: PersonGrpc.AsObject) => {
        return {
          id: h.id?.value ?? -1,
          firstname: h.firstname?.value ?? "",
          lastname: h.lastname?.value ?? "",
          fullname: h.firstname?.value + " " + h.lastname?.value,
        };
      });
    },
  },

  Person: {
    // this runs after `persons` query resolves
    fullname: async (
      source: Partial<PersonGraphql>, // resolved PersonGraphql object
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): Promise<string> => {
      return source.firstname + " " + source.lastname;
    },
    houses: async (
      source: Partial<PersonGraphql>,
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): Promise<HouseGraphql[]> => {
      const houses = allHouse.filter((d) => d.ownerid?.value === source.id);
      return houses.map((h: HouseGrpc.AsObject) => {
        return {
          id: h.id?.value ?? -1,
          address: {
            streetName: h.address?.streetname?.value ?? "",
            houseNumber: h.address?.housenumber?.value ?? "",
          },
          numberOfBedrooms: h.numberofbedrooms?.value ?? 0,
          onSale: h.onsale?.value ?? false,
          squarefeet: h.squarefeet?.value ?? 0,
          isRental: h.isrental?.value ?? false,
          owner: { id: h.ownerid?.value } as any as PersonGraphql,
        };
      });
    },
  },
};

export default personResolver;
