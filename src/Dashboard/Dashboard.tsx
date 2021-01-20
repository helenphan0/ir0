import styled from "styled-components";
import { Card, Collapse } from "antd";

import GetCard from "../getCard/GetCard";
import UpdateCard from "../updateCard/UpdateCard";

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
