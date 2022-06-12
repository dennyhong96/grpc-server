import grpc from "grpc";

import { PersonServiceClient } from "../generated/grpcServer/person_grpc_pb";
import {
  PersonRequest,
  PersonResponse,
  PersonsRequest,
  PersonsResponse,
} from "../generated/grpcServer/person_pb";

export class PersonClient {
  private personClient: PersonServiceClient;

  constructor() {
    this.personClient = new PersonServiceClient(
      "0.0.0.0:50051",
      grpc.credentials.createInsecure()
    );
  }

  public getListPerson(ids: number[]): Promise<PersonsResponse> {
    return new Promise<PersonsResponse>((resolve, reject) => {
      const request = new PersonsRequest();
      request.setIdsList(ids);
      this.personClient.getPersons(
        request,
        (err: grpc.ServiceError | null, data: PersonsResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  public getPerson(id: number): Promise<PersonResponse> {
    return new Promise<PersonResponse>((resolve, reject) => {
      const request = new PersonRequest();
      request.setId(id);
      this.personClient.getPerson(
        request,
        (err: grpc.ServiceError | null, data: PersonResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
