import React from "react";
import { Button, Card, Form, Input } from "antd";

import FB from "../firebaseApi";

const LoginCard = () => {
  const [form] = Form.useForm();

  const onFinish = async (form: any) => {
    await FB.signIn(form);
  };

  return (
    <Card>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please fill this out" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please fill this out" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginCard;
