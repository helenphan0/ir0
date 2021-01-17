export interface IData {
  [key: string]: any
}

export interface IDataQuery {
  collectionKey: string;
  collectionValue: string;
  subCollectionKey?: string;
  subCollectionValue?: string;
}
