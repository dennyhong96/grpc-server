import { GraphQLResolveInfo } from "graphql";

import { allHouse, allPeople } from "../../database";
import {
  HouseResolvers,
  QueryResolvers,
  House as HouseGraphQL,
  Person as PersonGraphQL,
  Query,
} from "../../generated/graphql/types";
import { House as HouseGrpc } from "../../generated/grpcServer/house_pb";
import { Person as PersonGrpc } from "../../generated/grpcServer/person_pb";

export const houseResolver: {
  House: HouseResolvers;
  Query: QueryResolvers;
} = {
  Query: {
    houses: async (
      source: Partial<Query>, // parent, the root
      args: {},
      context: any, // for auth, etc.
      info: GraphQLResolveInfo
    ): Promise<HouseGraphQL[]> => {
      return allHouse.map((h: HouseGrpc.AsObject) => {
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
          owner: { id: h.ownerid?.value } as PersonGraphQL,
        };
      });
    },
  },
  House: {
    // this runs after `houses` query resolves
    owner: async (
      source: Partial<HouseGraphQL>, // parent - resolved HouseGraphQL object
      args: {},
      context: any,
      info: GraphQLResolveInfo
    ): Promise<PersonGraphQL> => {
      const ownerObj: PersonGrpc.AsObject | undefined = allPeople.find(
        (p) =>
          p.id !== undefined &&
          source.owner !== undefined &&
          p.id.value === source.owner.id
      );
      if (ownerObj === undefined) {
        return { id: 324, firstname: "Bank", lastname: "", fullname: "" };
      }
      return {
        id: ownerObj.id?.value ?? 100,
        firstname: ownerObj.firstname?.value ?? "",
        lastname: ownerObj.lastname?.value ?? "",
        fullname: ownerObj.firstname + "" + ownerObj?.lastname,
      };
    },
  },
};
export default houseResolver;
