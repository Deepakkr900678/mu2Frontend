import React from "react";
import { Col, Row, Button } from "antd";

import SearchComponent from "./SearchComponent/SearchComponent";
import { GetScreenSizes } from "./ScreenSizes";

const TableHead = () => {
  const { isSmallScreen } = GetScreenSizes();
  return (
    <Row
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Col xs={24} md={7} lg={8}>
        <h2
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontFamily: "Montserrat",
          }}
        >
          Applied Leaves
        </h2>
      </Col>

      <Col xs={24} md={10} lg={8}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button>Filter Button</Button>
          <SearchComponent />
        </div>
      </Col>
    </Row>
  );
};

export default TableHead;
