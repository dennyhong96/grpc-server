// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var person_pb = require('./person_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_personservice_PersonRequest(arg) {
  if (!(arg instanceof person_pb.PersonRequest)) {
    throw new Error('Expected argument of type personservice.PersonRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_personservice_PersonRequest(buffer_arg) {
  return person_pb.PersonRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_personservice_PersonResponse(arg) {
  if (!(arg instanceof person_pb.PersonResponse)) {
    throw new Error('Expected argument of type personservice.PersonResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_personservice_PersonResponse(buffer_arg) {
  return person_pb.PersonResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_personservice_PersonsRequest(arg) {
  if (!(arg instanceof person_pb.PersonsRequest)) {
    throw new Error('Expected argument of type personservice.PersonsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_personservice_PersonsRequest(buffer_arg) {
  return person_pb.PersonsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_personservice_PersonsResponse(arg) {
  if (!(arg instanceof person_pb.PersonsResponse)) {
    throw new Error('Expected argument of type personservice.PersonsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_personservice_PersonsResponse(buffer_arg) {
  return person_pb.PersonsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PersonServiceService = exports.PersonServiceService = {
  getPerson: {
    path: '/personservice.PersonService/GetPerson',
    requestStream: false,
    responseStream: false,
    requestType: person_pb.PersonRequest,
    responseType: person_pb.PersonResponse,
    requestSerialize: serialize_personservice_PersonRequest,
    requestDeserialize: deserialize_personservice_PersonRequest,
    responseSerialize: serialize_personservice_PersonResponse,
    responseDeserialize: deserialize_personservice_PersonResponse,
  },
  getPersons: {
    path: '/personservice.PersonService/GetPersons',
    requestStream: false,
    responseStream: false,
    requestType: person_pb.PersonsRequest,
    responseType: person_pb.PersonsResponse,
    requestSerialize: serialize_personservice_PersonsRequest,
    requestDeserialize: deserialize_personservice_PersonsRequest,
    responseSerialize: serialize_personservice_PersonsResponse,
    responseDeserialize: deserialize_personservice_PersonsResponse,
  },
};

exports.PersonServiceClient = grpc.makeGenericClientConstructor(PersonServiceService);
