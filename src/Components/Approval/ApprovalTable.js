import React, { useEffect, useState } from "react";
import { Table, Space, Button, Row, Col, Divider, Result, message,Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./ApprovalTable.css";

//New Imports
import { useFetchAppliedLeavesQuery } from "../../Slices/appliedLeavesApiSlice";
import { setVisible } from "../../Slices/visibleSlice";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useParams } from "react-router-dom";

//Responsive table
import { GetScreenSizes } from "../ScreenSizes";
import Filter from "../BlockBasedFilter";

//footer imports
import Footer from "../Footer";

const ApprovalTable = (props) => {
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const { Column, ColumnGroup } = Table;
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const state = useSelector((state) => state);
  const activeTab = state.key.activekey;
  const { keyword: urlkeyword } = useParams();
  const [keyword, setKeyword] = useState(urlkeyword || "");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useFetchAppliedLeavesQuery({
    keyword,
    page,
    selectedBlocks,
  });
  const [newData, setNewData] = useState();

  useEffect(() => {
    if (data) {
      setNewData(data?.applied_leaves);
    }
  }, [data]);

  useEffect(() => {
    const updateDisplayData = () => {
      setNewData((prevData) =>
        prevData?.filter((data) => data._id !== props.removeId)
      );
    };
    updateDisplayData();
  }, [props.removeId]);

  useEffect(() => {
    if (props.tab === "pending") {
      const id = setInterval(() => {
        !isError && refetch();
      }, 5000);
    }
  }, [props.tab, isError, refetch]);

  const dispatch = useDispatch();

  console.log(data?.applied_leaves);

  useEffect(() => {
    refetch();
  }, [selectedBlocks, refetch, keyword]);

  const filterData = (blocks) => {
    setSelectedBlocks(blocks);
  };

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
  };

  useEffect(() => {
    // Check if user has logged in before
    const hasLoggedInBefore = localStorage.getItem("hasLoggedInBefore");
    if (!hasLoggedInBefore) {
      // Display message for first time user
      message.success(`Welcome ${state.auth.userInfo.NAME} ! `);
      // Set flag in local storage to indicate that user has logged in before
      localStorage.setItem("hasLoggedInBefore", true);
    }
  });

  const handleTableChange = (pagination) => {
    if (pagination && pagination.current) {
      setPage(pagination.current);
    }
    dispatch(setVisible(false));
  };

  const findStudentData = (HTNO, TOKEN, ASN_DATE) => {
    let studentData;
    for (let val of data?.applied_leaves || []) {
      if (
        val.HTNO === HTNO &&
        val.TOKEN === TOKEN &&
        val.ASN_DATE === ASN_DATE
      ) {
        studentData = val;
      }
    }
    return studentData;
  };

  return (
    <>
    {isError && (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <Result status="500" title="500" subTitle="Sorry, something went wrong." />
      </div>
    )}
    {data ? (
      <div className="approval-table-container">
        <Row className="mt-5 flex justify-between items-center py-5">
          <Col xs={24} md={7} lg={8}>
            <h2 className="text-2xl font-semibold text-gray-800 text-center md:text-left">
              Applied Leaves 
            </h2>
          </Col>
          <Col xs={24} md={10} lg={8}>
              <Filter data={data?.applied_leaves} onFilter={filterData} />

          </Col>
          <Col>
          <SearchComponent onSearch={handleRefetch} activeTab={activeTab} />
          </Col>
        </Row>
  
        <Table
          className="w-full mt-5 overflow-x-auto min-h-[60vh] custom-table"
          dataSource={newData}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 30],
            total: data?.totalPages * 10,
          }}
          onChange={handleTableChange}
          rowClassName="hover:bg-gray-100 transition duration-200"
        >
          {!isSmallScreen && (
            <Column title="Token ID" dataIndex="TOKEN" key="TOKEN" />
          )}
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
              title="Student Info"
              dataIndex="STUDENT_NAME"
              key="STUDENT_NAME"
              sorter={(a, b) => a.STUDENT_NAME.localeCompare(b.STUDENT_NAME)}
              sortDirections={["ascend", "descend"]}
              render={(text, record) => (
                <div className="text-left">
                  <div>{record.STUDENT_NAME}</div>
                  <Divider className="my-1" />
                  <div className="font-semibold">{record.HTNO}</div>
                </div>
              )}
            />
          )}
          {!isSmallScreen && (
            <Column
              title="Applied On"
              dataIndex="ASN_DATE"
              key="ASN_DATE"
              sorter={(a, b) => new Date(a.ASN_DATE) - new Date(b.ASN_DATE)}
              sortDirections={["ascend", "descend"]}
              render={(text) => formatDateTime(text)}
            />
          )}
          {isSmallScreen && (
            <Column
              title="Date Range"
              dataIndex="DATE_RANGE"
              key="DATE_RANGE"
              sorter={(a, b) => new Date(a.FROM) - new Date(b.FROM)}
              sortDirections={["ascend", "descend"]}
              render={(text, record) => (
                <div>
                  <div>{`From: ${formatDateTime(record.FROM).split(",")[0]}`}</div>
                  <div>{`To: ${formatDateTime(record.TO).split(",")[0]}`}</div>
                </div>
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
            title="Action"
            key="action"
            render={(text, record) => (
              <Space
                className={`flex ${isSmallScreen ? "flex-col" : ""} justify-center items-center`}
                size="middle"
              >
                <Button
                  type="primary"
                  onClick={() => {
                    props.change(findStudentData(record.HTNO, record.TOKEN, record.ASN_DATE));
                    window.scroll(0, 0);
                    dispatch(setVisible(true));
                  }}
                  className="transition duration-200 hover:bg-blue-700"
                >
                  <strong>View More</strong>
                </Button>
              </Space>
            )}
          />
        </Table>
        <Footer />
      </div>
    ) : (
     <div
     style={{
       height: "80vh",
       width: "100%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
     }}
   >
     <Spin spinning={true} size="large"/>
   </div>
    )}
  </>
  );
};

export default ApprovalTable;
