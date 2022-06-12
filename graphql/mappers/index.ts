import { Person as PersonGrpc } from "../../generated/grpcServer/person_pb";
import { House as HouseGrpc } from "../../generated/grpcServer/house_pb";
import {
  Person as PersonGraphQL,
  House as HouseGraphQL,
} from "../../generated/graphql/types";

export class GrpcGraphQLMapper {
  public static person(
    personGrpcObj: PersonGrpc.AsObject | undefined
  ): PersonGraphQL {
    if (!personGrpcObj) {
      return { id: -1, firstname: "", lastname: "", fullname: "" };
    }
    const firstname = personGrpcObj.firstname?.value ?? "";
    const lastname = personGrpcObj.lastname?.value ?? "";
    return {
      id: personGrpcObj.id?.value ?? -1,
      firstname,
      lastname,
      fullname: `${firstname} ${lastname}`,
    };
  }

  public static persons(
    personGrpcObjs: PersonGrpc.AsObject[]
  ): PersonGraphQL[] {
    return personGrpcObjs.map((personGrpcObj) =>
      GrpcGraphQLMapper.person(personGrpcObj)
    );
  }

  public static personsFromResponse(
    personsGrpc: PersonGrpc[]
  ): PersonGraphQL[] {
    return personsGrpc
      .map((personGrpc) => personGrpc.toObject(true))
      .map((personGrpcObj) => GrpcGraphQLMapper.person(personGrpcObj));
  }

  public static house(houseGrpcObj: HouseGrpc.AsObject): HouseGraphQL {
    return {
      id: houseGrpcObj.id?.value ?? -1,
      address: {
        streetName: houseGrpcObj.address?.streetname?.value ?? "",
        houseNumber: houseGrpcObj.address?.housenumber?.value ?? "",
      },
      numberOfBedrooms: houseGrpcObj.numberofbedrooms?.value ?? 0,
      onSale: houseGrpcObj.onsale?.value ?? false,
      squarefeet: houseGrpcObj.squarefeet?.value ?? 0,
      isRental: houseGrpcObj.isrental?.value ?? false,

      // assume we have a PersonGraphQL here, edge resolver will populate it
      owner: { id: houseGrpcObj.ownerid?.value } as PersonGraphQL,
    };
  }

  public static houses(housesGrpcObjs: HouseGrpc.AsObject[]): HouseGraphQL[] {
    return housesGrpcObjs.map((p) => GrpcGraphQLMapper.house(p));
  }

  public static housesFromResponse(housesGrpc: HouseGrpc[]): HouseGraphQL[] {
    return housesGrpc
      .map((houseGrpc) => houseGrpc.toObject(true))
      .map((houseGrpcObj) => GrpcGraphQLMapper.house(houseGrpcObj));
  }
}
