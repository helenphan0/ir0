import React, { useMemo, useState } from "react";
import { Button, Card, Form, Input, Select, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

import FB from "../firebaseApi";
import CollectionDataBox from "../CollectionDataBox/CollectionDataBox";
import { IData, IDataQuery, ISelectOptions } from "../models/common";

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
    <Card className="dashboard-card" bordered={false} {...props}>
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
              showArrow={false}
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
                showArrow={false}
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
            <Tooltip title="get">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={getData}
                disabled={!dataQuery.collectionKey || !dataQuery.collectionValue}
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </div>
      <CollectionDataBox dataQuery={dataQuery} collectionData={collectionData} />
    </Card>
  );
})`
  .collection-key-value {
    display: inline-flex;
    width: 23rem;
  }
`;

export default GetCard;
