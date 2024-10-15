import React from "react";
import { Card, Divider, Col, Row } from "antd";

function Instructions() {
  return (
    <div>
      <Card title="Instructions" bordered={false}>
        <div style={{ float: "left", textAlign: "left" }}>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h4>Do's: </h4>
              1) The pass must be issued atleast 24hrs prior from actual entry.
              <br />
              2) Note that the pass is valid for only 48hrs.
              <br />
              3) Visitors are allowed only during office timings.
              <br />
              4) Approval to enter into campus is mandatory.
              <br />
              5) On-Spot pass issue is available at the Entrance Gate.
              <br />
              6) Vistors must carry vaccinated certificate or RT-PCR test report
              (valid before 48 hrs - 72 hrs). <br />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h4>Dont's:</h4>
              1) Kindly avoid telephonic approach until necessary.
              <br />
              2) Parents/ Drivers/ Relatives/ Gaurdians are not permitted beyond
              hostel reception.
              <br />
              3) Visiting staff members directly is prohibited without
              appointment. Please take help from security desk.
              <br />
              4) No photography is allowed inside the Administrative building.
            </Col>
          </Row>
        </div>
        <Divider>Address</Divider>
        Mahindra University, Survey No: 62/1A, Bahadurpally Jeedimetla,
        Hyderabad - 500043 - Telangana, INDIA.
        <Divider>Contact Details</Divider>
        <h4>Major General Sukesh Rakshit (Retired)</h4>
        <a class="dark" href="mailto:sukesh.rakshit@mahindrauniversity.edu.in">
          sukesh.rakshit@mahindrauniversity.edu.in
        </a>
        {/* sukesh.rakshit@mahindrauniversity.edu.in */}
        <br />
        +91-7075098502
        <br />
        <br />
        <h4>Venu Gopala Raju Dandu</h4>
        <a
          class="dark"
          href="mailto:venugopala.dandu@mahindrauniversity.edu.in"
        >
          venugopala.dandu@mahindrauniversity.edu.in
        </a>
        <br />
        +91-7075098502
        <br />
      </Card>
    </div>
  );
}

export default Instructions;
