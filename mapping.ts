import { House } from "./house_pb";

export class Mapper {
  public static house(houseObj: House.AsObject): House {
    const house = new House();
    house.setId(houseObj.id);
    house.setStreetname(houseObj.streetname);
    house.setHousenumber(houseObj.housenumber);
    house.setSquarefeet(houseObj.squarefeet);
    house.setNumberofbedrooms(houseObj.numberofbedrooms);
    return house;
  }

  public static houses(houseObjs: House.AsObject[]): House[] {
    return houseObjs.map((houseObj) => Mapper.house(houseObj));
  }
}
