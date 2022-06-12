import { House, HouseAddress } from "../generated/grpcServer/house_pb";
import {
  BoolValue,
  Int32Value,
  StringValue,
} from "google-protobuf/google/protobuf/wrappers_pb";
import { Person } from "../generated/grpcServer/person_pb";

export class Mapper {
  public static house(houseObj: House.AsObject): House {
    const house = new House();
    house.setId(Mapper.castToInt32Value(houseObj.id));
    house.setAddress(Mapper.address(houseObj.address));
    house.setSquarefeet(Mapper.castToInt32Value(houseObj.squarefeet));
    house.setNumberofbedrooms(
      Mapper.castToInt32Value(houseObj.numberofbedrooms)
    );
    house.setOnsale(Mapper.castToBoolValue(houseObj.onsale));
    house.setIsrental(Mapper.castToBoolValue(houseObj.isrental));
    house.setOwnerid(Mapper.castToInt32Value(houseObj.ownerid));
    return house;
  }

  public static houses(houseObjs: House.AsObject[]): House[] {
    return houseObjs.map((houseObj) => Mapper.house(houseObj));
  }

  public static address(
    addressObj: HouseAddress.AsObject | undefined
  ): HouseAddress | undefined {
    if (addressObj === undefined) return undefined;
    const houseAddress = new HouseAddress();
    houseAddress.setStreetname(Mapper.castToStringValue(addressObj.streetname));
    houseAddress.setHousenumber(
      Mapper.castToStringValue(addressObj.housenumber)
    );
    return houseAddress;
  }

  public static person(personObj: Person.AsObject): Person {
    const person = new Person();
    person.setId(Mapper.castToInt32Value(personObj.id));
    person.setFirstname(Mapper.castToStringValue(personObj.firstname));
    person.setLastname(Mapper.castToStringValue(personObj.lastname));
    return person;
  }

  public static persons(personObjs: Person.AsObject[]): Person[] {
    return personObjs.map((personObj) => Mapper.person(personObj));
  }

  // TODO: Use TS generic to refactor
  public static castToBoolValue(
    boolIn: BoolValue.AsObject | undefined
  ): BoolValue | undefined {
    if (boolIn === undefined) return undefined;
    const boolOut = new BoolValue();
    boolOut.setValue(boolIn.value);
    return boolOut;
  }

  public static castToInt32Value(
    int32In: Int32Value.AsObject | undefined
  ): Int32Value | undefined {
    if (int32In === undefined) return undefined;
    const int32Out = new Int32Value();
    int32Out.setValue(int32In.value);
    return int32Out;
  }

  public static castToStringValue(
    stringIn: StringValue.AsObject | undefined
  ): StringValue | undefined {
    if (stringIn === undefined) return undefined;
    const stringOut = new StringValue();
    stringOut.setValue(stringIn.value);
    return stringOut;
  }
}
