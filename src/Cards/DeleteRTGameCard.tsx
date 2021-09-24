import React, { useContext, useState } from "react";
import { Button, Card, Form, Input, Select, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import firebase from "firebase";

import { FirebaseContext } from "../Contexts";
import FB from "../firebaseApi";
import { IDataQuery, ISelectOptions } from "../models/common";

const collections = FB.realtimeDbSchema as any;

export const DeleteRTGameCard = styled(({ ...props }): JSX.Element => {
  const [form] = Form.useForm();

  const [dataQuery, setDataQuery] = useState<IDataQuery>({} as any);
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

  const clearValue = () => {
    const updatedForm = { ...form.getFieldsValue(), collectionValue: "" };

    form.setFieldsValue(updatedForm);
    setDataQuery(updatedForm);
  };

  const setData = async () => {
    try {
      const values = await form.validateFields();
      const { collectionKey, collectionValue } = values || {};

      const valuesList = collectionValue
        .split(",")
        .map((id: string) => id.trim());

      try {
        const deletePromises = valuesList.map((id: string) =>
          id ? realtime.ref(`${collectionKey}/${id}`).set(null) : null
        );

        await Promise.all(deletePromises);
        clearValue();

        message.success("Deleted successfully!");
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
              rules={[{ required: true, message: "Enter an id" }]}
            >
              <Input.TextArea
                rows={3}
                className="collection-key-value"
                placeholder="Add a single value, or a list of values separated by comma"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Tooltip title="delete">
              <Button
                type="default"
                icon={<DeleteOutlined />}
                onClick={setData}
                disabled={
                  !dataQuery?.collectionKey && !dataQuery?.collectionValue
                }
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
})`
  .collection-key-value {
    display: inline-flex;
    width: 23rem;
  }
`;

export default DeleteRTGameCard;
