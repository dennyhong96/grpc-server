import grpc from "grpc";
import { allHouse } from "../database";

import { IHouseServiceServer } from "../generated/grpcServer/house_grpc_pb";
import {
  HouseRequest,
  HouseResponse,
  HousesBySizeRequest,
  HousesBySizeResponse,
  HousesRequest,
  HousesResponse,
} from "../generated/grpcServer/house_pb";
import { Mapper } from "../grpcServer/mapping";

export class HouseSerivce implements IHouseServiceServer {
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
    console.log("getHouse called");
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
    console.log("getHouse called");
    callback(null, response);
  }
}
