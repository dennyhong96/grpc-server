import grpc from "grpc";

import { HouseServiceService, IHouseServiceServer } from "./house_grpc_pb";
import {
  House,
  HouseRequest,
  HouseResponse,
  HousesBySizeRequest,
  HousesBySizeResponse,
  HousesRequest,
  HousesResponse,
} from "./house_pb";
import { Mapper } from "./mapping";

// Mock DB
const allHouse: House.AsObject[] = [
  {
    id: { value: 1 },
    housenumber: { value: "123" },
    squarefeet: { value: 1200 },
    streetname: { value: "Funny Street" },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
    isrental: { value: true },
  },
  {
    id: { value: 2 },
    housenumber: { value: "124" },
    squarefeet: { value: 1500 },
    streetname: { value: "Zoo" },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
    isrental: { value: true },
  },
  {
    id: { value: 3 },
    housenumber: { value: "125" },
    squarefeet: { value: 1700 },
    streetname: { value: "ZooYork" },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
  },
];

class HouseSerivce implements IHouseServiceServer {
  public getHousesBySize(
    { request }: grpc.ServerUnaryCall<HousesBySizeRequest>,
    callback: grpc.sendUnaryData<HousesBySizeResponse>
  ) {
    // Get params from request
    const min = request.getMinsquarefeet();

    // Fetch data from DB
    const ids = allHouse
      .filter(
        (h) =>
          h.id !== undefined &&
          h.squarefeet !== undefined &&
          h.squarefeet.value >= min
      )
      .map((h) => h.id!.value);

    // Create a response
    const response = new HousesBySizeResponse();
    response.setIdsList(ids);
    // Send data back
    callback(null, response);
  }

  public getHouse(
    { request }: grpc.ServerUnaryCall<HouseRequest>,
    callback: grpc.sendUnaryData<HouseResponse>
  ) {
    const id = request.getId();
    const houseObj = allHouse
      .filter((h) => h.id !== undefined)
      .find((h) => h.id!.value === id);
    const house = houseObj ? Mapper.house(houseObj) : undefined;
    const response = new HouseResponse();
    response.setHouse(house);
    callback(null, response);
  }

  public getHouses(
    { request }: grpc.ServerUnaryCall<HousesRequest>,
    callback: grpc.sendUnaryData<HousesResponse>
  ) {
    const ids = request.getIdsList();
    const houseObjs = allHouse.filter(
      (h) => h.id !== undefined && ids.includes(h.id!.value)
    );
    const houses = Mapper.houses(houseObjs);
    const response = new HousesResponse();
    response.setHouseList(houses);
    callback(null, response);
  }
}

const server = new grpc.Server();
server.addService<IHouseServiceServer>(HouseServiceService, new HouseSerivce());
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
server.start();
