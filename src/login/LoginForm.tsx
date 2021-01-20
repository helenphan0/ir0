import React from "react";
import { Button, Card, Form, Input } from "antd";

import FB from "../firebaseApi";

const LoginCard = ({ loadFs }: { loadFs: (fs: any) => void }) => {
  const [form] = Form.useForm();

  const onFinish = async (form: any) => {
    const { firestore } = await FB.initializeFirebase(form);
    loadFs(firestore);
  };

  return (
    <Card>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginCard;
