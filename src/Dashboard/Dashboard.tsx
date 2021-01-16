import { useMemo, useState } from "react";
import styled from "styled-components";
import { Select, Card, Input } from "antd";

import schemas from "../firebaseSchemas";
import { ISelectOptions } from "../models/common";

const collections = schemas.fireStoreSchema as any;

const Dashboard = styled((props) => {
  const [collection, setCollection] = useState({} as any);

  const collectionOptions = Object.keys(collections).reduce(
    (options: ISelectOptions[], collection: string) => {
      const { key } = collections[collection];
      return [...options, { label: key, value: key }];
    },
    []
  );

  const minorCollections = useMemo(
    () => collections[collection.collectionKey]?.collections,
    [collection.collectionKey]
  );

  const minorCollectionOptions =
    minorCollections &&
    Object.keys(minorCollections).reduce(
      (minorOptions: ISelectOptions[], minorCollection: string) => {
        const { key } = minorCollections[minorCollection];
        return [...minorOptions, { label: key, value: key }];
      },
      []
    );

  const onSelectChange = (key: string) => (value: string) => {
    setCollection({
      ...collection,
      [key]: value,
    });
  };

  const onInputChange = (key: string) => ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCollection({
      ...collection,
      [key]: value,
    });
  };

  return (
    <div {...props}>
      <Card className="dashboard-container">
        <Card title="GET" className="dashboard-card">
          <Select
            allowClear={true}
            style={{ minWidth: "10rem" }}
            options={collectionOptions}
            onChange={onSelectChange("collectionKey")}
          />
          {collection?.collectionKey && (
            <Input
              className="collection-key-value"
              onChange={onInputChange("collectionValue")}
            />
          )}
          {minorCollectionOptions && (
            <Select
              allowClear={true}
              style={{ minWidth: "10rem" }}
              options={minorCollectionOptions}
              onChange={onSelectChange("minorCollectionKey")}
            />
          )}
          {collection?.minorCollectionKey && (
            <Input
              className="collection-key-value"
              placeholder="abcd-1010"
              onChange={onInputChange("minorCollectionKeyValue")}
            />
          )}
        </Card>
      </Card>
    </div>
  );
})`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 1rem;

  .dashboard-container {
    width: 100%;
    text-align: left;
  }

  .collection-key-value {
    display: inline-flex;
    width: 12rem;
  }
`;

export default Dashboard;
