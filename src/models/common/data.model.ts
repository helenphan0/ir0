export interface IData {
  [key: string]: any
}

export interface IDataQuery {
  collectionKey: string;
  collectionValue: string;
  subCollectionKey?: string;
  subCollectionValue?: string;
  updateValue?: IData;
}

export enum DATA_ACTIONS {
  GET = "GET",
  ADD = "ADD",
  UPDATE = "UPDATE",
}
