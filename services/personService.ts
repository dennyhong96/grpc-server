import grpc from "grpc";
import { allPeople } from "../database";

import { IPersonServiceServer } from "../generated/grpcServer/person_grpc_pb";
import {
  PersonRequest,
  PersonResponse,
  PersonsRequest,
  PersonsResponse,
} from "../generated/grpcServer/person_pb";
import { Mapper } from "../grpcServer/mapping";

export class PersonService implements IPersonServiceServer {
  getPerson(
    { request }: grpc.ServerUnaryCall<PersonRequest>,
    callback: grpc.sendUnaryData<PersonResponse>
  ) {
    const id = request.getId();
    const personObj = allPeople.find(
      (p) => p.id !== undefined && p.id.value === id
    );
    const response = new PersonResponse();
    const person =
      personObj !== undefined ? Mapper.person(personObj) : undefined;
    response.setPerson(person);
    callback(null, response);
  }
  getPersons(
    { request }: grpc.ServerUnaryCall<PersonsRequest>,
    callback: grpc.sendUnaryData<PersonsResponse>
  ) {
    const ids = request.getIdsList();
    const personObjs = allPeople.filter(
      (p) => p.id !== undefined && ids.includes(p.id.value)
    );
    const response = new PersonsResponse();
    const persons = Mapper.persons(personObjs);
    response.setPersonList(persons);
    callback(null, response);
  }
}
