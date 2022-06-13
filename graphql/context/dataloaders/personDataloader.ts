import DataLoader from "dataloader";

import { Person } from "../../../generated/grpcServer/person_pb";
import { CustomDataSources } from "../../datasources";

export class PersonDataloader {
  public getPerson: DataLoader<number, Person | undefined>;
  public getPersons: DataLoader<number[], (Person | undefined)[]>;

  public constructor(private dataSources: CustomDataSources) {
    this.getPerson = new DataLoader<number, Person | undefined>(
      async (ids: readonly number[]) => {
        if (ids.length === 1) {
          const result = await this.dataSources.personService.getPerson(ids[0]);
          return [result.getPerson()];
        } else {
          const result = await this.dataSources.personService.getListPerson(
            ids as number[]
          );
          const unOrderedResult = result.getPersonList();
          // must return items in the same order as input array
          const orderedResult = orderArrayPayloadWithInput(
            ids,
            unOrderedResult,
            (p: Person, id: number): boolean => {
              return p.getId()?.getValue() === id;
            }
          );
          return orderedResult;
        }
      },
      {
        batch: true,
        cacheKeyFn: (k: number) => {
          return k;
        },
      }
    );

    this.getPersons = new DataLoader<number[], (Person | undefined)[]>(
      async (ids: readonly number[][]) => {
        const result = await this.dataSources.personService.getListPerson(
          ids[0]
        );
        const unOrderedResult = result.getPersonList();
        const orderedResult = orderArrayPayloadWithInput(
          ids[0],
          unOrderedResult,
          (p: Person, id: number): boolean => {
            return p.getId()?.getValue() === id;
          }
        );
        orderedResult.forEach((o) => {
          const id = o?.getId()?.getValue();
          if (id !== undefined) {
            this.getPerson.prime(id, o);
          }
        });
        return [orderedResult];
      },
      { batch: false }
    );
  }
}

export function orderArrayPayloadWithInput<T, P>(
  inputs: readonly T[],
  responses: P[],
  predicate: (item: P, input: T) => boolean
): (P | undefined)[] {
  const orderedArray: (P | undefined)[] = [];
  inputs.forEach((input: T) => {
    const payload = responses.find((response) => predicate(response, input));
    orderedArray.push(payload); // Good if undefined as well, means we do not have a response
  });
  console.assert(
    inputs.length === orderedArray.length,
    "Returned array must be the same size of the input array",
    { inputLength: inputs.length, outputLength: orderedArray.length }
  );
  return orderedArray;
}
