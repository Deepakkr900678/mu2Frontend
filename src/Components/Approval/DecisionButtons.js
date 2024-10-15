// ApprovalButtons.js
import React from "react";
import { Button } from "react-bootstrap";
import { useUpdateAppliedLeaveMutation } from "../../Slices/appliedLeavesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../../Slices/visibleSlice";
import { message } from "antd";

const DecisionButtons = ({ data, triggerFunction }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.visible.isVisible);
  const [updateAppliedLeave] = useUpdateAppliedLeaveMutation();

  async function handleClick(status) {
    dispatch(setVisible(false));
    try {
      await updateAppliedLeave({
        token: data.TOKEN,
        status: status,
        htno: data.HTNO,
        asn: data.ASN_DATE,
      });

      status === "approved"
        ? message.success(`Leave approved for ${data.HTNO}`)
        : message.warning(`Leave rejected for ${data.HTNO}`);

      triggerFunction({
        htno: data.HTNO,
        asnDate: data.ASN_DATE,
        token: data.TOKEN,
      });
    } catch (error) {
      message.error(error);
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="success"
          style={{ padding: "4px", width: "100%", marginBottom: "10px" }}
          onClick={() => handleClick("approved")}
        >
          <strong>Approve</strong>
        </Button>

        <Button
          variant="danger"
          style={{ padding: "4px", width: "100%" }}
          onClick={() => handleClick("rejected")}
        >
          <strong>Reject</strong>
        </Button>
      </div>
    </>
  );
};

export default DecisionButtons;
