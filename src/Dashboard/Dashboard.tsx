import styled from "styled-components";
import { Card } from "antd";

import GetCard from "./getCard/GetCard";

const Dashboard = styled((props) => {
  return (
    <div {...props}>
      <Card className="dashboard-container">
        <GetCard />
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
