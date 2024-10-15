import React, { useState } from "react";
import { Card, Col, Row, message, Modal } from "antd";
import { Button } from "react-bootstrap";

import moment from "moment";
import IdCard from "../IdCardComponent/IdCard";
import IdBack from "../IdCardComponent/IdBack";
import { useUpdateAppliedLeaveMutation } from "../../Slices/appliedLeavesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../../Slices/visibleSlice";
import { useSendMailMutation } from "../../Slices/appliedLeavesApiSlice";
import { GetScreenSizes } from "../ScreenSizes";
import LeaveRejectionModal from "../Modals/LeaveRejectionModal";
const { Meta } = Card;

const DescriptionTable = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.visible.isVisible);
  const user = useSelector((state) => state.auth.userInfo.EMAIL);
  const [updateAppliedLeave] = useUpdateAppliedLeaveMutation();
  const [sendMail] = useSendMailMutation();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const [isOpen, setIsOpen] = useState(false);

  if (props.val === "") {
    return <div>Click "View More" to see details</div>;
  } else {
    const x = props.data;
    async function handleClick(status) {
      props.updateDisplayInTable(x._id);
      dispatch(setVisible(false));
      try {
        await updateAppliedLeave({
          token: x.TOKEN,
          status: status,
          htno: x.HTNO,
          asn: x.ASN_DATE,
          reviewed_by: user,
        });
        await sendMail({
          type: status,
          desc: x.REASON,
          mail: props.studentEmail,
          from: x.FROM,
          to: x.TO,
          token: x.TOKEN,
          warden: x.REVIEWER,
        });

        status === "approved"
          ? message.success(`Leave approved for ${x.HTNO}`)
          : message.warning(`Leave rejected for ${x.HTNO}`);

        props.triggerFunction({
          htno: x.HTNO,
          asnDate: x.ASN_DATE,
          token: x.TOKEN,
        });
      } catch (error) {
        message.error("Error updating applied leave. Please try again.");
      }
    }

    function formatDateTime(dateTimeString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formattedDate = new Date(dateTimeString).toLocaleString(
        undefined,
        options
      );
      return formattedDate;
    }

    const onClose = () => {
      setIsOpen(false);
    };

    return (
      <>
      {isVisible && isLargeScreen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
          <Row gutter={16} align="middle" justify="space-around">
            <Col>
              <Card hoverable bordered>
                <IdCard data={x} />
              </Card>
            </Col>
            <Col>
              <Card hoverable bordered style={{ width: isSmallScreen ? "400px" : "500px" }}>
                <IdBack data={x} />
              </Card>
            </Col>
          </Row>

          <Row justify="center" gutter={16}>
            <Col>
              <Button
                type="primary"
                onClick={() => handleClick("approved")}
                style={{ marginRight: "5px" }}
              >
                Approve Leave
              </Button>
            </Col>
            <Col>
              <Button type="danger" onClick={() => setIsOpen(true)}>
                Reject Leave
              </Button>
            </Col>
          </Row>
        </div>
      )}

      <Modal
        visible={isOpen}
        onCancel={onClose}
        footer={null}
        title="Reject Leave"
      >
        <LeaveRejectionModal onClose={onClose} isOpen={isOpen} />
      </Modal>

      {isVisible && (isMediumScreen || isSmallScreen) && (
        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
          <Col xs={24} md={12}>
            <Card hoverable bordered>
              <IdCard data={x} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card hoverable bordered>
              <IdBack data={x} />
            </Card>
          </Col>
          <Col xs={24}>
            <Button
              type="primary"
              onClick={() => handleClick("approved")}
              style={{ marginRight: "5px" }}
              block
            >
              Approve Leave
            </Button>
            <Button type="danger" onClick={() => setIsOpen(true)} block>
              Reject Leave
            </Button>
          </Col>
        </Row>
      )}
    </>
    );
  }
};

export default DescriptionTable;
