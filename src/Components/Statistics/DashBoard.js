import React, { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "antd";

import StudentsUnderSuspension from "./StudentsUnderSuspension";
import LeavesDuration from "./LeavesDuration";
import VisitorsData from "./VisitorsData";
import LeavesApplied from "./LeavesApplied";
import PeopleInAndOut from "./PeopleInAndOut";
import DormAndLeaves from "./DormAndLeaves";
import { Modal } from "antd";
import SuspendListDisplayComponent from "../AdminDashboard/SuspendListDisplayComponent";
import { useUnderSuspensionQuery } from "../../Slices/dashboardApiSlice";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../Slices/refreshSlice";
import TotalDayScholar from "./TotalDayScholar";
import TotalHostlers from "./TotalHostlers";
import Footer from "../Footer";
const DashBoard = () => {
  const [searchTerm, setSearchTermInChild] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshClicked, setRefreshClicked] = useState(false);
  const dispatch = useDispatch();
  const resetSearchTermInChild = () => {
    setSearchTermInChild("");
  };
  const { isError, setIsError } = useState(false);

  const onClickRefresh = () => {
    // let num = 0;
    // if (num < 0) {
    //   dispatch(setRefresh(true));
    //   num = num + 1;
    // } else if (num === 1) {
    //   dispatch(setRefresh(false));
    // }
    dispatch(setRefresh(true));
    setTimeout(() => {
      dispatch(setRefresh(false));
    }, [1000]);
  };

  return (
    <>
      <Modal
        style={{
          top: 50,
        }}
        title="Suspension List"
        contentLabel="Edit Modal"
        footer={null}
        centered
        shouldCloseOnOverlayClick={false}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          resetSearchTermInChild();
        }}
        okButtonProps={{
          disabled: true,
        }}
      >
        <SuspendListDisplayComponent onModalClose={resetSearchTermInChild} />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => {
              setIsModalOpen(false);
              resetSearchTermInChild();
            }}
            type="primary"
            ghost
          >
            Close
          </Button>
        </div>
      </Modal>
      <Row>
        <Col style={{ paddingLeft: "50px" }} md={24}>
          <Button onClick={onClickRefresh}>Refresh </Button>
        </Col>
        <Col onClick={() => setIsModalOpen(true)} span={6}>
          <StudentsUnderSuspension />
        </Col>
        <Col span={6}>
          <LeavesDuration />
        </Col>
        <Col span={6}>
          <VisitorsData />
        </Col>
        <Col span={6}>
          <LeavesApplied />
        </Col>
        <Col span={6}>
          <TotalDayScholar />
        </Col>
        <Col span={6}>
          <TotalHostlers />
        </Col>
      </Row>
      <Row style={{ gap: "50px", marginTop: "60px" }}>
        <Col span={24}>
          <PeopleInAndOut />
        </Col>
        <Col span={24}>
          <DormAndLeaves />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default DashBoard;
