import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Fields from "../Fields/Fields";

import { Button, Row, Col } from "antd";
import "./TopNavBar.css";
import Instructions from "../Instructions/Instructions.js";

const { Header, Content, Footer } = Layout;

function TopNavBar() {
  return (
    <div>
      <Layout className="layout">
        <Header style={{ backgroundColor: "#FAFAFA" }}>
          <div>
            <a href="https://www.mahindrauniversity.edu.in/">
              {/* <img
                className="img"
                alt=""
                src={mu}
                width="160px"
                height="55px"
              /> */}
            </a>

            <h2>Visitors Pass MU </h2>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Row>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Fields />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Instructions />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>MU ©2021</Footer>
      </Layout>
    </div>
  );
}

export default TopNavBar;
