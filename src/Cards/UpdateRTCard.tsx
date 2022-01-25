import React, { useContext, useMemo, useState } from "react";
import { Button, Card, Form, Input, Select, Tooltip, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import styled from "styled-components";
import firebase from "firebase";

import { DataContext, FirebaseContext } from "../Contexts";
import DataApi from "../dataApi/dataApi";
import FB from "../firebaseApi";
import CollectionDataBox from "../CollectionDataBox/CollectionDataBox";
import { IDataQuery, ISelectOptions } from "../models/common";

const collections = FB.realtimeDbSchema as any;

export const UpdateRTCard = styled(({ ...props }): JSX.Element => {
  const [form] = Form.useForm();

  const [dataQuery, setDataQuery] = useState<IDataQuery>({} as any);
  const { dataApi } = useContext(DataContext) as { dataApi: DataApi };
  const { realtime } = useContext(FirebaseContext) as {
    realtime: firebase.database.Database;
  };

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

  const clearValue = () => {
    const updatedForm = {
      ...form.getFieldsValue(),
      collectionValue: "",
      subCollectionValue: "",
    };

    form.setFieldsValue(updatedForm);
    setDataQuery(updatedForm);
  };

  const setData = async () => {
    try {
      const values = await form.validateFields();
      const {
        collectionKey,
        collectionValue,
        subCollectionKey,
        subCollectionValue,
      } = values || {};

      if (subCollectionKey && !subCollectionValue) return;

      let updateRef = realtime.ref(`${collectionKey}/${collectionValue}`);
      if (subCollectionKey && subCollectionValue) {
        updateRef = updateRef.child(
          `${subCollectionKey}/${subCollectionValue}`
        );
      }

      const updateValue = dataApi.getSaveData();

      try {
        if (!updateValue || !Object.keys(updateValue).length) return;

        await updateRef.update(updateValue)

        message.success("Updated successfully!");
      } catch (err) {
        message.error(err.message);
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
              rules={[{ required: true, message: "Enter a field key" }]}
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
            <Tooltip title="update">
              <Button
                type="default"
                icon={<SaveOutlined />}
                onClick={setData}
                disabled={
                  !dataQuery?.collectionKey && !dataQuery?.collectionValue
                }
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </div>

      <CollectionDataBox editable={true} dataQuery={dataQuery} />
    </Card>
  );
})`
  .collection-key-value {
    display: inline-flex;
    width: 23rem;
  }
`;

export default UpdateRTCard;
