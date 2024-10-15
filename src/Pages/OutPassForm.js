import React, { useEffect, useState } from "react";
import LeaveForm from "../Components/LeaveForm/LeaveForm";
import SecNavbar from "../Components/NavBar/SecNavBar";
import Instructions from "../Components/LeaveForm/Instructions";
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { GetScreenSizes } from "../Components/ScreenSizes";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/authSlice";
import { useHistory } from "react-router-dom";
import { useFetchStudentByIdQuery } from "../Slices/studentApiSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useMsal } from "@azure/msal-react";
import LeaveForm2 from "../Components/LeaveForm/LeaveForm2";
import styled from "styled-components";
import Layout from "../Components/Layout";

const OutPassForm = (props) => {
  const [isHostler, setIsHostler] = useState(true);
  const htno = useSelector((state) => state.auth.userInfo.HTNO);
  const {
    data: studentInfo,
    isloading,
    isError,
  } = useFetchStudentByIdQuery(htno);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  useEffect(() => {
    if (studentInfo?.user.A_TYPE === "Hostler") {
      setIsHostler(true);
    } else {
      setIsHostler(false);
    }
  }, [studentInfo]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance } = useMsal();

  if (!htno) {
    return history.push("/login");
  }
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const wait = async (milliseconds = 2000) => {
    await sleep(milliseconds);
  };

  // useEffect(() => {
  //   props.fetchStudent();
  //   wait(2000);
  // }, []);

  async function handleLogout() {
    localStorage.removeItem("userInfo");
    await instance.logoutRedirect();
    dispatch(logout());
    history.pushState("/");
  }

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };
  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  async function handleClick() {
    await instance.logoutRedirect();
    localStorage.removeItem("userInfo");
    history.push("/login");
    dispatch(logout());
  }

  const onClickMyLeaves = () => {
    history.push("/myleaves");
  };

  const onClickLeaveForm = () => {
    history.push("/form");
  };

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

  return (
    <Layout tab={"leaveForm"}>
      {!isHostler && (
        <div
          style={{
            height: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Only For Hostlers !! </h2>
        </div>
      )}
      {isHostler && (
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <LeaveForm2 htno={htno} />
          </Col>
        </Row>
      )}
      {isHostler && <Instructions />}
    </Layout>
  );
};

export default OutPassForm;
