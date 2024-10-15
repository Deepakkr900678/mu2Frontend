import React from "react";

import { Descriptions, Button } from "antd";
import { connect } from "react-redux";

const PassDescription = (props) => {
  if (!props.visitor[0]) {
    return null;
  }

  const item = props.visitor[0].desc;

  return (
    <div>
      <Descriptions title="Pass Information">
        <Descriptions.Item label="Pass number">
          {item.PASS_NO}
        </Descriptions.Item>
        <Descriptions.Item label="Visitors Name">
          {item.VISITORS_NAME}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Student Name ,HTNO">
          {" "}
          {item.STUDENT_NAME} - {item.HTNO}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{item.EMAIL}</Descriptions.Item>
        <Descriptions.Item label="PhNo">{item.PHNO}</Descriptions.Item>
        <Descriptions.Item label="Vehicle Number">
          {item.VEHICLE_NO}
        </Descriptions.Item>
        <Descriptions.Item label="Coming from">{item.FROM}</Descriptions.Item>
        <Descriptions.Item label="Date">{item.DATE}</Descriptions.Item>
        <Descriptions.Item label="Meet">{item.MEET}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Button type="primary">In</Button>
          <Button type="primary">Out</Button>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    visitor: state.visitor,
  };
};

export default connect(mapStateToProps, null)(PassDescription);
