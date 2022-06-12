import { CustomDataSources } from "../datasources";
import { DataLoaders } from "./dataloaders";

export interface CustomContext {
  loaders: DataLoaders;
  dataSources: CustomDataSources;
}
