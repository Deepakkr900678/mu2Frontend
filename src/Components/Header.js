import React, { useState } from "react";
import mu from "../Components/NavBar/logo.png";
import { Container, Navbar, Nav } from "react-bootstrap";
import { GetScreenSizes } from "../Components/ScreenSizes";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice";
import { useHistory } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useMsal } from "@azure/msal-react";
import styled from "styled-components";

const Header = ({ tab }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance } = useMsal();
  const { isSmallScreen, isMediumScreen, isLargeScreen } = GetScreenSizes();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [currentTab, setCurrentTab] = useState(tab);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };
  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  async function handleClick() {
    localStorage.removeItem("userInfo");
    await instance.logoutRedirect();
    history.push("/admin-login");
    dispatch(logout());
  }

  const onClickMyLeaves = () => {
    setCurrentTab("myLeaves");
    history.push("/myleaves");
  };

  const onClickLeaveForm = () => {
    setCurrentTab("leaveForm");
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
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container
            fluid
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Navbar.Brand href="#home">
              <img
                alt="logo"
                src={mu}
                width={160}
                height={50}
                style={{ marginLeft: 20 }}
              />
            </Navbar.Brand>
            {isSmallScreen && (
              <Navbar.Toggle
                onClick={handleShowOffcanvas}
                className="d-md-none "
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
            )}
            {isMediumScreen && !isLargeScreen && (
              <button
                style={{
                  border: " 2px solid #e31138",
                  borderRadius: "8px",
                  padding: "8px",
                  alignSelf: "flex-end",
                }}
                onClick={handleClick}
              >
                Sign Out
              </button>
            )}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              show={showOffcanvas}
              onHide={handleCloseOffcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MU
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav style={{ width: "100%" }} className="flex-column">
                  {isLargeScreen && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "15px",
                      }}
                    >
                      <Nav.Link
                        className="d-md-none d-lg-block"
                        style={{
                          borderBottom:
                            currentTab === "leaveForm"
                              ? "2px solid #e31138"
                              : "",
                        }}
                        onClick={onClickLeaveForm}
                      >
                        Leave Form
                      </Nav.Link>
                      <Nav.Link
                        className="d-md-none d-lg-block"
                        onClick={onClickMyLeaves}
                        style={{
                          borderBottom:
                            currentTab === "myLeaves"
                              ? "2px solid #e31138"
                              : "",
                        }}
                      >
                        My Leaves
                      </Nav.Link>
                      <button
                        style={{
                          border: `2px solid ${
                            isHovered ? "#e31138" : "#f8f9fa"
                          }`,
                          borderRadius: "8px",
                          padding: "8px",
                          alignSelf: "flex-end",
                          transition: "border-color 0.2s",
                          backgroundColor: "transparent",
                        }}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                  {isSmallScreen && (
                    <Nav.Link onClick={onClickLeaveForm}>Leave Form</Nav.Link>
                  )}
                  {isSmallScreen && (
                    <Nav.Link onClick={onClickMyLeaves}>Leave Status</Nav.Link>
                  )}
                  {isSmallScreen && (
                    <Nav.Link onClick={handleClick}>Sign Out</Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
