import React, { Suspense, lazy, useState } from "react";
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav, Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useFetchAppliedLeavesQuery } from "../Slices/appliedLeavesApiSlice";
import { useFetchStudentByIdQuery } from "../Slices/studentApiSlice";
import { logout } from "../Slices/authSlice";
import { setActiveKey } from "../Slices/activeKeySlice";

import { GetScreenSizes } from "../Components/ScreenSizes";
import { useMsal } from "@azure/msal-react";
import { Result, Spin } from "antd";
import ManualCheckInOut from "../Components/ManualCheckInOut/ManualCheckInOut";
import PendingLeaveApprovalsPage from "./PendingLeaveApprovalsPage";
import 'antd/dist/antd.css';  // Correct import for Ant Design styles
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined ,
  FileTextOutlined,
  SettingOutlined,
  MessageOutlined,
  ClockCircleOutlined ,
  LoginOutlined,
  LogoutOutlined ,
  CheckCircleOutlined ,
  BarChartOutlined 
} from '@ant-design/icons';

import MainNavbar from "../Components/Reusable/MainNavbar"
//Lazy Loading

const { Sider } = Layout;


const DescriptionTable = lazy(() =>
  import("../Components/Approval/DescriptionTable")
);
const InOutDescriptionTable = lazy(() =>
  import("../Components/InOutMovement/InOutDescriptionTable")
);

const ManualInOutDes = lazy(() =>
  import("../Components/InOutMovement/ManualInOut")
);
const ApprovalTable = lazy(() =>
  import("../Components/Approval/ApprovalTable")
);
const InOutTable = lazy(() => import("../Components/InOutMovement/InOutTable"));
const PastLeaveApprovalTable = lazy(() =>
  import("../Components/PastLeaveApprovals/PastLeaveApprovalTable")
);
const AdminPage = lazy(() => import("./AdminPage"));
const DashBoard = lazy(() => import("../Components/Statistics/DashBoard"));

const StyledNavLink = styled(Nav.Link)`
  @media (max-width: 500px) {
    display: none; /* Hide on screens smaller than MD */
  }

  @media (min-width: 701px) and (max-width: 1199.98px) {
    display: block; /* Show on MD screens */
    align-self: flex-end;
    border: 2px solid red;
    border-radius: 8px;
    padding: 8px;
  }

  @media (min-width: 1200px) {
    display: block;
    align-self: flex-end;
    border: 2px solid red;
    border-radius: 8px;
    padding: 8px;
  }
`;

const StyledTabs = styled(Tabs)`
  .nav-link {
    border: none;
    padding: 10px 20px;
    transition: border-bottom-color 0.3s ease, color 0.3s ease;
    color: black;
  }

  .nav-link.active {
    color: #e31138;
    border-bottom: 2px solid #e31138;
  }
`;

const globalColor = "#e31138";

