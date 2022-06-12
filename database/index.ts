import { House } from "../generated/grpcServer/house_pb";
import { Person } from "../generated/grpcServer/person_pb";

// Mock DB
export const allHouse: House.AsObject[] = [
  {
    id: { value: 1 },
    squarefeet: { value: 1200 },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
    isrental: { value: true },
    ownerid: { value: 1 },
    address: {
      housenumber: { value: "123" },
      streetname: { value: "Funny Street" },
    },
  },
  {
    id: { value: 2 },
    squarefeet: { value: 1500 },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
    isrental: { value: true },
    ownerid: { value: 1 },
    address: {
      housenumber: { value: "124" },
      streetname: { value: "Zoo" },
    },
  },
  {
    id: { value: 3 },
    squarefeet: { value: 1700 },
    numberofbedrooms: { value: 3 },
    onsale: { value: true },
    ownerid: { value: 2 },
    address: {
      housenumber: { value: "125" },
      streetname: { value: "ZooYork" },
    },
  },
];

export const allPeople: Person.AsObject[] = [
  {
    id: { value: 1 },
    firstname: { value: "Patrick" },
    lastname: { value: "Desjardins" },
    houseidsList: [{ value: 1 }, { value: 2 }],
  },
  {
    id: { value: 2 },
    firstname: { value: "John" },
    lastname: { value: "Smith" },
    houseidsList: [{ value: 3 }],
  },
];
