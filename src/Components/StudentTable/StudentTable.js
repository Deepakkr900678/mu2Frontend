import { useEffect, useState } from "react";
import { Table, Space, Input, DatePicker, Divider, Dropdown } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import { Button, Modal, Switch, Spin, Result, Select } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import block from "./Data/hostel.png";
import room from "./Data/bunk-bed.png";
import idIcon from "../../Data/Icons/IdIcon.png";
import GuardianIcon from "../../Data/Icons/child (1).png";
import School from "../../Data/Icons/school (1).png";
import { GetScreenSizes } from "../ScreenSizes";
import dayjs from "dayjs";
import {
  useSuspendUserMutation,
  useUpdateStudentProfileMutation,
} from "../../Slices/studentApiSlice";
import {
  useSuspensionListQuery,
  useUnderSuspensionQuery,
} from "../../Slices/dashboardApiSlice";
import styled from "styled-components";
import StudentLogo from "../IdCardComponent/studentLogo.png";

// Custom Components
const globalColor = "#e31138";

export const CustomDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconImage = styled.img`
  height: 20px;
  width: 20px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const StudentTable = ({
  data,
  onUpdate,
  isWarden,
  onPageChange,
  totalPages,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModal, setConformationModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [suspendedChecked, setSuspendedChecked] = useState(false);
  const [unSuspendStudent, setUnSuspendStudent] = useState(null);
  const [laptopModal, setLaptopModal] = useState(false);
  const [suspendedDate, setSuspendedDate] = useState(null);
  const [isHostler, setIsHostler] = useState();
  const [changeAtype, setChangeAtype] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState();
  const [selectedRoom, setSeletedRoom] = useState();
  const [updateUser] = useUpdateStudentProfileMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [oldHTNO, setOldHTNO] = useState();
  const [newHTNO, setNewHTNO] = useState();
  const { isSmallScreen } = GetScreenSizes();
  const [imageError, setImageError] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [shouldBeSuspended, setShouldBeSuspended] = useState(false);
  const [suspensionType, setSuspensionType] = useState("");

  const [image, setImage] = useState(StudentLogo);
  const handleImageError = () => {
    setImageError(true);
    setImage(StudentLogo);
  };

  useEffect(() => {
    setIsSpinning(false);
  }, [data]);

  // suspended users
  const {
    data: suspensionList,
    isLoading: suspensionListLoading,
    isError: suspensionListError,
    refetch,
  } = useSuspensionListQuery();

  //persisting suspended student details
  const [suspendedArray, setSuspendedArray] = useState();

  useEffect(() => {
    if (!suspensionListLoading && !suspensionListError) {
      const extractedHTNOs = suspensionList.map((item) => item.HTNO);
      setSuspendedArray(extractedHTNOs);
    }
  }, [suspensionList, suspensionListLoading, suspensionListError]);

  //Hostel Data
  const distinctBlocks = [
    "Ajanta",
    "Aravali",
    "Himalaya",
    "Kailash",
    "Nilgiri",
    "Phase-1",
    "Phase-2",
    "Satpura",
    "Shivalik",
    "Vindhya",
  ];

  // Items for DropDown in modal
  const items = distinctBlocks.map((block, index) => ({
    label: `${block}`,
    key: `${index + 1}`,
  }));

  const onClick = ({ key, label }) => {
    const item = items.find((item) => item.key === key);
    setSelectedBlock(item.label);
  };

  let htnoNumber;

  const handleEdit = (record) => {
    if (isSmallScreen) {
      setLaptopModal(true);
    } else {
      setSelectedRow(record);
      setModalIsOpen(true);
      setImageError(false);
      if (record.A_TYPE === "Hostler") {
        setIsHostler(true);
      } else if (record.A_TYPE === "DayScholar") {
        setIsHostler(false);
      }
    }
    setOldHTNO(record.HTNO);
    htnoNumber = record?.HTNO?.toLowerCase();
    setSelectedBlock(record.BLOCK);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSuspendedChecked(false);
  };

  const onChangeSwitch = (htno) => {
    if (suspendedArray.includes(htno)) {
      setSuspendedChecked(false); // Set the switch to unchecked
    } else {
      setSuspendedChecked((prevState) => !prevState); // Set the switch to checked
    }
  };

  const onChangeAtypeSwitch = () => {
    setChangeAtype((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "ROOM") {
      setSeletedRoom(value);
    } else if (name === "BLOCK") {
      setSelectedBlock(value);
    }

    if (e.target.name === "HTNO") {
      setNewHTNO(e.target.value);
    } else {
      setNewHTNO(selectedRow?.HTNO);
    }

    setSelectedRow({
      ...selectedRow,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: "HTNO and Name",
      key: "HTNO_NAME",
      smallScreen: true,
      render: (text, record) => (
        <>
          <div>{record.STUDENT_NAME}</div>
          <Divider style={{ margin: 0, backgroundColor: "black" }} />
          <div>{record.HTNO}</div>
        </>
      ),
    },
    {
      title: "Batch and Branch",
      key: "BATCH_BRANCH",
      smallScreen: true,
      render: (text, record) => (
        <>
          <div>{record.BATCH}</div>
          <Divider style={{ margin: 0, backgroundColor: "black" }} />
          <div>{record.BRANCH}</div>
        </>
      ),
    },
    {
      title: "HTNO",
      dataIndex: "HTNO",
      smallScreen: false,
      key: "HTNO",
    },
    {
      title: "Student Name",
      dataIndex: "STUDENT_NAME",
      smallScreen: false,
      key: "STUDENT_NAME",
    },
    ...(isWarden
      ? [
          {
            title: "Room no.",
            dataIndex: "ROOM",
            smallScreen: false,
            key: "ROOM",
          },
        ]
      : []),
    ...(isWarden
      ? [
          {
            title: "Block",
            dataIndex: "BLOCK",
            smallScreen: false,
            key: "BLOCK",
          },
        ]
      : []),
    ...(!isWarden
      ? [
          {
            title: "Batch",
            dataIndex: "BATCH",
            smallScreen: false,
            key: "BATCH",
          },
        ]
      : []),
    // {
    //   title: "Branch",
    //   dataIndex: "BRANCH",
    //   smallScreen: false,
    //   key: "BRANCH",
    // },
    {
      title: "Status",
      dataIndex: "MOVING",
      smallScreen: false,
      key: "MOVING",
      render: (text, record) => (
        <>
          <div style={{ color: record.MOVING === "IN" ? "green" : "red" }}>
            {record.MOVING}
          </div>
        </>
      ),
    },
    {
      title: "Email & Mobile",
      key: "EMAIL_MOBILE",
      smallScreen: true,
      render: (text, record) => (
        <>
          <div>{record.STUDENT_EMAIL}</div>
          <Divider style={{ margin: 0, backgroundColor: "black" }} />
          <div>{record.STUDENT_MOBILE}</div>
        </>
      ),
    },
    {
      title: "Student Email",
      dataIndex: "STUDENT_EMAIL",
      smallScreen: false,
      key: "STUDENT_EMAIL",
    },
    {
      title: "Student Mobile",
      dataIndex: "STUDENT_MOBILE",
      smallScreen: false,
      key: "STUDENT_MOBILE",
    },
  ];

  const bodyData = {
    data: {
      ...selectedRow,
      newHTNO,
      oldHTNO,
    },
  };

  const checkForSuspension = (record) => {
    if (suspendedArray.includes(record.HTNO) === true) {
      setSuspendedChecked(true);
      const user = suspensionList.filter((item) => item.HTNO === record.HTNO);

      setSuspendedDate(user[0].SUSPENDED_TILL);
      setSuspensionType(user[0].SUSPENSION_TYPE && user[0].SUSPENSION_TYPE);
    } else {
      setSuspendedChecked(false);
    }
  };

  const checkForUnSuspension = (record) => {
    if (shouldBeSuspended) {
      if (suspendedArray.includes(record.HTNO) === true) {
        setUnSuspendStudent(true);
      } else {
        setUnSuspendStudent(false);
      }
    }
  };

  const onClickSaveChanges = async () => {
    try {
      let updatedData;
      if (isHostler && changeAtype) {
        updatedData = {
          ...bodyData?.data,
          BLOCK: "",
          ROOM: "",
          A_TYPE: "DayScholar",
        };
      } else if (!isHostler && changeAtype) {
        updatedData = {
          ...bodyData?.data,
          A_TYPE: "Hostler",
          BLOCK: selectedBlock,
          ROOM: selectedRoom,
        };
      }
      // Changing hostlers room number and block
      else if (isHostler && selectedRoom) {
        updatedData = {
          ...bodyData?.data,
          A_TYPE: "Hostler",
          ROOM: selectedRoom,
        };
      } else if (isHostler && selectedBlock) {
        updatedData = {
          ...bodyData?.data,
          A_TYPE: "Hostler",
          BLOCK: selectedBlock,
        };
      } else {
        updatedData = {
          ...bodyData?.data,
        };
      }

      await updateUser({ data: updatedData });
      onUpdate();

      if (suspendedChecked) {
        await suspendUser({ selectedRow, suspendedDate, suspensionType });
        setSuspendedDate(null);
        setSuspensionType("");
        setSuspendedChecked(false);
      }
      if (unSuspendStudent) {
        await suspendUser({ selectedRow });
        setSuspendedChecked(false);
      }
      console.log("triggered");
      refetch();
      setUnSuspendStudent("");
      setSuspendedChecked("");
      setModalIsOpen(false);
      setConformationModal(true);
      setChangeAtype(false);
      setSelectedBlock("");
      setSeletedRoom("");
      setSuspendedDate(null);
      setSuspensionType("");
      setSelectedRow(null);
      setOldHTNO(null);
      setNewHTNO(null);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  let filteredColumns = columns.filter((column) =>
    isSmallScreen ? column.smallScreen === true : column.smallScreen === false
  );

  filteredColumns = [
    ...filteredColumns,
    {
      title: "Edit",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {!isWarden && (
            <FaPencilAlt
              onClick={() => {
                handleEdit(record);
                checkForSuspension(record);
                checkForUnSuspension(record);
              }}
            />
          )}
          {isWarden && (
            <Button
              style={{
                color: "#5cb1ff",
              }}
              onClick={() => {
                handleEdit(record);
              }}
            >
              View More
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const dateFormat = "YYYY-MM-DD";

  const handleTableChange = (pagination) => {
    if (pagination && pagination.current) {
      onPageChange(pagination.current);
    }
  };

  console.log({ suspensionType });

  return (
    <>
      <Table
        dataSource={data}
        columns={filteredColumns}
        className="custom-table"
        rowClassName={(record) =>
          record.SUSPEND === "Yes" ? "suspended-row" : ""
        }
        style={{ overflowX: "auto" }}
        pagination={{
          defaultPageSize: "10",
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          total: totalPages * 10,
        }}
        onChange={handleTableChange}
      />
      <div>
        <Modal
          title="Edit Student Details"
          open={modalIsOpen}
          contentLabel="Edit Modal"
          footer={null}
          closable={false}
          onCancel={closeModal}
          centered
        >
          {selectedRow && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <CustomDiv>
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    {<UserOutlined style={{ fontWeight: "700" }} />} Name
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="STUDENT_NAME"
                    placeholder="Name"
                    value={selectedRow.STUDENT_NAME}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    {<CalendarOutlined style={{ fontWeight: "700" }} />} Batch
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="BATCH"
                    placeholder="Year"
                    value={selectedRow.BATCH}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    <IconImage src={idIcon} alt="idcard" />
                    ID Number
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="HTNO"
                    placeholder="Hall Ticket Number"
                    value={selectedRow.HTNO}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    {<PhoneOutlined style={{ fontWeight: "700" }} />} Student
                    No.
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="STUDENT_MOBILE"
                    placeholder="Student Mobile Number"
                    value={selectedRow.STUDENT_MOBILE}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    <IconImage src={GuardianIcon} alt="guardian" />
                    Father's Name
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="FATHER_NAME"
                    placeholder="Name"
                    value={selectedRow.FATHER_NAME}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                {!isWarden && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <MailOutlined style={{ marginRight: "5px" }} />
                      Guardian Email
                    </label>
                    <Input
                      name="PARENTS_EMAIL"
                      placeholder="Parent's Email"
                      value={selectedRow.PARENTS_EMAIL}
                      onChange={handleInputChange}
                      style={{
                        width: "60%",
                        paddingLeft: "20px",
                      }}
                    />
                  </FlexContainer>
                )}
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    <PhoneOutlined style={{ marginRight: "5px" }} />
                    Parent No.
                  </label>
                  <Input
                    readOnly={isWarden}
                    name="PARENTS_MOBILE"
                    placeholder="Parent's Email"
                    value={selectedRow.PARENTS_MOBILE}
                    onChange={handleInputChange}
                    style={{
                      width: "60%",
                      paddingLeft: "20px",
                    }}
                  />
                </FlexContainer>
                <br />
                {!isWarden && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <IconImage src={School} alt="school" />
                      School
                    </label>
                    <Input
                      name="SChool"
                      placeholder="Enter School"
                      value={selectedRow.SCHOOL}
                      onChange={handleInputChange}
                      style={{
                        width: "60%",
                        paddingLeft: "20px",
                      }}
                    />
                  </FlexContainer>
                )}
                <br />
                <FlexContainer>
                  <label style={{ fontWeight: "700" }}>
                    {isHostler ? "Change To DayScholar" : "Change To Hostler"}
                  </label>
                  <Switch
                    checked={changeAtype}
                    onChange={onChangeAtypeSwitch}
                    style={{
                      marginRight: "150px",
                    }}
                  />
                </FlexContainer>
                <br />

                {isHostler && !changeAtype && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <IconImage src={block} alt="Block" />
                      Block
                    </label>
                    <Dropdown
                      style={{ width: "100%" }}
                      menu={{
                        items,
                        onClick,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Input
                          name="BLOCK"
                          placeholder="Not Yet Alloted"
                          value={selectedBlock}
                          onChange={(e) => {
                            setSelectedBlock(e.target.value);
                            console.log(e);
                          }}
                          style={{
                            width: "100%",
                            paddingLeft: "20px",
                          }}
                        />
                      </a>
                    </Dropdown>
                  </FlexContainer>
                )}

                <br />

                {isHostler && !changeAtype && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <IconImage src={room} alt="room" />
                      Room
                    </label>
                    <Input
                      name="ROOM"
                      placeholder="Not Yet Alloted"
                      value={selectedRow.ROOM}
                      onChange={handleInputChange}
                      style={{
                        width: "60%",
                        paddingLeft: "20px",
                      }}
                    />
                  </FlexContainer>
                )}

                {!isHostler && changeAtype && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <IconImage src={block} alt="Block" />
                      Select Block
                    </label>
                    <Dropdown
                      style={{ width: "100%" }}
                      menu={{
                        items,
                        onClick,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Input
                          name="BLOCK"
                          placeholder="Not Yet Alloted"
                          value={selectedBlock}
                          onChange={(e) => {
                            setSelectedBlock(e.target.value);
                          }}
                          style={{
                            width: "100%",
                            paddingLeft: "20px",
                          }}
                        />
                      </a>
                    </Dropdown>
                  </FlexContainer>
                )}

                <br />

                {!isHostler && changeAtype && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      <IconImage src={room} alt="room" />
                      Room
                    </label>
                    <Input
                      name="ROOM"
                      placeholder="Not Yet Alloted"
                      value={selectedRoom}
                      onChange={(e) => setSeletedRoom(e.target.value)}
                      style={{
                        width: "60%",
                        paddingLeft: "20px",
                      }}
                    />
                  </FlexContainer>
                )}

                <br />
                {!isWarden && (
                  <FlexContainer>
                    <label style={{ fontWeight: "700" }}>
                      Suspend {selectedRow.STUDENT_NAME}
                    </label>
                    <Switch
                      checked={suspendedChecked}
                      style={{
                        marginRight: "150px",
                        backgroundColor: suspendedChecked ? "red" : "#bfbfbf",
                      }}
                      onChange={() => {
                        onChangeSwitch(selectedRow.HTNO);
                        setShouldBeSuspended(true);
                      }}
                    />
                  </FlexContainer>
                )}
                <br />
                <br />
                {suspendedChecked && (
                  <>
                    <FlexContainer>
                      <label style={{ fontWeight: "700" }}>
                        Select Duration
                      </label>
                      <DatePicker
                        defaultValue={
                          suspendedDate && dayjs(suspendedDate, dateFormat)
                        }
                        onChange={(date) => {
                          if (date && typeof date === "object") {
                            const pickedDate = date.toDate(); // Convert Moment.js to JavaScript Date
                            setSuspendedDate(pickedDate.toString());
                          }
                        }}
                      />
                    </FlexContainer>
                    <br />
                    <br />

                    <Select
                      style={{
                        width: "60%",
                        marginBottom: "20px",
                        alignSelf: "start",
                        marginLeft: "40px",
                      }}
                      placeholder="Select suspension type"
                      onChange={(value) => {
                        console.log("Selected value:", value); // Debugging
                        setSuspensionType(value);
                      }}
                      value={suspensionType}
                    >
                      <Select.Option value="College Suspension">
                        College Suspension
                      </Select.Option>
                      <Select.Option value="Hostel Suspension">
                        Hostel Suspension
                      </Select.Option>
                      <Select.Option value="Academic Suspension">
                        Academic Suspension
                      </Select.Option>
                    </Select>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Button type="primary" ghost onClick={onClickSaveChanges}>
                    Save changes
                  </Button>

                  <Button
                    onClick={() => {
                      closeModal();
                      setSuspendedDate(null);
                      setSuspensionType("");
                    }}
                    type="primary"
                    danger
                    ghost
                  >
                    Close
                  </Button>
                </div>
              </CustomDiv>
              <div>
                <img
                  style={{ height: "100px", width: "100px" }}
                  alt="studentlogo"
                  src={
                    imageError
                      ? StudentLogo
                      : `https://musecportal.s3.ap-south-1.amazonaws.com/${
                          selectedRow.BATCH
                        }/${selectedRow.HTNO.toLowerCase()}.jpg`
                  }
                  onError={handleImageError}
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
      <div>
        <Modal
          shouldCloseOnOverlayClick={false}
          footer={null}
          open={confirmationModal}
          closable={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3>Profile Updated</h3>
            <Button
              onClick={() => {
                setConformationModal(false);
                setSelectedRow(null);
              }}
              type="primary"
              ghost
            >
              Done
            </Button>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          shouldCloseOnOverlayClick={false}
          footer={null}
          open={laptopModal}
          closable={false}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div>
            <h2>Please use desktop for this Feature</h2>
            <Button
              type="primary"
              danger
              ghost
              onClick={() => setLaptopModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default StudentTable;
