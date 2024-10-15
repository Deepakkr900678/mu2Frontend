import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { useMyLeavesQuery } from "../Slices/studentApiSlice";
import { useSelector } from "react-redux";
import { Table } from "antd";
import moment from "moment";

const LeavesForStudent = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const htno = userInfo.HTNO;

  const { data: myLeaves, isLoading, isError } = useMyLeavesQuery({ htno });

  useEffect(() => {
    console.log("myLeaves updated:", myLeaves);
  }, [myLeaves]);

  // Sorting the leaves based on ASN_DATE
  const sortedLeaves = Object.values(myLeaves?.leaves || []).sort((a, b) =>
    moment(b.ASN_DATE).diff(moment(a.ASN_DATE))
  );

  useEffect(() => {
    console.log("sortedLeaves:", sortedLeaves);
  }, [sortedLeaves]);

  const columns = [
    {
      title: "Token",
      dataIndex: "TOKEN",
      key: "TOKEN",
    },
    {
      title: "Reason",
      dataIndex: "REASON",
      key: "REASON",
    },
    {
      title: "Applied On",
      dataIndex: "ASN_DATE",
      key: "ASN_DATE",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "From",
      dataIndex: "FROM",
      key: "FROM",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "To",
      dataIndex: "TO",
      key: "TO",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "APPROVED",
      key: "APPROVED",
      render: (text) =>
        text === "True"
          ? "Approved"
          : text === "False"
          ? "Rejected"
          : "Pending",
    },
  ];

  return (
    <Layout tab={"myLeaves"}>
      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={sortedLeaves}
      />
    </Layout>
  );
};

export default LeavesForStudent;
