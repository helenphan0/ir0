import { useMemo, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import styled from "styled-components";

import FB from "firebaseApi";
import { IData, IDataQuery, ISelectOptions } from "models/common";

const collections = FB.firestoreSchema as any;

const GetCard = styled(({ ...props }) => {
  const [form] = Form.useForm();
  const [dataQuery, setDataQuery] = useState<IDataQuery>({} as any);
  const [collectionData, setCollectionData] = useState<IData | null>();

  const collectionOptions = Object.keys(collections).reduce(
    (options: ISelectOptions[], collectionKey: string) => {
      const { key } = collections[collectionKey];
      return [...options, { label: key, value: key }];
    },
    []
  );

  const subCollections = useMemo(
    () => collections[dataQuery.collectionKey]?.collections,
    [dataQuery.collectionKey]
  );

  const subCollectionOptions =
    subCollections &&
    Object.keys(subCollections).reduce(
      (subOptions: ISelectOptions[], subCollectionKey: string) => {
        const { key } = subCollections[subCollectionKey];
        return [...subOptions, { label: key, value: key }];
      },
      []
    );

  const getData = async () => {
    setCollectionData(null);

    try {
      const values = await form.validateFields();
      const { collectionKey } = dataQuery;
  
      if (collectionKey) {
        try {
          const data = await FB.getCollectionData(values);
          setCollectionData(data || { message: "No results found" });
        } catch (err) {
          message.error(err.message);
        }
      }
    } catch (e) {
      if (e.message) {
        message.error(e.message);
        return;
      }
    }
  };

  const onFormChange = (
    formChange: { [key: string]: string },
    formData: IDataQuery
  ) => {
    const updatedForm = {
      ...formData,
      ...(formChange.hasOwnProperty("collectionKey")
        ? { subCollectionKey: "" }
        : {}),
    };
    form.setFieldsValue(updatedForm);
    setDataQuery(updatedForm);
  };

  return (
    <Card title="GET" className="dashboard-card" {...props}>
      <div>
        <Form
          className="dataquery-form"
          layout="inline"
          form={form}
          initialValues={{
            collectionKey: "",
            collectionValue: "",
            subCollectionKey: "",
            subCollectionValue: "",
          }}
          onValuesChange={onFormChange}
        >
          <Form.Item
            name="collectionKey"
            rules={[{ required: true, message: "Select a colection" }]}
          >
            <Select
              allowClear={true}
              style={{ minWidth: "10rem" }}
              options={collectionOptions}
            />
          </Form.Item>
          {dataQuery?.collectionKey && (
            <Form.Item
              name="collectionValue"
              required={true}
              dependencies={["collectionKey"]}
              rules={[{ required: true, message: "Enter a document id" }]}
            >
              <Input className="collection-key-value" />
            </Form.Item>
          )}
          {subCollectionOptions && (
            <Form.Item name="subCollectionKey" dependencies={["collectionKey"]}>
              <Select
                allowClear={true}
                style={{ minWidth: "10rem" }}
                options={subCollectionOptions}
              />
            </Form.Item>
          )}
          {dataQuery?.subCollectionKey && (
            <Form.Item
              name="subCollectionValue"
              dependencies={["collectionKey", "collectionValue"]}
            >
              <Input className="collection-key-value" placeholder="abcd-1010" />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" onClick={getData}>
              GET
            </Button>
          </Form.Item>
        </Form>
      </div>
      <section className="collection-results">
        <p>
          {dataQuery.collectionKey}
          {dataQuery.collectionKey ? "/" : ""}
          {dataQuery.collectionValue}
          {dataQuery.subCollectionKey ? "/" : ""}
          {dataQuery.subCollectionKey}
          {dataQuery.subCollectionKey ? "/" : ""}
          {dataQuery.subCollectionValue}
        </p>
        <pre className="code-block">
          {collectionData && JSON.stringify(collectionData, null, 2)}
        </pre>
      </section>
    </Card>
  );
})`
  .collection-key-value {
    display: inline-flex;
    width: 23rem;
  }

  .collection-results {
    margin: 1rem 0;
    padding: 1rem;
    background-color: rgba(250, 250, 250);
  }

  .code-block {
    white-space: pre-wrap;
  }
`;

export default GetCard;
