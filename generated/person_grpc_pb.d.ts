// package: personservice
// file: person.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as person_pb from "./person_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

interface IPersonServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getPerson: IPersonServiceService_IGetPerson;
    getPersons: IPersonServiceService_IGetPersons;
}

interface IPersonServiceService_IGetPerson extends grpc.MethodDefinition<person_pb.PersonRequest, person_pb.PersonResponse> {
    path: "/personservice.PersonService/GetPerson";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<person_pb.PersonRequest>;
    requestDeserialize: grpc.deserialize<person_pb.PersonRequest>;
    responseSerialize: grpc.serialize<person_pb.PersonResponse>;
    responseDeserialize: grpc.deserialize<person_pb.PersonResponse>;
}
interface IPersonServiceService_IGetPersons extends grpc.MethodDefinition<person_pb.PersonsRequest, person_pb.PersonsResponse> {
    path: "/personservice.PersonService/GetPersons";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<person_pb.PersonsRequest>;
    requestDeserialize: grpc.deserialize<person_pb.PersonsRequest>;
    responseSerialize: grpc.serialize<person_pb.PersonsResponse>;
    responseDeserialize: grpc.deserialize<person_pb.PersonsResponse>;
}

export const PersonServiceService: IPersonServiceService;

export interface IPersonServiceServer {
    getPerson: grpc.handleUnaryCall<person_pb.PersonRequest, person_pb.PersonResponse>;
    getPersons: grpc.handleUnaryCall<person_pb.PersonsRequest, person_pb.PersonsResponse>;
}

export interface IPersonServiceClient {
    getPerson(request: person_pb.PersonRequest, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    getPerson(request: person_pb.PersonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    getPerson(request: person_pb.PersonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    getPersons(request: person_pb.PersonsRequest, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
    getPersons(request: person_pb.PersonsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
    getPersons(request: person_pb.PersonsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
}

export class PersonServiceClient extends grpc.Client implements IPersonServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getPerson(request: person_pb.PersonRequest, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    public getPerson(request: person_pb.PersonRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    public getPerson(request: person_pb.PersonRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: person_pb.PersonResponse) => void): grpc.ClientUnaryCall;
    public getPersons(request: person_pb.PersonsRequest, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
    public getPersons(request: person_pb.PersonsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
    public getPersons(request: person_pb.PersonsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: person_pb.PersonsResponse) => void): grpc.ClientUnaryCall;
}
