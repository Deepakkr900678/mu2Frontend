import React, { useEffect, useState } from "react";
import { Table, Space, Button, Row, Col, Divider, Result } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "../Approval/ApprovalTable.css";
import { useFetchPastApprovedLeavesQuery } from "../../Slices/appliedLeavesApiSlice";
import SearchComponent from "../SearchComponent/SearchComponent";
import { GetScreenSizes } from "../ScreenSizes";
import Footer from "../Footer";
const { Column, ColumnGroup } = Table;

const PastLeaveApprovalTable = (props) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useFetchPastApprovedLeavesQuery(
    {
      keyword,
      page,
    }
  );
  const activeTab = useSelector((state) => state.key.activekey);
  const { isSmallScreen, isLargeScreen, isMediumScreen } = GetScreenSizes();

  useEffect(() => {
    const id = setInterval(() => {
      if (activeTab === "past") {
        refetch();
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        {" "}
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
          />
        </div>
      </div>
    );
  }

  const tableData = data?.past_approved_leaves || [];

  const sortedData = [...tableData].sort(
    (a, b) => new Date(b.ASN_DATE) - new Date(a.ASN_DATE)
  );

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

  const handleRefetch = (searchTerm) => {
    setKeyword(searchTerm);
    refetch();
  };
  const handleTableChange = (pagination) => {
    if (pagination && pagination.current) {
      setPage(pagination.current);
    }
    refetch();
  };

  return (
    <div className="approval-table-container">
      <Row
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Col xs={24} md={7} lg={8}>
          <h2
            style={{
              textAlign: isSmallScreen || isMediumScreen ? "center" : "left",
              fontFamily: "Montserrat",
            }}
          >
            Past Leave Approvals
          </h2>
        </Col>

        <Col xs={24} md={10} lg={8}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SearchComponent onSearch={handleRefetch} activeTab={activeTab} />
          </div>
        </Col>
      </Row>
      <Table
        dataSource={sortedData}
        className="custom-table"
        style={{ overflowX: "auto", minHeight: "60vh" }}
        pagination={{
          defaultPageSize: "10",
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          total: data?.totalPages * 10,
        }}
        onChange={handleTableChange}
      >
        <Column title="Token ID" dataIndex="TOKEN" key="TOKEN" />
        {!isSmallScreen && (
          <ColumnGroup title="Info">
            <Column
              title="HTNO"
              dataIndex="HTNO"
              key="HTNO"
              sorter={(a, b) => a.HTNO.localeCompare(b.HTNO)}
              sortDirections={["ascend", "descend"]}
            />
            <Column
              title="STUDENT NAME"
              dataIndex="STUDENT_NAME"
              key="STUDENT_NAME"
              sorter={(a, b) => a.STUDENT_NAME.localeCompare(b.STUDENT_NAME)}
              sortDirections={["ascend", "descend"]}
            />
          </ColumnGroup>
        )}
        {isSmallScreen && (
          <Column
            title="STUDENT Info"
            dataIndex="STUDENT_NAME"
            key="STUDENT_NAME"
            sorter={(a, b) => a.STUDENT_NAME.localeCompare(b.STUDENT_NAME)}
            sortDirections={["ascend", "descend"]}
            render={(text, record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px" }}>
                  <div>{record.STUDENT_NAME}</div>
                  <Divider style={{ margin: 0, backgroundColor: "black" }} />
                  <div>{record.HTNO}</div>
                </div>
              </div>
            )}
          />
        )}
        <Column
          title="Applied On"
          dataIndex="ASN_DATE"
          key="ASN_DATE"
          sorter={(a, b) => new Date(a.ASN_DATE) - new Date(b.ASN_DATE)}
          sortDirections={["ascend", "descend"]}
          render={(text) => formatDateTime(text)}
        />
        {isSmallScreen && (
          <Column
            title="Date Range"
            dataIndex="DATE_RANGE"
            key="DATE_RANGE"
            sorter={(a, b) => new Date(a.FROM) - new Date(b.FROM)}
            sortDirections={["ascend", "descend"]}
            render={(text, record) => (
              <span>
                <div>{`From: ${
                  formatDateTime(record.FROM).split(",")[0]
                }`}</div>
                <div>{`To: ${formatDateTime(record.TO).split(",")[0]}`}</div>
              </span>
            )}
          />
        )}
        {!isSmallScreen && (
          <>
            <Column
              title="From"
              dataIndex="FROM"
              key="FROM"
              sorter={(a, b) => new Date(a.FROM) - new Date(b.FROM)}
              sortDirections={["ascend", "descend"]}
              render={(text) => formatDateTime(text)}
            />
            <Column
              title="To"
              dataIndex="TO"
              key="TO"
              sorter={(a, b) => new Date(a.TO) - new Date(b.TO)}
              sortDirections={["ascend", "descend"]}
              render={(text) => formatDateTime(text)}
            />
          </>
        )}
        <Column title="Reason for Leave" dataIndex="REASON" key="REASON" />
        <Column
          title="Approved"
          dataIndex="APPROVED"
          key="APPROVED"
          render={(text) => (
            <span
              style={{
                color: text === "True" ? "green" : "red",
              }}
            >
              {text === "True" ? "Accepted" : "Rejected"}
            </span>
          )}
        />
        {/* <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="link">View More</Button>
            </Space>
          )}
        /> */}
      </Table>
      <Footer />
    </div>
  );
};

export default PastLeaveApprovalTable;