const ApprovalPage = (props) => {
  const state = useSelector((state) => state);
  const userRole = state.auth.userInfo.role;
  const keyword = state.search.keyword || "";
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const [ids, setids] = useState("");
  const [records, setRecords] = useState("");
  const [dt, setDt] = useState("");
  const AdminOrWarden = userRole === "Admin" || userRole === "Warden";
  const OnlyAdmin = userRole === "Admin";
  const AdminOrWardenOrSecurity =
    userRole === "Admin" || userRole === "Warden" || userRole === "Security";
  const [key, setKey] = useState(AdminOrWarden ? "pending" : "inoutmovement");
  const [page, setPage] = useState(1);
  const [actionOutComeVals, setActionOutComeVals] = useState({
    htno: null,
    asnDate: null,
    token: null,
  });
  const [manualStudentId, setManualStudentId] = useState("");
  const {
    data: AppliedLeavesData,
    isError: isAppliedLeavesError,
    refetch,
  } = useFetchAppliedLeavesQuery({ keyword, page });

  const { data: StudentData, isError: isStudentDataError } =
    useFetchStudentByIdQuery(ids);

  const { data: ManualStudentData, isError: isManualStudentDataError } =
    useFetchStudentByIdQuery(manualStudentId);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  let x;
  const { instance } = useMsal();

  async function handleClick() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("hasLoggedInBefore");
    await instance.logoutRedirect();
    history.push("/admin-login");
    dispatch(logout());
  }

  const handchange = (value, rec, asn) => {
    setids(value);
    setRecords(rec);
    setDt(asn);
  };

  const manualInOut = (studentid) => {
    setManualStudentId(studentid);
  }

  const actionOnLeave = ({ htno, asnDate, token }) => {
    setActionOutComeVals({ htno: htno, asnDate: asnDate, token: token });
  };

  const actionValuesSetterFromApprovalTable = () => {
    setActionOutComeVals({ htno: null, asnDate: null, token: null });
  };

  for (let val of AppliedLeavesData?.applied_leaves || []) {
    if (val.HTNO === ids && val.TOKEN === records && val.ASN_DATE === dt) {
      x = val;
    }
  }

  const pageSetterFunction = (pageNumber) => {
    setPage(pageNumber);
  };

  const desc = !x ? null : (
    <>
      {x && (
        <DescriptionTable
          triggerFunction={actionOnLeave}
          data={x}
          studentEmail={StudentData?.user.STUDENT_EMAIL}
          val={ids}
        />
      )}
    </>
  );

  const inoutdesc = (
    <>
      {StudentData && (
        <InOutDescriptionTable data={ids} student={StudentData?.user || []} />
      )}
    </>
  );

  const manualinoutdesc = (
    <>
      {manualStudentId && ManualStudentData && ManualStudentData?.user && (
        <ManualInOutDes data={ids} student={ManualStudentData?.user || []} />
      )}
      {
        manualStudentId && !ManualStudentData && (
          <p>Wrong Student Id</p>
        )
      }
    </>
  );

  const onChangeKey = (key) => {
    dispatch(setActiveKey(key));
    setKey(key);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const LoadingFallback = () => (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin spinning={true} size="large" colorPrimary={globalColor} />
    </div>
  );

  return (
    <Layout>
      <MainNavbar 
            
      />
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
      style={{ position: 'fixed', height: '100vh', background: '#fff',  }}
    >
      {/* <div className="flex justify-center items-center p-4 flex-shrink-0">
        <img src={mu} alt="logo" width={160} height={50} />
      </div> */}
  
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['pending']}
        selectedKeys={[key]} // Keeps track of selected menu
        style={{
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: '8px',
          flexGrow: 1, // Allow menu to grow and take remaining space
          marginTop:"7rem"
        }}
      >
        {AdminOrWarden && (
          <Menu.Item
            key="pending"
            icon={<ClockCircleOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('pending')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'pending' ? '#ff244d' : 'transparent', // Highlight selected
              color: key === 'pending' ? '#fff' : '#000',
            }}
          >
            Pending Leave Approvals
          </Menu.Item>
        )}
  
        {AdminOrWardenOrSecurity && (
          <Menu.Item
            key="inoutmovement"
            icon={<LoginOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('inoutmovement')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'inoutmovement' ? '#ff244d' : 'transparent',
              color: key === 'inoutmovement' ? '#fff' : '#000',
            }}
          >
            In/Out Movement
          </Menu.Item>
        )}
  
        {AdminOrWarden && (
          <Menu.Item
            key="past"
            icon={<CheckCircleOutlined  />}
            className="rounded-md"
            onClick={() => onChangeKey('past')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'past' ? '#ff244d' : 'transparent',
              color: key === 'past' ? '#fff' : '#000',
            }}
          >
            Past Leave Approvals
          </Menu.Item>
        )}
  
        {OnlyAdmin && (
          <Menu.Item
            key="adminTab"
            icon={<UserOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('adminTab')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'adminTab' ? '#ff244d' : 'transparent',
              color: key === 'adminTab' ? '#fff' : '#000',
            }}
          >
            Admin Tab
          </Menu.Item>
        )}
  
        {isLargeScreen && AdminOrWarden && (
          <Menu.Item
            key="stats"
            icon={<BarChartOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('stats')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'stats' ? '#ff244d' : 'transparent',
              color: key === 'stats' ? '#fff' : '#000',
            }}
          >
            Statistics
          </Menu.Item>
        )}
  
        {AdminOrWarden && (
          <Menu.Item
            key="hostelManagement"
            icon={<HomeOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('hostelManagement')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'hostelManagement' ? '#ff244d' : 'transparent',
              color: key === 'hostelManagement' ? '#fff' : '#000',
            }}
          >
            Hostel Management
          </Menu.Item>
        )}
  
        {/* {OnlyAdmin && (
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            className="rounded-md"
            onClick={() => onChangeKey('settings')}
            style={{
              marginBottom: '8px',
              backgroundColor: key === 'settings' ? '#ff244d' : 'transparent',
              color: key === 'settings' ? '#fff' : '#000',
            }}
          >
            Settings
          </Menu.Item>
        )} */}
      </Menu>
  
      {/* Sign Out button at the bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <Menu
          mode="inline"
          className="rounded-md"
          style={{
            backgroundColor: 'transparent', // No background
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Menu.Item
            key="signout"
            icon={<LogoutOutlined />}
            onClick={handleClick}
            style={{
              color: '#292929', // Red text
              border: '2px solid #292929', // Red border
              backgroundColor: 'transparent', // Transparent background
              borderRadius: '8px',
              position:"fixed",
              bottom:"20px",
              left:"20px",
              width:"auto",
            }}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  
    <Layout.Content style={{ marginLeft: 240, padding: '16px', background: '#fff' }}>
      <Suspense fallback={<div>Loading...</div>}>
        {key === 'pending' && <PendingLeaveApprovalsPage />}
        {key === 'inoutmovement' && <InOutTable />}
        {key === 'checkinout' && <ManualCheckInOut />}
        {key === 'past' && <PastLeaveApprovalTable />}
        {key === 'adminTab' && <AdminPage />}
        {key === 'stats' && <DashBoard />}
        {key === 'hostelManagement' && <AdminPage isWarden={true} />}
        {/* {key === 'reports' && <ReportsPage />}
            {key === 'settings' && <SettingsPage />}
            {key === 'feedback' && <FeedbackPage />} */}
      </Suspense>
    </Layout.Content>
  </Layout>

  );
};

export default ApprovalPage;
