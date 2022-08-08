import React from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "@zendeskgarden/react-grid";
import { MD } from "@zendeskgarden/react-typography";

export default function Main({ data }) {
  return <AppView data={data} />;
}

function View({ className, data }) {
  const { userId, userName} = data;

  return (
    <div className={className}>
      <Grid>
        <Row>
          <Col>
            <MD>User ID: {userId}</MD>
          </Col>
          <Col>
            <MD>User Name: {userName}</MD>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

const AppView = styled(View)`
  #primaryResults {
    flex: 1;
    overflow-y: auto;
  }

  #primaryView {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;
