import React, { useEffect, useState } from "react";
import { Table, Space, Button, Divider, Col, Row, Result } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useFetchStudentByIdQuery } from "../../Slices/studentApiSlice";
import { setVisible } from "../../Slices/visibleSlice";
import { useFetchSecuritiesQuery } from "../../Slices/securityApiSlice";
import "../Approval/ApprovalTable.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import { GetScreenSizes } from "../ScreenSizes";
import SuspendListDisplayComponent from "../AdminDashboard/SuspendListDisplayComponent";
import TotalInAndOut from "../TotalInAndOut";
import { Modal } from "antd";

//Footer import
import Footer from "../Footer";

const { Column, ColumnGroup } = Table;
const InOutTabe = (props) => {
  const dispatch = useDispatch();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const id = useSelector((state) => state.auth.userInfo.HTNO);
  const activeKey = useSelector((state) => state.key.activeKey);
  const activeTab = useSelector((state) => state.key.activekey);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: studentInfo,
    isLoading,
    isError,
  } = useFetchStudentByIdQuery(id);

  const {
    data: get_securities,
    isLoading: securitiesLoading,
    isError: securitiesError,
    refetch: refetchSecurities,
  } = useFetchSecuritiesQuery({ keyword, page });
  const [searchTerm, setSearchTermInChild] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetSearchTermInChild = () => {
    setSearchTermInChild("");
  };
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    if (props.tab === "inoutmovement") {
      dispatch(setVisible(false));
      const id = setInterval(() => {
        !isError && refetchSecurities();
      }, 5000);

      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [activeTab]);

  const securities = get_securities?.data || [];

  const hello = [...securities]
    .sort((a, b) => new Date(b.DATE) - new Date(a.DATE))
    .map((item, index) => ({
      ...item,
      serialNumber: index + 1,
    }));

  const getUniqueValues = (data, key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    return uniqueValues.filter(
      (value) => value !== undefined && value !== null
    );
  };

  const movingFilterOptions = getUniqueValues(hello, "MOVING");
  const aTypeFilterOptions = getUniqueValues(hello, "A_TYPE");

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
    refetchSecurities();
  };

  const handleTableChange = (pagination) => {
    if (pagination && pagination.current) {
      setPage(pagination.current);
    }
    refetchSecurities();
  };

  const calculateStartIndex = () => {
    return (page - 1) * 10 + 1;
  };

  const renderSerialNumber = (_, __, index) => {
    return index + calculateStartIndex();
  };

  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  const ManualInOut = async () => {
    try {

      props.manualInOut(studentId);
      window.scroll(0, 0);
      dispatch(setVisible(true));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {isError && (
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
      )}

      {get_securities && (
        <div className="approval-table-container" style={{backgroundColor:"#f8f9ff"}}>
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
            <SuspendListDisplayComponent
              onModalClose={resetSearchTermInChild}
            />
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

          <Row >
            <Col>
              <h2
                style={{
                  textAlign: isSmallScreen ? "center" : "left",
                  fontFamily: "Montserrat",
                }}
              >
                In Out Movement
              </h2>
              <TotalInAndOut />
            </Col>
          </Row>


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
            <Col>
            <h5>Do manual in out</h5>
              <div className="mb-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 15,
                }}
              >
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={handleChange}
                  className="p-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  placeholder="Enter Student ID"
                />

                <Button className="ml-4" onClick={() => ManualInOut()}>
                  Serch Student
                </Button>
              </div>
            </Col>

            <Col style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 15,
                }}>
            
               
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Button onClick={() => setIsModalOpen(true)}>
                  Show Suspended List
                </Button>
                <SearchComponent
                  onSearch={handleRefetch}
                  activeTab={activeTab}
                />
              </div>
            </Col>

          </Row>

          {/* {!isSmallScreen && (
        <Row>
          <Col>
            <h2
              style={{
                width: "50%",
                marginTop: "20px",
                border: "2px solid red",
              }}
            >
              In Out Movement
            </h2>
          </Col>
          <Col>
            <SearchComponent onSearch={handleRefetch} activeTab={activeTab} />
          </Col>
        </Row>
      )} */}
          <Table
            dataSource={hello}
            className="custom-table"
            style={{
              overflowX: "auto",
              minHeight: "60vh",
            }}
            rowClassName={(record) =>
              record.SUSPEND === "Yes" ? "suspended-row" : ""
            } /* Suspended-row Style is in Index.css */
            pagination={{
              defaultPageSize: "10",
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: get_securities?.totalPages * 10,
            }}
            onChange={handleTableChange}
          >
            {!isSmallScreen && (
              <Column
                title="Serial Number"
                dataIndex="serialNumber"
                key="serialNumber"
                width={120}
                sorter={(a, b) => a.serialNumber - b.serialNumber}
                render={renderSerialNumber}
              />
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
                  sorter={(a, b) =>
                    a.STUDENT_NAME.localeCompare(b.STUDENT_NAME)
                  }
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
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <div>{record.STUDENT_NAME}</div>
                      <Divider
                        style={{
                          margin: 0,
                          backgroundColor: "black",
                        }}
                      />
                      <div>{record.HTNO}</div>
                    </div>
                    <Divider
                      type="vertical"
                      style={{
                        height: "70px",
                        backgroundColor: "black",
                        marginRight: "5px",
                        marginLeft: "5px",
                        width: "2px",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {record.MOVING}
                    </div>
                  </div>
                )}
              />
            )}
            {!isSmallScreen && (
              <Column
                title="Moving"
                dataIndex="MOVING"
                key="MOVING"
                sorter={(a, b) => a.MOVING.localeCompare(b.MOVING)}
                sortDirections={["ascend", "descend"]}
                filters={movingFilterOptions.map((value) => ({
                  text: value,
                  value,
                }))}
                onFilter={(value, record) => record.MOVING === value}
                filteredValue={filteredInfo.MOVING}
              />
            )}
            {!isSmallScreen && (
              <Column
                title="Time"
                dataIndex="DATE"
                key="DATE"
                sorter={(a, b) => new Date(a.DATE) - new Date(b.DATE)}
                sortDirections={["ascend", "descend"]}
                render={(text) => formatDateTime(text)}
              />
            )}
            {!isSmallScreen && (
              <Column
                title="Type"
                dataIndex="A_TYPE"
                key="A_TYPE"
                sorter={(a, b) => a.A_TYPE.localeCompare(b.A_TYPE)}
                sortDirections={["ascend", "descend"]}
                filters={aTypeFilterOptions.map((value) => ({
                  text: value,
                  value,
                }))}
                onFilter={(value, record) => record.A_TYPE === value}
                filteredValue={filteredInfo.A_TYPE}
              />
            )}
            {isSmallScreen && (
              <Column
                title="Time & Type"
                dataIndex="DATE"
                key="DATE"
                sorter={(a, b) => new Date(a.DATE) - new Date(b.DATE)}
                sortDirections={["ascend", "descend"]}
                render={(text, record) => (
                  <>
                    <div>{formatDateTime(text)}</div>
                    <Divider style={{ margin: 0, backgroundColor: "black" }} />
                    <div>{record.A_TYPE}</div>
                  </>
                )}
              // responsive={["xs"]} // Specify the screen sizes where both columns should be displayed
              />
            )}
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button
                    type="link"
                    onClick={() => {
                      props.change(record.HTNO, record.TOKEN, record.ASN_DATE);
                      window.scroll(0, 0);
                      dispatch(setVisible(true));
                    }}
                  >
                    View More
                  </Button>
                </Space>
              )}
            />
          </Table>
          <Footer />
        </div>
      )}
    </>
  );
};

export default InOutTabe;
