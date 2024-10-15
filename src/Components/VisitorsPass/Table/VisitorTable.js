import React, { useState } from "react";
import { Table, Button } from "antd";

import { connect } from "react-redux";

const VisitorTable = (props) => {
  var data = new Array();

  if (props.data && props.data.visitors) {
    data = props.data.visitors;
  }

  const columns = [
    {
      title: "PASS NUMBER",
      dataIndex: "PASS_NO",
      width: 50,
      key: "PASS_NO",
    },
    {
      title: "VISITORS NAME",
      dataIndex: "VISITORS_NAME",
      width: 100,
      key: "VISITORS_NAME",
    },
    {
      title: "VEHICLE NUMBER",
      dataIndex: "VEHICLE_NO",
      width: 50,
      key: "VEHICLE_NO",
    },
    {
      title: "DATE",
      dataIndex: "DATE",
      width: 50,
    },
    {
      title: "MEET",
      dataIndex: "MEET",
      width: 70,
    },
  ];

  return (
    <div>
      <h4>Visitors Details</h4>
      <Table
        // style={{ margin: 30 + "px" }}
        className="record-table"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 100 }}
        scroll={{ y: 700 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              props.fetchVisitorData(record);
              window.scrollTo(0, 0);
            }, // click row
          };
        }}
      />
    </div>
  );
};

export default connect(null, { fetchVisitorData: fetchVisitorData })(
  VisitorTable
);
