import { HouseClient } from "../../grpcClient/houseClient";
import { PersonClient } from "../../grpcClient/personClient";

export interface CustomDataSources {
  houseService: HouseClient;
  personService: PersonClient;
}
