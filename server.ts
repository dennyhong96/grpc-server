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
    id: 1,
    housenumber: "123",
    squarefeet: 1200,
    streetname: "Funny Street",
    numberofbedrooms: 3,
  },
  {
    id: 2,
    housenumber: "500",
    squarefeet: 2000,
    streetname: "Zoo",
    numberofbedrooms: 1,
  },
  {
    id: 3,
    housenumber: "67",
    squarefeet: 890,
    streetname: "Spring Cir",
    numberofbedrooms: 4,
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
    const ids = allHouse.filter((h) => h.squarefeet >= min).map((h) => h.id);
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
    const houseObj = allHouse.find((h) => h.id === id);
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
    const houseObjs = allHouse.filter((h) => ids.includes(h.id));
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
