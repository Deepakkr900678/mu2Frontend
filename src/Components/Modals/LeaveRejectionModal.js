import { Modal } from "antd";

import React, { useState } from "react";

const LeaveRejectionModal = ({ isOpen, onCancel, onOk }) => {
  const [reason , setReason] = useState("")

  const onClickOk = () => {
    onOk("done")
  }

  return <Modal open={isOpen} onCancel={onCancel} onOk={onOk}>
    Please Mention Reason for Rejection:
    <input onChange={(e)=>setReason(e.target.value) } />
  </Modal>
};

export default LeaveRejectionModal;
