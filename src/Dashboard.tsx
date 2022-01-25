import React from "react";
import styled from "styled-components";
import { Card, Collapse } from "antd";

import GetCard from "./Cards/GetCard";
import UpdateCard from "./Cards/UpdateCard";
import { DeleteRTCard } from "./Cards/DeleteRTCard";
import { UpdateRTCard } from "./Cards/UpdateRTCard";

export const Dashboard = styled((props) => {
  return (
    <div {...props}>
      <Card className="dashboard-container">
        <Collapse expandIconPosition="right" defaultActiveKey={["1"]}>
          <Collapse.Panel header="GET" key="1">
            <GetCard />
          </Collapse.Panel>
          <Collapse.Panel header="UPDATE" key="2">
            <UpdateCard />
          </Collapse.Panel>
          <Collapse.Panel header="UPDATE-RealTime" key="3">
            <UpdateRTCard />
          </Collapse.Panel>
          <Collapse.Panel header="DELETE-RealTime" key="4">
            <DeleteRTCard />
          </Collapse.Panel>
        </Collapse>
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
`;

export default Dashboard;
