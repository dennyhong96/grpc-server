import { CustomDataSources } from "../../datasources";
import { HouseDataloader } from "./houseDataloader";
import { PersonDataloader } from "./personDataloader";

export class DataLoaders {
  private person: PersonDataloader;
  private house: HouseDataloader;

  public constructor(dataSources: CustomDataSources) {
    this.person = new PersonDataloader(dataSources);
    this.house = new HouseDataloader(dataSources);
  }

  get Person() {
    return this.person;
  }

  get House() {
    return this.house;
  }
}
